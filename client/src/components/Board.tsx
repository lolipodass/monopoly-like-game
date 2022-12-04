import "./../resources/css/board.css"
import Card from "./Cards/Company";
import CenterCard from "./Cards/Center";
import cardInfo, { rotation, cellType, cardCompanyInfo } from "../types/CardInfo";
import Corner from "./Cards/Corner";
import Question from "./Cards/Question";
import Information from "./Cards/Information";

export default () => {

    return (
        <div className="board">

            {cardInfo.map((i, index) => {
                if (i.rotation === rotation.corner)
                    return (<Corner type={i.type} key={index}></Corner>)
                else if (i.type === cellType.question)
                    return (<Question key={index}></Question>)
                else if (i.type === cellType.train) {
                    i.companyInfo = 30;
                    return (<Card information={i as cardCompanyInfo} key={index} ></Card>)
                }
                return (<Card information={i as cardCompanyInfo} key={index}></Card>)
            })}
            <CenterCard></CenterCard>
            <Information />
        </div>)
}