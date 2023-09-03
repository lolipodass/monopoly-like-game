import { rotation } from "@/types/CardInfo"

export default ({ rotation }: { rotation: rotation }) => {
    return (<div className={`card question ${rotation}`}>
        <div className="picture">
            <img className="_logo _logo-question" src={`./icons/question.png`} />
        </div>
    </div>)
}