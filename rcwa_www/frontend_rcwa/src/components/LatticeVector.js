

export default function LatticeVector({Vidx, magnitudes, dims, modifyVector, idx}) {
    return (
        <div className="vectorDisplay">
            <input className="vectorInput" type="number" value={magnitudes[0]} onChange={(e) => modifyVector(Vidx, 0, e, idx)}/>
            <input className="vectorInput" type="number" value={magnitudes[1]} onChange={(e) => modifyVector(Vidx, 1, e, idx)}/> 
            {dims? <input className="vectorInput" type="number" value={magnitudes[2]} onChange={(e) => modifyVector(Vidx, 2, e, idx)}/>:
                <div /> }
        </div>
    )
}