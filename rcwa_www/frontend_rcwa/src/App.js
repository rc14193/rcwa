import './App.css';
import * as C from "./constants"
import Banner from './components/Banner';
import GraphDisplay from './components/GraphDisplay';
import ControlColumn from './components/ControlColumn';

function App() {
  return (
    <div className='mainContentGroup'>
      <Banner />
      <div className='displayArea'>
        <GraphDisplay />
        <ControlColumn />
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
