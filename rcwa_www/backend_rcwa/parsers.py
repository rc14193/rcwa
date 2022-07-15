import logging
import rcwa as rw

from rcwa_www.backend_rcwa.api import Layer, Source

log = logging.getLogger(__name__)

def parse_optical_constants(optical_values: str):
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
    for key, value in layer.__dict__.items():
        if hasattr(layer, key):
            setattr(rw_layer, key, value)

    if layer.has_crystal:
        layer.er = parse_optical_constants(layer.er)
        layer.ur = parse_optical_constants(layer.ur)
        if len(layer.er) > len(layer.ur):
            layer.ur = [1 for _ in layer.er]
        elif len(layer.ur) > len(layer.er):
            layer.er = [1 for _ in layer.er]
        rw_layer.homogenous = False
        c = rw.Crystal(*layer.lattice_vectors, layer.er, layer.ur)
        rw_layer.crystal = c
    return rw_layer


def parse_layer_stack(layers: list[Layer]) -> rw.LayerStack:
    stack = [parse_layer(l) for l in layers]
    pass