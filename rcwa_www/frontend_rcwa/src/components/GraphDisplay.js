
import { LineChart, Line, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function GraphDisplay({RTot, TTot, wavelengths}){
    var data = []
    for(let i = 0; i < wavelengths.length; i++){
        data.push({"RTot": RTot[i], "TTot": TTot[i], "wavelengths": wavelengths[i]})
    }
    console.log(data)
    return(
        <div className="graphDisplay">
        Graph Display
        <ResponsiveContainer width="100%" height="90%">
            <LineChart style={{color: 'black'}} data={data}>
                <XAxis dataKey="wavelengths"/>
                <YAxis domain={[0, 100]}/>
                <Tooltip />
                <Line dataKey="RTot"/>
                <Line dataKey="TTot"/>
            </LineChart>
        </ResponsiveContainer>
        </div>
    )
}