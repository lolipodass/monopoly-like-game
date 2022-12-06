import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changePosition } from "@/store/PlayersSlice";
import "@css/players.css"

const offset = (position: number) => {
    if (position === 0)
        return 28;
    if (position === 10)
        return 800;
    return 40 + position * 75;
}

const position = (position: number) => {
    if (position == 10)
        return [offset(0), offset(10)]
    if (position == 20)
        return [offset(0), offset(0)]
    if (position == 30)
        return [offset(10), offset(0)]
    if (position == 0)
        return [offset(10), offset(10)]
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
    const dispatch = useAppDispatch();
    return (
        <div className="players">
            <button onClick={() => { dispatch(changePosition({ number: 2, player: 0 })) }}>pos</button>


            {players.map((elem, index) => {
                const [left, top] = position(elem.position)
                return (<div className={`player player-${index}`} style={{ left: left, top: top }} key={index}></div>)
            })}
            {/* <div className="player one" style={{ left: offset(5), top: "10px" }}></div>
            <div className="player two" style={{ left: offset(6), top: "20px" }}></div>
            <div className="player three" style={{ left: offset(3), top: "30px" }}></div>
            <div className="player four" style={{ left: offset(5), top: offset(10) }}></div> */}
        </div>
    )



}
