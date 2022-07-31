import logging

import rcwa as rw
from numpy import pi

from rcwa_www.backend_rcwa.api import Layer, Source

log = logging.getLogger(__name__)

def parse_optical_constants(optical_values: str) -> list:
    try:
        rows = optical_values.split('\n')
        rows = filter(lambda x: x != "", rows)
        if len(rows) == 1:
            return [float(value) for value in rows[0]]
        else:
            return [[float(value) for value in row.split(',')] for row in rows]
    except Exception as e:
        log.error(f"Error while trying to parse optical constant of {e}")
        return []

def parse_layer(layer: Layer) -> rw.Layer:
    rw_layer = rw.Layer()
    # filter the api Layer to only the values present in rw.Layer
    print(list(layer.__dict__.items()))
    valid_attrs = filter(lambda item_tuple: hasattr(rw_layer, item_tuple[0]), list(layer.__dict__.items()))
    valid_attrs = [attr for attr in valid_attrs if attr[0] != "material"]
    for key, value in valid_attrs:
        setattr(rw_layer, key, value)

    if layer.hasCrystal:
        layer.er = parse_optical_constants(layer.er)
        layer.ur = parse_optical_constants(layer.ur)
        if len(layer.er) > len(layer.ur):
            layer.ur = [1 for _ in layer.er]
        elif len(layer.ur) > len(layer.er):
            layer.er = [1 for _ in layer.er]
        rw_layer.homogenous = False
        c = rw.Crystal(*layer.latticeVectors, layer.er, layer.ur)
        rw_layer.crystal = c
    return rw_layer

def parse_max_dimension(layers: list[Layer]) -> int:
    # I'm guessing this will throw an error in the algorithm if there is a mismatch
    # I'd rather return that error though so pass the max lattive vector dimensions
    pass


def parse_layer_stack(layers: list[Layer]) -> rw.LayerStack:
    stack = [parse_layer(l) for l in layers]
    print("stack base is")
    print(stack)
    return (rw.LayerStack(*stack[1:-1], incident_layer=stack[0], transmission_layer=stack[-1]), stack)

def parse_source(s: Source, layers: list[rw.Layer]) -> rw.Source:
    rw_source = rw.Source()
    # Here it was easier to do explicit due to the various conversions
    rw_source.wavelength = s.centerWavelength
    rw_source.phi = s.phi * (pi/180)
    rw_source.theta = s.theta * (pi/180)
    rw_source.pTEM = [s.pTE, s.pTM]
    rw_source.layer = layers[s.layerLocIdx]
    return rw_source