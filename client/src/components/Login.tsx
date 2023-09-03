import socket from "@/Socket";
import { SyntheticEvent, useRef } from "react";
import '@css/login.css'

export default () => {
    const refLogin = useRef<HTMLInputElement>(null);
    const refDiv = useRef<HTMLDivElement>(null);

    return (
        <div ref={refDiv} className="login">
            <form className="login-form"
                onSubmit={(e: SyntheticEvent) => {
                    e.preventDefault();
                    const target = refLogin.current
                    if (target?.value) {
                        const message = { name: target.value };
                        socket.emit("login", message);
                        if (refDiv.current)
                            refDiv.current.className += ' hidden';
                        setTimeout(() => {
                            if (refDiv.current)
                                refDiv.current.style.display = 'none';
                        }, 1000);
                    }
                }}>
                Login
                <input autoComplete="off" ref={refLogin} type="text" name="login" />
            </form>
        </div>
    )
}