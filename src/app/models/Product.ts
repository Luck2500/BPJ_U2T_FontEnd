export interface Product {
    id:                number;
    name:              string;
    price:             number;
    stock:             number;
    detailsinfo:       string;
    image:             string;
    categoryName:      string;
    categoryProductID: number;
    districtName:      string;
    districtID:        number;
}

// export interface Product {
//     data : ProductData[];
// }

// export interface ProductData {
//     id:                number;
//     name:              string;
//     price:             number;
//     stock:             number;
//     detailsinfo:       string;
//     image:             string;
//     categoryName:      string;
//     categoryProductID: number;
//     districtName:      string;
//     districtID:        number;
// }

export interface ProductParams {
    pageNumber: number;
    pageSize: number;
    searchDistrict :string;
    searchCategory :any;
    searchName: any;
}