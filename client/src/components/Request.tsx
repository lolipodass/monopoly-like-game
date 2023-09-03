import socket from "@/Socket"
import { useEffect, useState } from "react"

export default () => {
    const [ready, SetReady] = useState<boolean>(false)
    useEffect(() => {

        socket.on('BuyingRequest', (position: string, price: number) => {
            SetReady(true);
        })
    }
        , [])
    return (<>
        {ready && <div>
            <button onClick={() => {
                socket.emit('RequestResult', true)
                SetReady(false)
            }}>Accept</button>
            <button onClick={() => {
                socket.emit('RequestResult', false)
                SetReady(false)
            }}>Decline</button>
        </div>}
    </>
    )
}