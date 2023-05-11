export interface ProductDetailProcess {
    msg:  string;
    data: DataProductDetailProcess[];
}

export interface DataProductDetailProcess{
    id:                   string;
    nameRawMaterial:      string;
    makeProductsprocess:  string;
    createdProductDetail: Date;
    videoProduct:         string;
    productID:            number;
    product:              Product;
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
    categoryProduct:   null;
}