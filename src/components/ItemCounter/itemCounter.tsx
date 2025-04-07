import { useState } from "react";
import styles from "./itemCounter.module.css"

type Props = {
    imageSrc?: string,
}

const ItemCounter = ({ imageSrc }: Props) => {
    const [count, setCount] = useState(0);

    const increase = () => setCount(c => c + 1);
    const decrease = () => setCount(c => Math.max(0, c - 1));

    return (
        <div className={styles.item}>
            <button onClick={increase}>🔼</button>
            <div style={{
                backgroundImage: `url(${imageSrc})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",  width: "80px",
                height: "80px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px"
            }}>
                <div className={styles.counter}>{count}</div>
            </div>
            {count > 0 && (
                <button onClick={decrease}>🔽</button>
            )}
        </div>
    );
};

export default ItemCounter;
