import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../react-tabs.css'

export default function LayerCard({layer, isOnEnds}) {

    const vecArrow = '\u20D7'

    return(
        <div className="layerCard">
            <div>
                {layer.name}
                <br />
                <hr />
                { isOnEnds ? <div />:
                    <div>Crystal Structure
                    <span><input type="checkbox"/></span></div>
                }
            </div>
            <Tabs>
                <TabList>
                    <Tab>props</Tab>
                    <Tab disabled={layer.hasCrystal? false:true}>crystal</Tab>
                    <Tab disabled={layer.hasCrystal? false:true}>L{vecArrow}</Tab>
                </TabList>

                <TabPanel>
                    <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
        </div>
    )
}