
import { LineChart, Line, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function GraphDisplay({RTot, TTot, wavelengths}){
    var data = []
    for(let i = 0; i < wavelengths.length; i++){
        data.push({"RTot": RTot[i], "TTot": TTot[i], "wavelengths": wavelengths[i]})
    }
    return(
        <div className="graphDisplay">
            <ResponsiveContainer width="100%" height="95%">
                <LineChart data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10}}>
                    <XAxis dataKey="wavelengths" tick={{fill: 'white', stroke: 'white'}} stroke="white" 
                        label={{fill:'white', value: "Wavelength", position:"bottom", offset: -5}}/>
                    <YAxis domain={[0, 100]} tick={{fill: 'white', stroke: 'white'}} stroke="white" 
                    label={{fill:'white', value: "Efficiency", angle:-90, position:"insideLeft"}}/>
                    <Tooltip />
                    <Legend  align='right'/>
                    <Line dataKey="RTot" dot={false} stroke="green"/>
                    <Line dataKey="TTot" dot={false} stroke="red"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}