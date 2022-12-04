import "./resources/css/app.css"
import Board from "./components/Board"

export default () => {
    return (
        <div className="wrapper">
            <div className="board-wrapper">
                <Board></Board>
            </div>
        </div>
    )

}