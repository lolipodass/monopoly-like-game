import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Message } from "../types/Message";
import Board from "./Board";

export default () => {
  var socket = io();

  const [Messages, setMessages] = useState<Message[]>([])

  socket.on('dice', (value) => console.log(value));
  useEffect(() => {
    socket.on("chat message", (msg: Message) => {
      setMessages((arr) => [...arr, msg]);
      window.scrollTo(0, document.body.scrollHeight);
    })
  }, [])
  return (
    <>
      <ul id="messages">
        {Messages.map((text) => <li key={text.message}><b>{text.sender}</b>:{text.message} <span style={{ fontSize: 10, textAlign: "right" }}>{text.time}</span></li>)}
      </ul>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            jopa: { value: string };
          };
          const message: Message = { message: target.jopa.value, sender: "test", time: new Date().toLocaleTimeString() };
          if (message.message) {
            socket.emit("chat message", message);
            target.jopa.value = "";
          }
        }}>
        <div>
          <input type="text" name="jopa" />
        </div>
        <input type="submit" value="Log in" />
      </form>
      <button onClick={() => socket.emit('dice', "test")}>dice</button>

      <Board></Board>
    </>
  );
};



// const sendMessage = (e: SyntheticEvent) => {
//   e.preventDefault();
//   console.log(e.currentTarget.getElementByTagName('input'));
  // }
// }

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   if (input.value) {
//     socket.emit("chat message", userName + ": " + input.value);
//     socket.emit("some event", userName + ": " + input.value);
//     input.value = "";
//   }
// });


// });
