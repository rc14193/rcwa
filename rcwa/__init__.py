__version__ = '0.0.1'
__author__ = 'Jordan Edmunds'
__email__ = 'edmundsj@uci.edu'
import os

file_location = os.path.dirname(__file__)
nkLocation = os.path.join(file_location, 'nkData/')
testLocation = os.path.join(file_location, 'test')

from rcwa import utils
from rcwa.material import Material
from rcwa.crystal import Crystal
from rcwa.layer import LayerStack, Layer, freeSpaceLayer
from rcwa.slicer import Slicer
from rcwa.grating import RectangularGrating, TriangularGrating, Grating
from rcwa.source import Source, zeroSource
from rcwa.solver import Solver
from rcwa.utils import Plotter
from rcwa.shorthand import complexArray
