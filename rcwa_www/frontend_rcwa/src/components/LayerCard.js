import '../react-tabs.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import LatticeVectorsControl from './LatticeVectorsControl';

export default function LayerCard({layer, 
    isOnEnds, 
    updateLayerProp, 
    idx,
    set3Dimensions,
    removeLatticeVector,
    modifyVector,
    addLatticeVector}) {

    const vecArrow = '\u20D7'

    return(
        <div className="layerCard">
            <div>
                {layer.name}
                <br />
                <hr />
                { isOnEnds ? <div />:
                    <div>Crystal Structure
                    <span><input type="checkbox" onChange={(e) => updateLayerProp(idx, "hasCrystal", e.target.checked)}/></span></div>
                }
            </div>
            <Tabs>
                <TabList>
                    <Tab>props</Tab>
                    <Tab disabled={layer.hasCrystal? false:true}>crystal</Tab>
                    <Tab disabled={layer.hasCrystal? false:true}>L{vecArrow}</Tab>
                </TabList>

                <TabPanel>
                    <label className="propLabels">
                        er
                        <input type="number" disabled={layer.hasCrystal} onChange={(e) => updateLayerProp(idx, "er", e.target.value)} value={layer.er}/>
                    </label>
                    <label className="propLabels">
                        ur
                        <input type="number" disabled={layer.hasCrystal} onChange={(e) => updateLayerProp(idx, "ur", e.target.value)} value={layer.ur}/>
                    </label>
                    <label className="propLabels">
                        n
                        <input type="number" disabled={layer.hasCrystal} onChange={(e) => updateLayerProp(idx, "n", e.target.value)} value={layer.n}/>
                    </label>
                    <label className="propLabels">
                        thickness
                        <input type="number" onChange={(e) => updateLayerProp(idx, "thickness", e.target.value)} value={layer.thickness}/>
                    </label>
                </TabPanel>
                <TabPanel>
                    <Tabs>
                        <TabList>
                            <Tab>er</Tab>
                            <Tab>ur</Tab>
                        </TabList>

                        <TabPanel>
                            <textarea></textarea>
                        </TabPanel>
                        <TabPanel>
                            <textarea></textarea>
                        </TabPanel>
                    </Tabs>
                </TabPanel>
                <TabPanel>
                    <LatticeVectorsControl idx={idx} 
                        is3D={layer.is3D}
                        latticeVectors={layer.latticeVectors}
                        addLatticeVector={addLatticeVector}
                        removeLatticeVector={removeLatticeVector}
                        modifyVector={modifyVector}
                        set3Dimensions={set3Dimensions}/>
                </TabPanel>
            </Tabs>
        </div>
    )
}