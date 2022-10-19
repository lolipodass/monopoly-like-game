import { io } from "socket.io-client";
import * as ReactDOM from "react-dom/client";
import TesElement from "./TesElement";

var socket = io();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TesElement />
);

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   if (input.value) {
//     socket.emit("chat message", userName + ": " + input.value);
//     socket.emit("some event", userName + ": " + input.value);
//     input.value = "";
//   }
// });

// socket.on("chat message", function (msg) {
//   var item = document.createElement("li");
//   item.textContent = msg;
//   messages.appendChild(item);
//   window.scrollTo(0, document.body.scrollHeight);
// });
