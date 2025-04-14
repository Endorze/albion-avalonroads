import ItemCounter from "../ItemCounter/itemCounter";
import styles from "./itemSection.module.css";
import green from "/images/chests/green.png"
import blue from "/images/chests/blue.png"
import orange from "/images/chests/orange.png"
import { useEffect, useState } from "react";
import CurrentZone from "../CurrentZone/currentZone";
import axios from "axios";
import ProgressBar from "../ProgressBar/progressBar";

const useOverlayTestEnvironment = true

const BACKEND_HOST = "90.143.5.6:55328"
const OVERLAY_HOST = useOverlayTestEnvironment ? BACKEND_HOST : "localhost:55327"

let zoneName: string | null = null

const ItemSection = () => {

    const [resources, setResources] = useState({
        tier: 0,
        wood: 0,
        woodCluster: 0,
        stone: 0,
        stoneCluster: 0,
        hide: 0,
        hideCluster: 0,
        ore: 0,
        oreCluster: 0,
        fiber: 0,
        fiberCluster: 0,
        green: 0,
        greenCluster: 0,
        blue: 0,
        yellow: 0,
        dungeon: 0,
        type: "JUNCTION"
    });

    const [exploredData, setExploredData] = useState({
        numRoads: 0,
        numRoadsExplored: 0,
    })

    const handleChange = async (key: keyof typeof resources, newValue: number | string) => {

        const response = await axios.post(`http://${BACKEND_HOST}/api/v1/roads/${zoneName}/edit`, {
            [key]: newValue
        })

        if (response.status != 200) {
            console.log("Something bad happened")
            return
        }

        setResources(response.data)
    }

    const fetchResources = async () => {

        if (zoneName == null) return;

        try {
            const response = await axios.get(`http://${BACKEND_HOST}/api/v1/roads/${zoneName}`)

            if (response.status != 200) {
                console.log("Something bad happened")
                return
            }

            setResources(response.data)
        } catch (error) {

        }
    }

    const fetchExplored = async () => {
        const response = await axios.get(`http://${BACKEND_HOST}/api/v1/roads/stats`)

        if (response.status != 200) {
            console.log("Something bad happened")
            return
        }

        setExploredData(response.data);
        console.log("ExploredZones:", response.data.numRoadsExplored, "/", response.data.numRoads);
    }

    useEffect(() => {
        const interval1 = setInterval(async () => {
            await getZoneName();
            await fetchResources();
        }, 3000)

        fetchExplored();
        const interval2 = setInterval(async () => {
            await fetchExplored();
        }, 10000)

        return () => {
            clearInterval(interval1)
            clearInterval(interval2)
        }
    }, []);

    const getZoneName = async () => {
        try {
            const response = await axios.get(`http://${OVERLAY_HOST}/api/v1/current-zone`)
            zoneName = response.data.name
        } catch (error) {
            zoneName = null
        }
    }

    if (zoneName == null) {
        return;
    }

    return (
        <div className={styles.wrapper}>
            <ProgressBar exploredZones={exploredData.numRoadsExplored} maxZones={exploredData.numRoads} />
            <CurrentZone zone={zoneName} type={resources.type} />
            <div className={styles.horizontal}>
                <div className={styles.tier}>
                    <div>
                        <h2>Tier</h2>
                    </div>
                    <div className={styles.section}>
                        <ItemCounter value={resources.tier} onChange={(value) => handleChange("tier", value)} />
                    </div>
                </div>
                <div className={styles.vertical}>
                    <div>
                        <h2>Small Resources</h2>
                    </div>
                    {/** 
                     * Behöver skapa en handleChange funktion som tar in en resurs, tar ett värde, text (handleChange("wood", value))
                    */}
                    <div className={styles.section}>
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Bloodoak%20Logs.png?locale=en" value={resources.wood} onChange={(value) => handleChange("wood", value)} />
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Slate.png?locale=en" value={resources.stone} onChange={(value) => handleChange("stone", value)} />
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Robust%20Hide.png?locale=en" value={resources.hide} onChange={(value) => handleChange("hide", value)} />
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Runite%20Ore.png?locale=en" value={resources.ore} onChange={(value) => handleChange("ore", value)} />
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Amberleaf%20Cotton.png?locale=en" value={resources.fiber} onChange={(value) => handleChange("fiber", value)} />
                    </div>
                </div>
                <div className={styles.vertical}>
                    <div>
                        <h2>Chest Content</h2>
                    </div>
                    <div className={styles.section}>
                        <ItemCounter imageSrc={green} value={resources.green} onChange={(value) => handleChange("green", value)} />
                        <ItemCounter imageSrc={blue} value={resources.blue} onChange={(value) => handleChange("blue", value)} />
                        <ItemCounter imageSrc={orange} value={resources.yellow} onChange={(value) => handleChange("yellow", value)} />
                    </div>
                </div>
            </div>
            <div className={styles.horizontal}>
                <div className={styles.vertical}>
                    <div className={styles.radioMenu}>
                        <h2>Zone Type</h2>
                        <div className={styles.individualRadioWrap}>
                            <label htmlFor="junction">Avalonian Junction</label>
                            <input type="radio" id="junction" name="zoneName" onChange={() => handleChange("type", "JUNCTION")}/>
                        </div>
                        <div className={styles.individualRadioWrap}>
                            <label htmlFor="corridor">Avalonian Corridor</label>
                            <input type="radio" id="corridor" name="zoneName" onChange={() => handleChange("type", "CORRIDOR")}/>
                        </div>
                        <div className={styles.individualRadioWrap}>
                            <label htmlFor="sanctuary">Avalonian Sanctuary</label>
                            <input type="radio" id="sanctuary" name="zoneName" onChange={() => handleChange("type", "SANCTUARY")}/>
                        </div>
                        <div className={styles.individualRadioWrap}>
                            <label htmlFor="goldsanctuary">Golden Sanctuary</label>
                            <input type="radio" id="goldsanctuary" name="zoneName" onChange={() => handleChange("type", "GOLD_SANCTUARY")}/>
                        </div>
                        <div className={styles.individualRadioWrap}>
                            <label htmlFor="rest">Avalonian Rest</label>
                            <input type="radio" id="rest" name="zoneName" onChange={() => handleChange("type", "REST")}/>
                        </div>
                    </div>
                    <div className={styles.section}>

                    </div>
                </div>
                <div className={styles.vertical}>
                    <div>
                        <h2>Resource Clusters</h2>
                    </div>
                    <div className={styles.section}>
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Bloodoak%20Logs.png?locale=en" value={resources.woodCluster} onChange={(value) => handleChange("woodCluster", value)} />
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Slate.png?locale=en" value={resources.stoneCluster} onChange={(value) => handleChange("stoneCluster", value)} />
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Robust%20Hide.png?locale=en" value={resources.hideCluster} onChange={(value) => handleChange("hideCluster", value)} />
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Runite%20Ore.png?locale=en" value={resources.oreCluster} onChange={(value) => handleChange("oreCluster", value)} />
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Amberleaf%20Cotton.png?locale=en" value={resources.fiberCluster} onChange={(value) => handleChange("fiberCluster", value)} />
                    </div>
                </div>
                <div className={styles.vertical}>
                    <div>
                        <h2>Chest Cluster</h2>
                    </div>
                    <div className={styles.section}>
                        <ItemCounter imageSrc={green} value={resources.greenCluster} onChange={(value) => handleChange("greenCluster", value)} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ItemSection;