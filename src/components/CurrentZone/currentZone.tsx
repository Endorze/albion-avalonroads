type Props = {
    zone: string;
}

const CurrentZone = (zone: Props) => {
    return (
        <div>
            <h2>
                {zone.zone}
            </h2>
        </div>
    )
}

export default CurrentZone;