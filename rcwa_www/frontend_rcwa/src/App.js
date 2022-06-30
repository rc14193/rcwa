import './App.css';
import Banner from './components/Banner';
import GraphDisplay from './components/GraphDisplay';
import ControlColumn from './components/ControlColumn';

function App() {
  return (
    <div style={{height:'100%'}}>
      <Banner />
      <div className='displayArea'>
        <GraphDisplay />
        <ControlColumn />
      </div>
      <footer>A web interface for Jordan Edmund's RCWA implementation</footer>
    </div>
  );
}

export default App;
