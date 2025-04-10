import styles from "./progressBar.module.css"

type Props = {
    exploredZones: number,
    maxZones: number,
}

const ProgressBar = ({exploredZones, maxZones}: Props) => {

    const percentage = (exploredZones / maxZones) * 100;
    
    return (
        <div className={styles.wrap}>
            <div style={{ width: '100%', backgroundColor: '#ddd', borderRadius: 10, overflow: 'hidden', height: 30 }}>
        <div
            style={{
            width: `${percentage}%`,
            backgroundColor: '#4caf50',
            height: '100%',
            transition: 'width 0.5s',
            }}
        />
        </div>
        <p>{exploredZones}/{maxZones} explored ({percentage.toFixed(1)}%)</p>
        </div>
    )
}

export default ProgressBar;