import { useAppSelector } from "@/store/hooks";
import "@css/players.css"

const offset = (position: number) => {
    if (position === 0)
        return 28;
    if (position === 10)
        return 800;
    return 40 + position * 75;
}

const position = (position: number) => {
    if (position < 10)
        return [offset(10 - position), offset(10)]
    if (position < 20)
        return [offset(0), offset(20 - position)]
    if (position < 30)
        return [offset(position % 10), offset(0)]
    else
        return [offset(10), offset(position % 10)]

}



export default () => {
    const players = useAppSelector((store) => store.PlayersSlice)


    return (
        <div className="players">

            {players.map((elem, index) => {
                const [left, top] = position(elem.position)
                return (<div className={`player player-${index}`} style={{ left: left, top: top }} key={index}></div>)
            })}

        </div>
    )



}
