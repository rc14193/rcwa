import { useState } from "react"
import LatticeVectorsControl from "./LatticeVectorsControl";
import LayerCard from "./LayerCard";

export default function ControlColumn(){

    const [layers, setLayers] = useState([
        {
            name: "Reflection Layer",
            hasCrystal: false,
            ur: 1,
            er: 1,
            thickness: 0.0,
            n: 0.0,
            material: "",
            latticeVectors:[]
        },
        {
            name: "Transmission Layer",
            hasCrystal: false,
            ur: 1,
            er: 1,
            thickness: 0.0,
            n: 0.0,
            material: "",
            latticeVectors:[]
        }
    ])

    const addLayer = () => {
        var newLayer = {
            name: `Layer ${layers.length-1}`,
            hasCrystal: false,
            ur: 1,
            er: 1,
            thickness: 0.0,
            n: 0.0,
            material: "",
            latticeVectors: []
        }
        var newLayers = [...layers]
        newLayers.splice(layers.length-1, 0, newLayer)
        setLayers(newLayers)
    }

    const removeLayer = () => {
        if(layers.length === 2){
            return;
        }
        layers.splice(layers.length-2,1)
        setLayers([...layers])
    }

    return(
        <div className="controlColumn">
            <div className="layerControl">
                {layers.map((elem, idx) => <LayerCard layer={elem} isOnEnds={idx == 0 || idx == layers.length-1}/>)}
            </div>
            <span className="ctrlBtnSpan">
                <button className="controlBtns" onClick={addLayer}>Add Layer</button>
                <button className="controlBtns" onClick={removeLayer}>Remove Layer</button>
            </span>
        </div>
    )
}
