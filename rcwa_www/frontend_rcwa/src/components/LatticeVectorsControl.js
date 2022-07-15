import LatticeVector from "./LatticeVector"


export default function LatticeVectorsControl({addLatticeVector, modifyVector, removeLatticeVector, 
    idx, set3Dimensions, is3D, latticeVectors}) {


    return(
        <div className="latticeControl">
            <div style={{height:"100%"}}> 
                <span className="ctrlBtnSpan">
                    <button className="controlBtns" onClick={() => set3Dimensions(false, idx)}>2D</button>
                    <button className="controlBtns" onClick={() => set3Dimensions(true, idx)}>3D</button>
                </span>
                {latticeVectors.map((elem, Vidx) => <LatticeVector Vidx={Vidx} key={Vidx} magnitudes={elem} dims={is3D} modifyVector={modifyVector} idx={idx}/>)}
            </div>
            <div className="ctrlBtnSpan">
                <button className="controlBtns" onClick={() => addLatticeVector(idx)}>+</button>
                <button className="controlBtns" onClick={() => removeLatticeVector(idx)}>-</button>
            </div>
        </div>
    )
}