import socket from "@/Socket";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addMessage } from "@/store/MessagesSlice";
import { Message } from "@/types/Message";
import { useEffect, useRef } from "react";
import '@css/messages.css'
import InputMessages from "./InputMessages";

export default () => {
    const dispatch = useAppDispatch()
    const refUl = useRef<HTMLUListElement>(null);
    const messages = useAppSelector((state) => state.MessagesSlice);


    useEffect(() => {
        let ID = -1;
        socket.on('ID', (id: number) => {
            ID = id;
        });

        socket.on('chat message', (message: Message) => dispatch(addMessage(message)));
    }, [])



    if (refUl.current !== null) {
        refUl.current.scrollTop = refUl.current.scrollHeight;
    }

    return (
        <>
            <ul ref={refUl} className="messages">
                {messages.map((message, index) => {
                    return (<li key={index} >{message.message}</li>)
                })}
            </ul>
            <InputMessages></InputMessages>
        </>
    )
}