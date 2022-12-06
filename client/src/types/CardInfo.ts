export interface cardInfo {
    type: cellType,
    rotation: rotation
    companyInfo?: number,
}

export interface cardCompanyInfo {
    type: cellType,
    rotation: rotation
    companyInfo: number,
}


export interface companyInfo {
    name: string,
    group: number,
    price: number,
    bail: number,
    rent: rentPrice
}


export interface rentPrice {
    start: number,
    house1: number,
    house2: number,
    house3: number,
    house4: number,
    hotel: number

}

export interface group {
    color: string
    priceHouse: number,
    priceHotel: number
}

export enum rotation {
    top = "top",
    right = "right",
    down = "down",
    left = "left",
    corner = "corner"
}

export enum cellType {
    company,
    question,
    train,
    airlines,
    start,
    jail,
    casino,
    money
}