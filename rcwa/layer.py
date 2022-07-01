from rcwa.shorthand import *
from rcwa import Material, MatrixCalculator

# TODO: Convolution matrix generation must be refactored. It's a hot mess and hard to understand.


class Layer(MatrixCalculator):
    """
    Class for defining a single layer of a layer stack used in a simulation

    :param er: Permittivity of the layer. Overridden by crystal permittivity if specified.
    :param ur: Permeability of the layer. Overridden by crystal permeability if specified.
    :param thickness: Thickness of the layer
    :param n: Refractive index of the layer. Overridden by cristal er/ur if specified.
    :param material: Material object containing the material's permittivity and permeability as a function of wavelength/angle.
    :param crystal: Crystal object if the layer is periodic in x and/or y. Overrides er, ur, n, and material
    """
    def __init__(self, er=1.0, ur=1.0, thickness=0.0, n=None, material=None, crystal=None):
        if material is None:
            self.material = Material(er=er, ur=ur, n=n)
        else:
            self.material = material

        self.thickness = thickness
        self.crystal = crystal
        self.incident = False  # Whether this is a transmission layer
        self.transmission = False  # Whether this is an incident layer

        if crystal is None:
            self.homogenous = True
        else:
            self.homogenous = False

    # Note: these are all just transparent wrappers for underlying material

    @property
    def er(self):
        return self.material.er

    @er.setter
    def er(self, er):
        self.material.er = er

    @property
    def ur(self):
        return self.material.ur

    @ur.setter
    def ur(self, ur):
        self.material.ur = ur

    @property
    def n(self):
        return self.material.n

    @n.setter
    def n(self, n):
        self.material.n = n

    @property
    def source(self):
        return self.material.source

    @source.setter
    def source(self, source):
        self.material.source = source

    def set_convolution_matrices(self, numberHarmonics):
        if self.crystal is not None:
            self.er = self._convolution_matrix(self.crystal.permittivityCellData, numberHarmonics)
            self.ur = self._convolution_matrix(self.crystal.permeabilityCellData, numberHarmonics)
        else:
            self.er = self.er * complexIdentity(prod(numberHarmonics))
            self.ur = self.ur * complexIdentity(prod(numberHarmonics))

    def _convolution_matrix(self, cellData, n_harmonics):
        dimension = self.crystal.dimensions;

        if isinstance(n_harmonics, int):
            n_harmonics = (n_harmonics,)

        if dimension == 1:
            n_harmonics = (n_harmonics + (1, 1))
        elif dimension == 2:
            n_harmonics = (n_harmonics + (1,))

        (P, Q, R) = n_harmonics

        convolutionMatrixSize = P*Q*R;
        convolutionMatrixShape = (convolutionMatrixSize, convolutionMatrixSize);
        convolutionMatrix = complexZeros(convolutionMatrixShape)

        cellData = reshapeLowDimensionalData(cellData);
        (Nx, Ny, Nz) = cellData.shape;
        zeroHarmonicsLocation = np.array([math.floor(Nx/2), math.floor(Ny/2), math.floor(Nz/2)])

        cellFourierRepresentation = fftn(cellData);
        for rrow in range(R):
            for qrow in range(Q):
                for prow in range(P):
                    row = rrow*Q*P + qrow*P + prow;
                    for rcol in range(R):
                        for qcol in range(Q):
                            for pcol in range(P):
                                col = rcol*Q*P + qcol*P + pcol;
                                # Get the desired harmonics relative to the 0th-order harmonic.
                                desiredHarmonics = np.array([prow - pcol, qrow - qcol, rrow - rcol])

                                # Get those harmonic locations from the zero harmonic location.
                                desiredHarmonicsLocation = zeroHarmonicsLocation + desiredHarmonics

                                convolutionMatrix[row][col] = \
                                    cellFourierRepresentation[desiredHarmonicsLocation[0],
                                    desiredHarmonicsLocation[1], desiredHarmonicsLocation[2]];
        if convolutionMatrix.shape == (1, 1):
            convolutionMatrix = convolutionMatrix[0][0]
        return convolutionMatrix;

    def __eq__(self, other):
        if not isinstance(other, Layer):
            return NotImplemented

        return self.er == other.er and self.ur == other.ur and self.thickness == other.thickness \
               and self.n == other.n and self.crystal == other.crystal

    def __str__(self):
        return f'Layer with\n\ter: {self.er}\n\tur: {self.ur}\n\tL: {self.thickness}\n\tn: {self.n}\n\tcrystal: {self.crystal}'


