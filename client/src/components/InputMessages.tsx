import socket from "@/Socket";
import { Message } from "@/types/Message";
import { SyntheticEvent, useRef } from "react";

export default () => {
    const refMessages = useRef<HTMLInputElement>(null);

    const SendMessage = (e: SyntheticEvent) => {
        e.preventDefault();
        const target = refMessages.current
        if (target?.value) {
            const message: Message = { message: target.value, sender: '', time: new Date().toLocaleTimeString() };
            socket.emit("chat message", message);
            target.value = "";
        }
    }

    return (
        <form className='input-message'
            onSubmit={SendMessage}>
            <div>
                <input ref={refMessages} type="text" name="message" />
            </div>
        </form>
    )
}