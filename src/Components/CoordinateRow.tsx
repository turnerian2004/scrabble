import { CoordinateTile } from './CoordinateTile'

export interface CoordinateRowProps {
    coordinates: string[]
    classes?: string
}

export const CoordinateRow: React.FC<CoordinateRowProps> = ({
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