freeSpaceLayer = Layer(1,1)


class LayerStack:
    """
    Class that defines overall geometry in terms of a stack of layers

    :param internal_layers: Layer objects, starting with the top-most layer (reflection region) and ending with the top-most region (substrate)
    :param incident_layer: Semi-infinite layer of incident region. Defaults to free space
    :param transmission_layer: Semi-infinite layer of transmission region. Defaults to free space
    """
    def __init__(self, *internal_layers, incident_layer=Layer(er=1, ur=1), transmission_layer=Layer(er=1, ur=1)):
        if len(internal_layers) == 1:
            if isinstance(internal_layers[0], list):
                internal_layers = internal_layers[0]
        self.gapLayer = Layer(er=1, ur=1)
        self.incident_layer = incident_layer
        self.incident_layer.incident = True
        self.transmission_layer = transmission_layer
        self.transmission_layer.transmission = True

        self.internal_layers = list(internal_layers)
        self._Kx = None
        self._Ky = None

    def __eq__(self, other):
        if not isinstance(other, LayerStack):
            return NotImplemented

        reflection_layers_same = self.incident_layer == other.incident_layer
        transmission_layers_same = self.transmission_layer == other.transmission_layer
        internal_layers_same = False
        if len(self.internal_layers) == len(other.internal_layers):
            for i in range(len(self.internal_layers)):
                if self.internal_layers[i] != other.internal_layers[i]:
                    break
            internal_layers_same = True

        return internal_layers_same and reflection_layers_same and transmission_layers_same

    def __str__(self):
        top_string = f'\nReflection Layer:\n\t' + str(self.incident_layer) + \
                f'\nTransmissionLayer:\n\t' + str(self.transmission_layer) + \
                f'\nInternal Layer Count: {len(self.internal_layers)}\n'
        internal_string = ''
        for layer in self.internal_layers:
            internal_string += str(layer) + '\n'
        return top_string + internal_string

    @property
    def _k_dimension(self):
        if isinstance(self.Kx, np.ndarray):
            return self.Kx.shape[0]
        else:
            return 1

    @property
    def _s_element_dimension(self):
        s_dim = self._k_dimension * 2
        return s_dim

    @property
    def all_layers(self):
        return [self.incident_layer, *self.internal_layers, self.transmission_layer]

    @property
    def Kx(self):
        return self._Kx

    @Kx.setter
    def Kx(self, kx):
        self._Kx = kx
        self.gapLayer.Kx = kx
        for layer in self.all_layers:
            layer.Kx = kx

    @property
    def Ky(self):
        return self._Ky

    @Ky.setter
    def Ky(self, ky):
        self._Ky = ky
        self.gapLayer.Ky = ky
        for layer in self.all_layers:
            layer.Ky = ky

    @property
    def source(self):
        return self._source

    @source.setter
    def source(self, source):
        self._source = source
        self.gapLayer.source = source
        for layer in self.all_layers:
            layer.source = self.source

    def set_gap_layer(self):
        self.gapLayer.thickness = 0
        if self._k_dimension == 1:
            self.gapLayer.er = 1 + sq(self.Kx) + sq(self.Ky)
            self.gapLayer.ur = 1
            Qg = self.gapLayer.Q_matrix()
            lambda_gap = self.gapLayer.lambda_matrix()

        else:
            Kz = self.gapLayer.Kz_gap()
            Qg = self.gapLayer.Q_matrix()
            lambda_gap = complexIdentity(self._k_dimension * 2)
            lambda_gap[:self._k_dimension, :self._k_dimension] = 1j * Kz
            lambda_gap[self._k_dimension:, self._k_dimension:] = 1j * Kz

        self.Wg = complexIdentity(self._s_element_dimension)
        self.Vg = Qg @ inv(lambda_gap)

        for layer in self.all_layers:
            layer.Wg = self.Wg
            layer.Vg = self.Vg

    # set all convolution matrices for all interior layers
    def set_convolution_matrices(self, numberHarmonics):
        for layer in self.internal_layers:
            layer.set_convolution_matrices(numberHarmonics)

    @property
    def crystal(self):
        for i in range(len(self.internal_layers)):
            if self.internal_layers[i].crystal is not None:
                return self.internal_layers[i].crystal
        return None


emptyStack = LayerStack()
