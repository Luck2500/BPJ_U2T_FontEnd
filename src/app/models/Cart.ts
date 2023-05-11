export interface Cart {
    id:            string;
    product:       Product;
    amountProduct: number;
    imageProduct:  string;
}

export interface Product {
    id:                number;
    name:              string;
    price:             number;
    stock:             number;
    detailsinfo:       string;
    image:             string;
    districtID:        number;
    district:          null;
    categoryProductID: number;
    categoryProduct:   CategoryProduct;
}

export interface CategoryProduct {
    id:   number;
    name: string;
}

export interface District {
    id:   number;
    name: string;
}