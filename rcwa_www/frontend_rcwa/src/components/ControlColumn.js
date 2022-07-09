import { useState } from "react"
import LatticeVectorsControl from "./LatticeVectorsControl";
import LayerCard from "./LayerCard";
import SourceControl from "./SourceControl";

export default function ControlColumn(){

    const [layers, setLayers] = useState([
        {
            name: "Reflection Layer",
            hasCrystal: false,
            ur: 1,
            er: 1,
            thickness: 0.0,
            n: 0.0,
            is3D: false,
            material: "",
            latticeVectors:[]
        },
        {
            name: "Transmission Layer",
            hasCrystal: false,
            ur: 1,
            er: 1,
            thickness: 0.0,
            is3D: false,
            n: 0.0,
            material: "",
            latticeVectors:[]
        }
    ])

    const [source, setSource] = useState({
        centerWavelength: 500,
        pTE: 1,
        pTM: 1,
        theta: 0,
        phi: 0,
        wavelengths: "",
        layerLocIdx: 0,
    })

    const updateSource = (prop, newValue) => {
        console.log(`updating source's ${prop} to value ${newValue}`)
        source[prop] = newValue
        setSource({...source})
    }

    const addLayer = () => {
        var newLayer = {
            name: `Layer ${layers.length-1}`,
            hasCrystal: false,
            ur: 1,
            er: 1,
            thickness: 0.0,
            n: 0.0,
            material: "",
            is3D: true,
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

    const updateLayerProp = (idx, prop, newValue) => {
        console.log(`called to update layer ${idx}, prop ${prop} to value ${newValue}`)
        layers[idx][prop] = newValue
        switch(prop){
            case "er":
                layers[idx].n = Math.sqrt(newValue*layers[idx].ur)
                break;
            case "ur":
                layers[idx].n = Math.sqrt(newValue*layers[idx].er)
                break;
            case "n":
                layers[idx].er = newValue*newValue
                layers[idx].ur = 1
                break;
        }
        setLayers([...layers])
    }    

    var addLatticeVector = (idx) => {
        var layer = layers[idx]
        if (layer.latticeVectors.length >= 3){
            return
        }
        let newVs = [...layer.latticeVectors]
        newVs.push([0,0,0])
        layer.latticeVectors = newVs
        layers[idx] = layer
        setLayers([...layers])
    }

    var set3Dimensions = (status, idx) => {
        var layer = layers[idx]
        layer.is3D = status
        layers[idx] = layer
        setLayers([...layers])
    }

    var removeLatticeVector = (idx) => {
        var layer = layers[idx]
        if(layer.latticeVectors.length <= 0) {
            return
        }
        let newVs = [...layer.latticeVectors]
        newVs.pop()
        layer.latticeVectors = newVs
        setLayers([...layers])
    }

    var modifyVector = (vectorIdx, component, event, idx) => {
        var layer = layers[idx]
        layer.latticeVectors[vectorIdx][component] = event.target.value
        layers[idx] = layer
        setLayers([...layers])
    }

    return(
        <div className="controlColumn">
            <SourceControl layers={layers} updateSource={updateSource}/>
            <div className="flex">
                    <button className="controlBtns" onClick={addLayer}>Add Layer</button>
                    <button className="controlBtns" onClick={removeLayer}>Remove Layer</button>
            </div>
            <div className="layerControl">
                {layers.map((elem, idx) => <LayerCard layer={elem} 
                    key = {idx}
                    set3Dimensions={set3Dimensions}
                    addLatticeVector={addLatticeVector}
                    removeLatticeVector={removeLatticeVector}
                    modifyVector={modifyVector}
                    updateLayerProp={updateLayerProp}
                    isOnEnds={idx == 0 || idx == layers.length-1} 
                    idx={idx}/>)}
            </div>
        </div>
    )
}
