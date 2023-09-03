import "@css/information.css"
import { useAppSelector } from "@/store/hooks";
import { companyInfo } from "@/types/CardInfo";
import Companies from "@/resources/information/Companies";
import Groups from "@/resources/information/Groups";


Companies



export default () => {
    const info = useAppSelector(state => state.InformationSlice);
    const company: companyInfo = info.company === 30 ?
        { name: "train", group: 10, price: 200, bail: 100, rent: [50, 100, 150, 200, 250, 300] } : Companies[info.company]
    const color = Groups[company.group].color;

    return (
        <>
            {info.active &&
                <div className="information" style={{ top: "100px", left: "100px" }}>
                    <div>
                        <div className="header" style={{ backgroundColor: color }}>
                            {company.name}
                        </div>
                        <div className="info">
                            rent:
                            {company.rent.map((elem, index) => {
                                console.log(elem);
                                return (
                                    <div key={index + 50} className="row">
                                        {index != 0 && <div className="stars stars-info"><span className={`star level-${index}`} /></div>}
                                        <div className="cost">{elem}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <>
                            {/* {company.rent} */}
                        </>
                    </div>
                </div>
            }
        </>
    )
}