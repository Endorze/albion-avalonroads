import ItemCounter from "../ItemCounter/itemCounter";
import styles from "./itemSection.module.css";
import green from "../../../public/images/chests/green.png"
import blue from "../../../public/images/chests/blue.png"
import orange from "../../../public/images/chests/orange.png"
import { useState } from "react";

const ItemSection = () => {

    const [resources, setResources] = useState({
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

    return (
        <div className={styles.wrapper}>
            <div className={styles.horizontal}>
            <div className={styles.tier}>
                    <div>
                        <h2>Tier</h2>
                    </div>
                    <div className={styles.section}>
                        <ItemCounter />
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
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Bloodoak%20Logs.png?locale=en" value={resources.wood}/>
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Slate.png?locale=en" value={resources.stone}/>
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Robust%20Hide.png?locale=en" value={resources.hide}/>
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Runite%20Ore.png?locale=en" value={resources.ore}/>
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Amberleaf%20Cotton.png?locale=en" value={resources.fiber} />
                    </div>
                </div>
                <div className={styles.vertical}>
                    <div>
                        <h2>Content</h2>
                    </div>
                    <div className={styles.section}>
                        <ItemCounter imageSrc={green} />
                        <ItemCounter imageSrc={blue} />
                        <ItemCounter imageSrc={orange} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ItemSection;