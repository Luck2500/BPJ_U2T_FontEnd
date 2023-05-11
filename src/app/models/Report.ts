export interface Report {
    totalPrice: number;
    sales:      Sale[];
}

export interface Sale {
    percent:      number;
    price:        number;
    districtId:   number;
    districtName: string;
}


export interface RequestSalesStatistics {
    accountId: any ;
    year: Date | null ;
}

export enum TypeProductStatisticsRequest {
    DateStart = 'DateStart',
    DateEnd = 'DateEnd',
};

export enum TypeSalesStatisticsRequest {
    DateYear = 'DateYear',
};