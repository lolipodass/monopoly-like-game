import { useAppDispatch } from "@/store/hooks"
import { activate } from "@/store/InformationSlice"
import { cardCompanyInfo } from "@/types/CardInfo"



export default ({ information }: { information: cardCompanyInfo }) => {

    const dispatch = useAppDispatch()
    return (
        <div className={`card ${information.rotation}`} onClick={(e) => {
            dispatch(activate(information.companyInfo))
        }}>
            <div className="price">
                {information.companyInfo}
            </div>
            <div className="picture">

            </div>
            <div className="stars">

            </div>
        </div>
    )
}