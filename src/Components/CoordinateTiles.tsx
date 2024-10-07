import { CoordinateTile } from './CoordinateTile'

export interface CoordinatesProps {
    coordinates: string[]
    classes?: string
}

export const CoordinateTiles: React.FC<CoordinatesProps> = ({
    coordinates,
    classes,
}) => {
    return (
        <div className={classes}>
            {coordinates.map((char, index) => (
                <CoordinateTile key={index} character={char} />
            ))}
        </div>
    )
}
