type Props = {
    zone_name: string,
    tier: number,
    wood: number,
    wood_cluster: boolean,
    stone: number,
    stone_cluster: boolean,
    ore: number,
    ore_cluster: boolean,
    hide: number,
    hide_cluster: boolean,
    fiber: number,
    fiber_cluster: boolean,
    green: number,
    blue: number,
    yellow: number
}

const CurrentZone = (props: Props) => {
    return (
        <div>
            <h2>
                {props.zone_name}
            </h2>
        </div>
    )
}