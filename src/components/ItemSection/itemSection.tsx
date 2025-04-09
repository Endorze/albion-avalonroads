import ItemCounter from "../ItemCounter/itemCounter";
import styles from "./itemSection.module.css";
import green from "/images/chests/green.png"
import blue from "/images/chests/blue.png"
import orange from "/images/chests/orange.png"
import { useEffect, useState } from "react";
import CurrentZone from "../CurrentZone/currentZone";
import axios from "axios";

let zoneName = ""

const ItemSection = () => {

    const [resources, setResources] = useState({
        name: "",
        wood: 0,
        stone: 0,
        ore: 0,
        hide: 0,
        fiber: 0,
        green: 0,
        blue: 0,
        yellow: 0,
        tier: 0
    });

    const handleChange = async (key: keyof typeof resources, newValue: number) => {

        const response = await axios.post(`http://192.168.0.21:55328/api/v1/roads/${zoneName}/edit`, {
            [key]: newValue
        })

        if (response.status != 200) {
            console.log("Something bad happened")
            return
        }

        setResources(response.data)
    }

    const fetchResources = async () => {
        const response = await axios.get(`http://192.168.0.21:55328/api/v1/roads/${zoneName}`)
        
        if (response.status != 200) {
            console.log("Something bad happened")
            return
        }

        setResources(response.data)
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            await getZoneName();
            await fetchResources();
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    }, []);

    const getZoneName = async () => {
        const response = await axios.get("http://192.168.0.21:55328/api/v1/current-zone")
        zoneName = response.data.name
    }

    return (
        <div className={styles.wrapper}>
            <CurrentZone zone={zoneName}/>
            <div className={styles.horizontal}>
            <div className={styles.tier}>
                    <div>
                        <h2>Tier</h2>
                    </div>
                    <div className={styles.section}>
                        <ItemCounter value={resources.tier} onChange={(value) => handleChange("tier", value)}/>
                    </div>
                </div>
                <div className={styles.vertical}>
                    <div>
                        <h2>Resources</h2>
                    </div>
                    {/** 
                     * Behöver skapa en handleChange funktion som tar in en resurs, tar ett värde, text (handleChange("wood", value))
                    */}
                    <div className={styles.section}>
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Bloodoak%20Logs.png?locale=en" value={resources.wood} onChange={(value) => handleChange("wood", value)}/>
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Slate.png?locale=en" value={resources.stone} onChange={(value) => handleChange("stone", value)}/>
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Robust%20Hide.png?locale=en" value={resources.hide} onChange={(value) => handleChange("hide", value)}/>
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Runite%20Ore.png?locale=en" value={resources.ore} onChange={(value) => handleChange("ore", value)}/>
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Amberleaf%20Cotton.png?locale=en" value={resources.fiber} onChange={(value) => handleChange("fiber", value)}/>
                    </div>
                </div>
                <div className={styles.vertical}>
                    <div>
                        <h2>Content</h2>
                    </div>
                    <div className={styles.section}>
                        <ItemCounter imageSrc={green} value={resources.green} onChange={(value) => handleChange("green", value)}/>
                        <ItemCounter imageSrc={blue} value={resources.blue} onChange={(value) => handleChange("blue", value)}/>
                        <ItemCounter imageSrc={orange} value={resources.yellow} onChange={(value) => handleChange("yellow", value)} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ItemSection;