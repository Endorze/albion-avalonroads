import ItemCounter from "../ItemCounter/itemCounter";
import styles from "./itemSection.module.css";
import green from "../../../public/images/chests/green.png"
import blue from "../../../public/images/chests/blue.png"
import orange from "../../../public/images/chests/orange.png"

const ItemSection = () => {
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
                    <div className={styles.section}>
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Bloodoak%20Logs.png?locale=en" />
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Slate.png?locale=en" />
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Robust%20Hide.png?locale=en" />
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Runite%20Ore.png?locale=en" />
                        <ItemCounter imageSrc="https://render.albiononline.com/v1/item/Amberleaf%20Cotton.png?locale=en" />
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