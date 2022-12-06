import "@css/board.css"
import Card from "@components/Cards/Company";
import CenterCard from "@components/Cards/Center";
import Corner from "@components/Cards/Corner";
import Question from "@components/Cards/Question";
import Information from "@components/Cards/Information";
import Players from "@components/Players";
import { cardCompanyInfo, cellType, rotation } from "@/types/CardInfo";
import Cards from "@/resources/information/Cards";




export default () => {

    return (
        <div className="board">

            {Cards.map((i, index) => {
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
            <Players></Players>
        </div>)
}