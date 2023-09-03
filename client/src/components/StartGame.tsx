import socket from "@/Socket";
import { SyntheticEvent } from "react";

export default () => {
    return (<button onClick={(e: SyntheticEvent) => {
        socket.emit('readyToStart');
        const target = e.target as HTMLButtonElement;
        target.className += ' hidden';
        setTimeout(() => {
            if (target)
                target.style.display = 'none';
        }, 1000);
    }}>start Game</button>)
}