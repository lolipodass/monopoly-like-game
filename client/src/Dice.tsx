import { useEffect, useState } from "react"
import socket from "./Socket"
import { useAppDispatch } from "./store/hooks"
import { changePosition } from "./store/PlayersSlice";

interface Dice {
    dice1: number,
    dice2: number,
}

export default () => {
    const [dices, setDices] = useState<Dice>({ dice1: 1, dice2: 1 });
    const [show, setShow] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        socket.on('dice', (player: number, dice1: number, dice2: number) => {
            dispatch(changePosition({ player, value: dice1 + dice2 }))
            setDices({ dice1, dice2 });
            setShow(true);
            setTimeout(() => {
                setDices({ dice1: 0, dice2: 0 });

                setShow(false);
            }, 1500);
        })
    }, [])

    return (<>
        {show && <div className="dices">
            <img className="dice" src={`./icons/dice${dices?.dice1}.png`} />
            <img className="dice" src={`./icons/dice${dices?.dice2}.png`} />
        </div>}
    </>
    )
}