import { useState } from "react"


export default function LatticeVectorsControl() {
    const [latticeVectors, setLatticeVectors] = useState([])

    var addLatticeVector = () => {
        console.log("adding vector")
    }

    return(
        <div className="latticeControl">
            Lattice Vectors
            <span className="ctrlBtnSpan">
                <button className="controlBtns">2D</button>
                <button className="controlBtns">3D</button>
            </span>
            <span className="ctrlBtnSpan">
                <button className="controlBtns" onClick={addLatticeVector}>+</button>
                <button className="controlBtns">-</button>
            </span>
        </div>
    )
}