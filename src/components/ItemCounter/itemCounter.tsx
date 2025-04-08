import { useState } from "react";
import styles from "./itemCounter.module.css"

type Props = {
    imageSrc?: string,
    value: number,
    onChange: (newValue: number) => void
}

const ItemCounter = ({ imageSrc, value, onChange }: Props) => {

    const increase = () => onChange(value + 1);
    const decrease = () => onChange(Math.max(0, value - 1));

    return (
        <div className={styles.item}>
            <button onClick={increase}>🔼</button>
            <div style={{
                backgroundImage: `url(${imageSrc})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",  width: "80px",
                height: "80px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px"
            }}>
                <div className={styles.counter}>{value}</div>
            </div>
            {value > 0 && (
                <button onClick={decrease}>🔽</button>
            )}
        </div>
    );
};

export default ItemCounter;
