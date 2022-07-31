
import { LineChart, Line, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function GraphDisplay({RTot, TTot, wavelengths}){
    var data = []
    for(let i = 0; i < wavelengths.length; i++){
        data.push({"RTot": RTot[i], "TTot": TTot[i], "wavelengths": wavelengths[i]})
    }
    console.log(data)
    return(
        <div className="graphDisplay">
        <ResponsiveContainer width="100%" height="90%">
            <LineChart style={{color: 'black'}} data={data}
                margin={{ top: 5, right: 30, left: 20}}>
                <XAxis dataKey="wavelengths" tick={{fill: 'white', stroke: 'white'}} stroke="white"
                    label={{fill:'white', value: "Wavelength", position:"bottom"}}/>
                <YAxis domain={[0, 100]} tick={{fill: 'white', stroke: 'white'}} stroke="white" 
                label={{fill:'white', value: "Efficiency", angle:-90, position:"insideLeft"}}/>
                <Tooltip />
                <Line dataKey="RTot" dot={false}/>
                <Line dataKey="TTot" dot={false}/>
            </LineChart>
        </ResponsiveContainer>
        </div>
    )
}