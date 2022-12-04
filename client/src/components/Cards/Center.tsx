import { useAppDispatch } from "../../store/hooks"
import { deactivate } from "../../store/InformationSlice"

export default () => {
    const dispatch = useAppDispatch()

    return (
        <div className="center-square" onClick={() => dispatch(deactivate())}>
        </div>
    )

}