import { useState } from "react"
import {ReloadOutlined} from '@ant-design/icons'
import LayerCard from "./LayerCard";
import SourceControl from "./SourceControl";
import axios from 'axios';
import * as C from "../constants"

export default function ControlColumn(){

    const [processing, setProcessing] = useState(false)

    const [layers, setLayers] = useState([
        {
            name: "Reflection Layer",
            hasCrystal: false,
            ur: 1,
            er: 1,
            thickness: 0.0,
            is3D: false,
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

    const [errorMsg, setErrorMsg] = useState("")
    const [errorDisplay, setErrorDisplay] = useState(false)

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
            default:
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

    const callForCalculation = () => {
        setProcessing(true)
        axios.post(`http://${C.BACKEND}/calculate_stack`, {layers: layers, source: source})
            .then(res => {
                console.log(res)
                console.log(res.data)
                setProcessing(false)
            }).catch(res => {
                console.log(res)
                console.log(res.response.data)
                setErrorMsg(res.response.data.error)
                setErrorDisplay(true)
                setTimeout(function(){setErrorDisplay(false)}, 1000)
                setProcessing(false)
            })
    }

    const CalcButton = () =>{
        if(processing){
            return (
                <div className="flex justify-center items-center">
                    Processing&nbsp;&nbsp;
                    <div className="flex animate-spin">
                        <ReloadOutlined />
                    </div>
                </div>
            )
        }
        else {
            return(
                <div>
                    Calculate
                </div>
            )
        }
    }

    let errorStyle = ""
    if (errorDisplay){
    // apparently mixing flexbox and fixed is weird, that's why I use left-1/3. It seems to work.
        errorStyle = "fixed top-1/2 left-1/2 bg-gray-700 p-3 text-red-500 rounded opacity-100 z-10" 
    }
    else {
        errorStyle = "fixed top-1/2 left-1/2 bg-gray-700 p-3 text-red-500 rounded z-10 opacity-0 duration-1000"
    }

    return(
        <div className="controlColumn">
            <div className={errorStyle} style={{transform: 'translate(-50%, -50%)'}}>{errorMsg}</div>
            <div className="flex">
                    <button className="controlBtns" onClick={callForCalculation}>{CalcButton()}</button>
            </div>
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
                    isOnEnds={idx === 0 || idx === layers.length-1} 
                    idx={idx}/>)}
            </div>
        </div>
    )
}
