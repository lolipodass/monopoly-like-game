import { cardInfo, cellType, rotation } from "@/types/CardInfo";

const Cards: cardInfo[] =
    [
        { type: cellType.start, rotation: rotation.corner },
        { type: cellType.company, rotation: rotation.down, companyInfo: 0 },
        { type: cellType.question, rotation: rotation.down },
        { type: cellType.company, rotation: rotation.down, companyInfo: 1 },
        { type: cellType.money, rotation: rotation.down },
        { type: cellType.train, rotation: rotation.down },
        { type: cellType.company, rotation: rotation.down, companyInfo: 2 },
        { type: cellType.question, rotation: rotation.down },
        { type: cellType.company, rotation: rotation.down, companyInfo: 3 },
        { type: cellType.company, rotation: rotation.down, companyInfo: 4 },
        { type: cellType.jail, rotation: rotation.corner },

        { type: cellType.company, rotation: rotation.left, companyInfo: 5 },
        { type: cellType.airlines, rotation: rotation.left },
        { type: cellType.company, rotation: rotation.left, companyInfo: 6 },
        { type: cellType.company, rotation: rotation.left, companyInfo: 7 },
        { type: cellType.train, rotation: rotation.left },
        { type: cellType.company, rotation: rotation.left, companyInfo: 8 },
        { type: cellType.question, rotation: rotation.left },
        { type: cellType.company, rotation: rotation.left, companyInfo: 9 },
        { type: cellType.company, rotation: rotation.left, companyInfo: 10 },
        { type: cellType.casino, rotation: rotation.corner },

        { type: cellType.company, rotation: rotation.top, companyInfo: 11 },
        { type: cellType.question, rotation: rotation.top },
        { type: cellType.company, rotation: rotation.top, companyInfo: 12 },
        { type: cellType.company, rotation: rotation.top, companyInfo: 13 },
        { type: cellType.train, rotation: rotation.top },
        { type: cellType.company, rotation: rotation.top, companyInfo: 14 },
        { type: cellType.company, rotation: rotation.top, companyInfo: 15 },
        { type: cellType.airlines, rotation: rotation.top },
        { type: cellType.company, rotation: rotation.top, companyInfo: 16 },
        { type: cellType.jail, rotation: rotation.corner },

        { type: cellType.company, rotation: rotation.right, companyInfo: 17 },
        { type: cellType.company, rotation: rotation.right, companyInfo: 18 },
        { type: cellType.question, rotation: rotation.right },
        { type: cellType.company, rotation: rotation.right, companyInfo: 19 },
        { type: cellType.train, rotation: rotation.right },
        { type: cellType.money, rotation: rotation.right },
        { type: cellType.company, rotation: rotation.right, companyInfo: 20 },
        { type: cellType.question, rotation: rotation.right },
        { type: cellType.company, rotation: rotation.right, companyInfo: 21 },
    ]
export default Cards;