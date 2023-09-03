import "@css/board.css"
import Card from "@components/Cards/Company";
import CenterCard from "@components/Cards/Center";
import Corner from "@components/Cards/Corner";
import Question from "@components/Cards/Question";
import Information from "@components/Cards/Information";
import Players from "@components/Players";
import { cardCompanyInfo, cellType, rotation } from "@/types/CardInfo";
import Cards from "@/resources/information/Cards";
import Companies from "@/resources/information/Companies";




export default () => {


    return (
        <div className="board">

            {Cards.map((elem, index) => {
                if (elem.rotation === rotation.corner)
                    return (<Corner type={elem.type} key={index}></Corner>)
                else if (elem.type === cellType.question)
                    return (<Question rotation={elem.rotation} key={index}></Question>)
                else if (elem.type === cellType.train) {
                    elem.companyInfo = 24;
                    console.log(Companies[22]);
                    return (<Card information={elem as cardCompanyInfo} company={Companies[22]} index={index} key={index} ></Card>)
                }
                else if (elem.type === cellType.airlines) {
                    elem.companyInfo = 30;
                    return (<Question rotation={elem.rotation} key={index}></Question>)
                    // return (<Card information={elem as cardCompanyInfo} company={Companies[1]} key={index} ></Card>)
                }
                else if (elem.type === cellType.money) {
                    elem.companyInfo = 30;
                    return (<Question rotation={elem.rotation} key={index}></Question>)
                    // return (<Card information={elem as cardCompanyInfo} company={Companies[1]} key={index} ></Card>)
                }
                const element = elem as cardCompanyInfo
                return (<Card information={element} company={Companies[element.companyInfo]} index={index} key={index}></Card>)
            })}
            <CenterCard></CenterCard>
            <Information />
            <Players></Players>
        </div>)
}