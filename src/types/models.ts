export interface Customer {
    id?: string;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    phone: number;
    email: string;
    haveFiscal: boolean;
    fiscalName: string;
    fiscalAddress: string;
    fiscalRFC: string;
    fiscalPhone: number;
    license: string;
    issuanceLicense: string;
    licenseExpiration: string;
}


/**
 * Interface of Role object in Backend Strapi
 */
export interface Role {
    type: string;
    description: string;
    name: string;
    _id: string;
}

/**
 * Interface of User object in Backend Strapi
 */
export interface User {
    _id: string;
    blocked: boolean;
    confirmed: boolean;
    email: string;
    provider: string;
    username: string;
    role: Role;
}

export interface Car {
    id?: string;
    code: string;
    brand: string;
    model: string;
    color: string;
    year: number;
    licensePlate: string;
    price: number;
    active: boolean;
}

export interface Fix {
    id?: string;
    description: string;
    provider: string;
    licensePlate: string;
    amount: number;
    km: number;
    date: string;
    car: Car | { id: ''};
}

export enum PayTypes {
    CASH = 'CASH',
    CARD = 'CARD',
    PENDING = 'PENDING'
}

export enum Serie {
    C = 'C',
    D = 'D'
}

export enum CardTypes {
    MASTERCARD = 'MASTERCARD',
    VISA = 'VISA',
}

export interface Sale {
    id?: string;
    contractNumber: number;
    car: Car | string;
    customer: Customer | string;
    user: User | string;
    exitDate: string;
    entryDate: string;
    priceForDay: number;
    notes: string;
    entryKilometers: number;
    exitKilometers: number;
    kilometersTraveled: number;
    finished: boolean;
    extraHour: number;
    dayPrice: number;
    haveAccidentInsurance: boolean;
    haveCollisionInsurance: boolean;
    haveDriver: boolean;
    driverName:  string;
    driverLicense: string;
    expirationLicenseDriverDate: string;
    issuanceLicenseDriveDate: string;
    deposit: number;
    moneyAdvance: number;
    haveIVA: boolean;
    eighthsGasEntry: number;
    eighthsGasExit: number;
    refunds: number;
    totalIVA: number;
    totalExtraHour: number;
    totalDays: number;
    totalInsurance: number;
    totalDriver: number;
    total: number;
    damage: number;
    days: number;
    typeCard: CardTypes;
    payment: PayTypes;
    serie: Serie;
}

export interface Reservation {
    id: string;
    car: Car | { id: string};
    customer: Customer | { id: string };
    date: string;
    hotel: string;
    roomNumber: string;
    advancePayment: number;
    notes: string
}