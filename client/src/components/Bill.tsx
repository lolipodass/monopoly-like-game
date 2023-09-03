import socket from "@/Socket";
import { useEffect, useState } from "react"

export default () => {

    useEffect(() => {

        socket.on('auctionCompany', (position: number) => {
            setAuction(true);
        })
        socket.on('auctionEnds', (position: number) => {
            setAuction(false);
        })
    }, [])

    let [auction, setAuction] = useState<boolean>(false)


    return (
        <>

            {auction && <button onClick={() => {
                socket.emit('bet', 100);

            }}>bill</button>}
        </>

    )
}