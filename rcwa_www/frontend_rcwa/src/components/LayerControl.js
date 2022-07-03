import { useState } from "react"
import LayerCard from "./LayerCard"

export default function LayerColumn(){

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

    return(
        <div className="layerControl">
            {layers.map((elem, idx) => <LayerCard layer={elem} isOnEnds={idx == 0 || idx == layers.length-1}/>)}
        </div>
    )
}