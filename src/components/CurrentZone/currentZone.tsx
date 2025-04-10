type Props = {
    zone: string | null;
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