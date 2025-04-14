import styles from "./currentZone.module.css"

type Props = {
    zone: string | null;
    type: string | null;
}

const CurrentZone = (zone: Props) => {
    return (
        <div className={styles.zoneText}>
            <h2>
                {zone.zone}
            </h2>
            <h4>
                Type: {zone.type}
            </h4>
        </div>
    )
}

export default CurrentZone;