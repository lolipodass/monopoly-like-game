import { useAppSelector } from '@/store/hooks'
import '@css/playerInfo.css'
import socket from "@/Socket";

import { useEffect, useState } from "react"

export default () => {
    useEffect(() => {
        socket.on('turnStart', (player) => {
            SetTurn(player)
        })
    }, [])
    let [turn, SetTurn] = useState<number>(-1)

    const Players = useAppSelector(state => state.PlayersSlice)

    return (
        <>
            <div className="PlayersInfo">
                {Players.map((player, index) =>
                    <div key={index + 100} className={index == turn ? `playerInfo turn` : "playerInfo"}>
                        <div className={`PlayerName playerColor-${index}`}>
                            {player.name}
                        </div>
                        <div className="playerMoney">
                            {player.money}
                        </div>
                    </div>)}
            </div>
        </>
    )

}