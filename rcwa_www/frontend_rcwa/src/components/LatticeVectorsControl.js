import { useState } from "react"
import LatticeVector from "./LatticeVector"


export default function LatticeVectorsControl() {
    const [latticeVectors, setLatticeVectors] = useState([])
    const [is3D, setis3D] = useState(true)

    var addLatticeVector = () => {
        if (latticeVectors.length >= 3){
            return
        }
        let newVs = [...latticeVectors]
        newVs.push([0,0,0])
        setLatticeVectors(newVs)
    }

    var set3Dimensions = (status) => {
        setis3D(status)
    }

    var removeLatticeVector = () => {
        if(latticeVectors.length <= 0) {
            return
        }
        let newVs = [...latticeVectors]
        newVs.pop()
        setLatticeVectors(newVs)
    }

    var modifyVector = (vectorIdx, component, event) => {
        let newVs = [...latticeVectors]
        newVs[vectorIdx][component] = event.target.value
        setLatticeVectors(newVs)
    }

    return(
        <div className="latticeControl">
            <div style={{height:"100%"}}> 
                Lattice Vectors
                <span className="ctrlBtnSpan">
                    <button className="controlBtns" onClick={() => set3Dimensions(false)}>2D</button>
                    <button className="controlBtns" onClick={() => set3Dimensions(true)}>3D</button>
                </span>
                {latticeVectors.map((elem, idx) => <LatticeVector idx={idx} key={idx} magnitudes={elem} dims={is3D} modifyVector={modifyVector}/>)}
            </div>
            <span className="ctrlBtnSpan">
                <button className="controlBtns" onClick={addLatticeVector}>+</button>
                <button className="controlBtns" onClick={removeLatticeVector}>-</button>
            </span>
        </div>
    )
}