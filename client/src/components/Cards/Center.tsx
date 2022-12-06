import '@css/center.css'
import socket from "@/Socket"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Message } from "@/types/Message"
import { deactivate } from "@/store/InformationSlice"
import { addMessage } from "@/store/MessagesSlice"
import { useEffect, useRef } from "react"




export default () => {
    const dispatch = useAppDispatch()
    const messages = useAppSelector((state) => state.MessagesSlice);
    const ref = useRef<HTMLUListElement>(null);


    useEffect(() => {
        socket.on('chat message', (message: Message) => dispatch(addMessage(message)))

    }, [])

    if (ref.current !== null) {
        ref.current.scrollTop = ref.current.scrollHeight;
    }



    return (
        <div className="center-square" onClick={() => dispatch(deactivate())}>

            <ul ref={ref} className="messages">
                {messages.map((message, index) => {
                    return (<li key={index} >{message.message}</li>)
                })}
            </ul>
            <form className='input-message'
                onSubmit={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    const target = e.target as typeof e.target & {
                        message: { value: string };
                    };
                    if (target.message.value) {
                        const message: Message = { message: target.message.value, sender: "test", time: new Date().toLocaleTimeString() };
                        socket.emit("chat message", message);
                        target.message.value = "";
                    }
                }}>
                <div>
                    <input type="text" name="message" />
                </div>
                <input type="submit" value="Log in" />
            </form>
            {/* <button onClick={() => { }}>Some event</button> */}
        </div>
    )

}