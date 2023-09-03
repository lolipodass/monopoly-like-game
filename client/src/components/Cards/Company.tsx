import Groups from "@/resources/information/Groups"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { activate } from "@/store/InformationSlice"
import { cardCompanyInfo, companyInfo } from "@/types/CardInfo"
import "@css/company.css"


export default ({ information, company, index }: { information: cardCompanyInfo, company: companyInfo, index: number }) => {

    const color = Groups[company.group].color;
    const dispatch = useAppDispatch()
    const Cell = useAppSelector(store => store.BoardSlice)[index];
    return (
        <div className={`card player-${Cell[0]}  ${information.rotation}`} onClick={(e) => {
            dispatch(activate(information.companyInfo))
        }}>
            <div className="stars">
                <span className={`star level-${Cell[1]}`} />
            </div>
            <div className="picture">
                <img className="_logo" src={`./icons/${information.companyInfo + 1}.svg`} />
            </div>
            <div className="price" style={{ backgroundColor: color }}>
                <div>
                    {company.price}
                </div>
            </div>
        </div>
    )
}