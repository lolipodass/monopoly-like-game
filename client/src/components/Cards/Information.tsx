import { useAppSelector } from "../../store/hooks"
import { companyInfo } from "../../types/CardInfo";
import "./../../resources/css/information.css"


interface train {
    name: string,
    price: number,
    bail: number,
    rent: number
}

export default () => {
    const info = useAppSelector(state => state.InformationSlice);
    const company: companyInfo | train = info.company === 30 ? { name: "train", group: 10, price: 200, bail: 100, rent: 50 } : companyInfo[info.company]
    return (
        <>
            {info.active &&
                <div className="information" style={{ bottom: "100", left: "25px" }}>
                    <div>
                        {company.name} <br />
                        {company.price} <br />
                        <>
                            {/* {company.rent} */}
                        </>
                    </div>
                </div>
            }
        </>
    )
}