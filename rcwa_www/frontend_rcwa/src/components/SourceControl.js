
export default function SourceControl({layers, updateSource}) {
    const theta = "\u03B8"
    const phi = "\u03D5"
    const relativeLayers = [{name:"Free Space"}].concat(layers)

    return(
        <div className="m-2 bg-slate-700 p-2 rounded text-gray-300">
            Source Control
            <hr />
            <label className="propLabels">
                Wavelength&nbsp;
                <input type="number" onChange={(e) => updateSource("centerWavelength", e.target.value)}/>
            </label>
            <label className="propLabels">
                {theta}
                <input type="number" placeholder="degrees" onChange={(e) => updateSource("theta", e.target.value)}/>
            </label>
            <label className="propLabels">
                {phi}
                <input type="number" placeholder="degrees" onChange={(e) => updateSource("phi", e.target.value)}/>
            </label>
            <div className="flex">
                <label className="propLabels" onChange={(e) => updateSource("pTE", e.target.value)}>
                    pTE&nbsp;
                    <input type="number" />
                </label>
                <label className="propLabels">
                    pTM&nbsp;
                    <input type="number" onChange={(e) => updateSource("pTM", e.target.value)}/>
                </label>
            </div>
            <label className="propLabels">
                Wavelengths
                <input placeholder={"start,stop,step"} onChange={(e) => updateSource("wavelengths", e.target.value)}/>
            </label>
            <div className="propLabels">
                Layer Location
                <select onChange={(e) => updateSource("LayerLocIdx", e.target.value)}>
                    {relativeLayers.map((layer, idx) => {
                        return (<option key={idx} value={idx}>{layer.name}</option>)
                    })}
                </select>
            </div>
        </div>
    )
}