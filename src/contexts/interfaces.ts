export interface PaginateResult<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    page?: number | undefined;
    totalPages: number;
    offset: number;
    prevPage?: number | null | undefined;
    nextPage?: number | null | undefined;
    pagingCounter: number;
    meta?: any;
    [customLabel: string]: T[] | number | boolean | null | undefined;
}

export interface IPreacher {
    _id: string;
    name: string;
    congregation: ICongregation
}

export interface ICongregation {
    _id: string;
    username: string;
    password: string;
    territoryServantEmail: string;
    ministryOverseerEmail: string;
    verificationNumber: number;
    verificationExpires: Date;
    verificated: boolean;
    territories: ITerritory[];
    preachers: IPreacher[];
    mainCity: string;
    mainCityLatitude: number;
    mainCityLongitude: number;
}

export interface ITerritory {
    _id: string;
    city: string,
    street: string,
    lastWorked: string,
    number: number,
    beginNumber: number,
    endNumber: number,
    kind: string,
    preacher: IPreacher,
    congregation: ICongregation,
    history: ICheckout[],
    type: string,
    taken: string,
    description: string,
    isPhysicalCard: boolean,
    longitude: number,
    latitude: number,
    location: string,
}

export interface IMinistryGroup {
    _id: string;
    name: string;
    preachers: IPreacher[];
    overseer: IPreacher;
    congregation: ICongregation;
}

export interface ICheckout {
    _id: string;
    date: Date;
    record: ITerritory;
    preacher: IPreacher;
    passedBackDate: Date;
    takenDate: Date
}