import "@css/app.css"
import Board from "@components/Board"
import socket from "@/Socket"
import { addPlayer, changeMoney, changePosition, PlayerInformation, removePlayer } from "./store/PlayersSlice"
import { useAppDispatch, useAppSelector } from "./store/hooks"
import Login from "./components/Login"
import { useEffect } from "react"
import { addMessage } from "./store/MessagesSlice"
import { Message } from "./types/Message"
import { changeCell } from "./store/BoardSlice"
import PlayersInfo from "./components/PlayersInfo"


const MessageMaker = (message: string, sender: string): Message => {
    return { message, sender, time: new Date().toLocaleTimeString() }
}
export default () => {
    const players = useAppSelector(state => state.PlayersSlice)
    const dispatch = useAppDispatch()

    useEffect(() => {
        socket.on('sync', (arr: [number, PlayerInformation][]) => {
            arr.forEach(element => { dispatch(addPlayer(element[1])) });
        })

        socket.on('PlayerLogin', (player: PlayerInformation) => {
            dispatch(addPlayer(player));
        })

        socket.on("playerDisconnect", (index: number) => {
            dispatch(removePlayer(index));
        })

        socket.on("turnEnd", (value: number) => [
        ])

        socket.on('gameStarted', (amountPlayers: number) => {
            dispatch(addMessage(MessageMaker(`Game starting`, 'server')))
        })
        socket.on('auctionCompany', (position: number) => {
            dispatch(addMessage(MessageMaker(`auction Company`, 'server')))
        })
        socket.on('auctionEnds', () => {
            dispatch(addMessage(MessageMaker(`auction Ends`, 'server')))
        })
        socket.on('BoughtCompany', (position: number, playerId: number) => {
            dispatch(changeCell({ cell: position, level: 0, player: playerId }));
        })
        socket.on('MoneyChanged', (player: number, value: number, name: string) => {
            console.log(name)
            dispatch(addMessage(MessageMaker(`Money changed for player ${name}, his money become: ${value}`, 'server')))
            dispatch(changeMoney({ player, value }));
        })

        socket.on('aboard', (message) => {
            dispatch(addMessage(MessageMaker(`server aboard: ${message}`, 'server')))
        })
        socket.on('event', (message) => {
            dispatch(addMessage(MessageMaker(`server says: ${message}`, 'server')))
        })
        socket.on('BuyingRequest', (position: string, price: number) => {
            dispatch(addMessage(MessageMaker(`BuyingRequest with price ${price}`, 'server')))
        })
    }, []);
    return (
        <>
            <div className="wrapper">
                <PlayersInfo></PlayersInfo>
                <div className="board-wrapper">
                    <Board></Board>
                    <Login></Login>
                </div>
            </div>
        </>
    )

}