import './App.css';
import * as C from "./constants"
import Banner from './components/Banner';
import GraphDisplay from './components/GraphDisplay';
import ControlColumn from './components/ControlColumn';
import { useState } from 'react';

function App() {

  const [RTot, setRTot] = useState([])
  const [TTot, setTTot] = useState([])
  const [wavelengths, setWavelengths] = useState([])

  if(wavelengths.length === 0){
    var wave = []
    var r = []
    var t = []
    for(let i = 0; i < 201; i++){
      wave.push(200+i)
      r.push(30)
      t.push(40)
    }
    setRTot(r)
    setTTot(t)
    setWavelengths(wave)

  }

  return (
    <div className='mainContentGroup'>
      <Banner />
      <div className='displayArea'>
        <GraphDisplay RTot={RTot} TTot={TTot} wavelengths={wavelengths}/>
        <ControlColumn setTTot={setTTot} setRTot={setRTot} setWavelengths={setWavelengths}/>
      </div>
      <footer>
        <div>
          A web interface for Jordan Edmund's RCWA implementation
        </div>
        <div>
          v{C.VERSION_NUM}
        </div>
      </footer>
    </div>
  );
}

export default App;
