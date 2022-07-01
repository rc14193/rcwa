

export default function LatticeVector({idx, magnitudes, dims, modifyVector}) {
    return (
        <div className="vectorDisplay">
            <input className="vectorInput" type="number" value={magnitudes[0]} onChange={(e) => modifyVector(idx, 0, e)}/>
            <input className="vectorInput" type="number" value={magnitudes[1]} onChange={(e) => modifyVector(idx, 1, e)}/> 
            {dims? <input className="vectorInput" type="number" value={magnitudes[2]} onChange={(e) => modifyVector(idx, 2, e)}/>:
                <div /> }
        </div>
    )
}