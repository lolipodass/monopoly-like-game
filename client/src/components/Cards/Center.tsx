import '@css/center.css'
import socket from "@/Socket"
import { useAppDispatch } from "@/store/hooks"
import { deactivate } from "@/store/InformationSlice"
import PlayerTurn from '@components/PlayerTurn'
import Messages from '@components/Messages'
import StartGame from '@components/StartGame'
import Request from '@components/Request'
import Dice from '@/Dice'


export default () => {
    const dispatch = useAppDispatch()




    return (
        <>
            <div className="center-square" onClick={() => dispatch(deactivate())}>
                <Messages />

                <StartGame></StartGame>
                <Request></Request>

                <Dice></Dice>
                <PlayerTurn></PlayerTurn>
            </div>
        </>
    )

}