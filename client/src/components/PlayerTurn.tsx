import socket from "@/Socket";
import { useEffect, useState } from "react"

export default () => {

    useEffect(() => {
        let ID = -1;
        socket.on('ID', (id: number) => {
            ID = id;
        });

        socket.on('turnStart', (player) => {
            if (player === ID)
                SetTurn(true);
            else
                SetTurn(false);
        })
    }, [])

    let [turn, SetTurn] = useState<boolean>(false)


    return (
        <>

            {turn && <button onClick={() => {
                socket.emit('turnEnd')
            }}>End turn</button>}
        </>

    )
}