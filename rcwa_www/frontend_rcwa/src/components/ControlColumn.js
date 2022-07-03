import LatticeVectorsControl from "./LatticeVectorsControl";
import LayerControl from "./LayerControl"

export default function ControlColumn(){
    return(
        <div className="controlColumn">
                <LayerControl />
                <span className="ctrlBtnSpan">
                    <button className="controlBtns">Add Layer</button>
                    <button className="controlBtns">Remove Layer</button>
                </span>
        </div>
    )
}
