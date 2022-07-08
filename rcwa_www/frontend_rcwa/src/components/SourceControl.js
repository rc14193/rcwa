
export default function SourceControl() {
    const theta = "\u03B8"
    const phi = "\u03D5"

    return(
        <div className="m-2 bg-teal-600 p-2 rounded">
            Source Control
            <hr />
            <label className="propLabels">
                Wavelength&nbsp;
                <input type="number" />
            </label>
            <label className="propLabels">
                {theta}
                <input type="number" />
            </label>
            <label className="propLabels">
                {phi}
                <input type="number" />
            </label>
        </div>
    )
}