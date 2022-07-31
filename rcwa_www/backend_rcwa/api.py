from typing import Union
import logging

import rcwa as rw
import numpy as np
from pydantic import BaseModel
from fastapi import FastAPI, Response, status
from starlette.middleware.cors import CORSMiddleware

from parsers import *
from constants import *

logging.basicConfig(filename='rcwa_app.log', filemode='w', level=logging.DEBUG, format='%(asctime)s %(message)s')
log = logging.getLogger(__name__)
log.critical(f"RCWA API, written in Fast API, version {VERSION_NUMBER}")


# setup the various child objects
# pydantic will provide about 90% of the error checking
# A note is that all fields need to be present with the same spelling as front end
class Source(BaseModel):
    centerWavelength: float
    pTE: float
    pTM: float
    theta: float
    phi: float
    wavelengths: str
    layerLocIdx: int

class Layer(BaseModel):
    name: str
    hasCrystal: bool
    ur: Union[float, str] # can be homogeneous or crystal csv
    er: Union[float, str]
    thickness: float
    is3D: bool #not needed here but I'm just making the classes symmetric
    n: float
    material: str
    latticeVectors: Union[list[float], str]

class Simulation_Setup(BaseModel):
    layers: list[Layer]
    source: Source

app = FastAPI()

origins = [ # specifies the website url of the front end, and what is allowed
    "http://localhost:3000",
    "localhost:3000",
    "192.168.1.215:3000",
    "http://192.168.1.215:3000",
    "https://localhost",
    "https://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/test_call")
def test_call():
    return {"Hello": "test"}

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/calculate_stack")
def calculate_stack(simulation: Simulation_Setup, response: Response):
    print(f"got a post request with simulation of {simulation}")
    source = simulation.source
    layers = simulation.layers
    if len(layers) <= 2:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Layers only had relfection and transmission, no device to simulate."}
    #try:
    layer_stack, layer_list = parse_layer_stack(layers)
    rw_s = parse_source(source, layer_list)
    wavelength_sweep = [float(val) for val in source.wavelengths.split(',') if val != "" and val != "\n"] 
    solver = rw.Solver(layer_stack, rw_s, N_HARMONICS)
    #results = solver.solve(wavelength = wavelength_sweep)
    return {"res": 'a'}#results}
    '''
    except Exception as e:
        print(f"Error trying to parse request of {e} with values {source, layers}")
        log.error(f"Error trying to parse request of {e} with values {source, layers}")
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "There was an error in your calculation setup"}
    
        '''