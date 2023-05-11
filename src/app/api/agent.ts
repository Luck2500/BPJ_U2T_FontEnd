import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

//axios.defaults.baseURL = "http://10.103.0.16/cs63/s18/PJEnd/";
axios.defaults.baseURL = "https://localhost:7141/";

const sleep = () => new Promise(resolve => setTimeout(resolve, 100));

const responseBody = (response: AxiosResponse) => response.data; //ให้ส่งข้อมูลออกไป

axios.interceptors.response.use(async response => {
   await sleep();



    return response
}, (error: AxiosError) => {
    const { status } = error.response!;
    const { message } = error!;
    switch (status) {
        case 400:
            toast.error(message);
            break;
        case 401:
            toast.error(message);
            break;
        case 403:
            toast.error(message);
            break;
        case 500:
            toast.error(message);
            break;
        default:
            break;
    }
    return Promise.reject(error.response) //ส่งไปให้ catch(error) นำไปใช้ได้เลย
});

const createFormData = (item: any) => {
    const formData = new FormData();
    for (const key in item) formData.append(key, item[key]);
    return formData;
};

const CategoryProduct = {
    list: () => requests.get('CategoryProduct/GetCategoryProductAll'),
};

const District = {
    listDistrict: () => requests.get('District/GetDistrictAll'),
    listbyIdDistrict: (id:any) => requests.get(`District/GetDistrictByID/${id}`),
};

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const Account = {
    login: (value: any) => requests.post('Account/LoginAccount', value),
    register: (value: any) =>requests.post('Account/RegisterAccount', value),
    // registerV2: (value: any) =>requests.post('Account/RegisterAccount', createFormData(value)),
    getAccountId: (id : any) => requests.get(`Account/GetAccountByID/${id}`),
    update: (value: any,id :any) => requests.put(`Account/UpdateAccount?id=${id}`, createFormData(value)),
    getAccountAll: () => requests.get('Account/GetAccountAll'),
    removeAccount:(id : any) => requests.delete(`Account/DeleteAccount?id=${id}`),
    
};

const Order = {
    create:(value: any) =>requests.post('OrderAccount/AddOrderCustomer', value),
    getOrderAccountId: (idAccount : any) => requests.get(`OrderAccount/GetAll/${idAccount}`),
    update:(value:any) => requests.put("OrderAccount/PaymentOrder", createFormData(value)),
    getconfirm: () => requests.get("OrderAccount/GetConfirmOrder"),
    putconfirm:(value:any) => requests.put("OrderAccount/ConfirmOrder", createFormData(value)),
    getconfirmOrderAccountId: (idAccount : any) => requests.get(`OrderAccount/GetConfirmOrderAcc/${idAccount}`),
};

const Role = {
    roleById: (id:any) => requests.get(`Role/GetRoleByID/${id}`),
};

const Report = {
    getReport: () => requests.get(`Report/GetReport`),
};

const ProductDetailProcess = {
    addProductDetailProcess:(value:any) => requests.post('ProductDetailProcess/AddProductDetailProcess',createFormData(value)),
    getProductDetailProcessByIDProduct:(idProduct : any) => requests.get(`ProductDetailProcess/GetProductDetailProcessByIDProduct/${idProduct}`),
    deleteProductDetailProcess:(idProduct : any)=> requests.delete(`ProductDetailProcess/DeleteProductDetailProcess?idProduct=${idProduct}`),
    updateProductDetailProcess: (value: any) => requests.put("ProductDetailProcess/UpdateProductDetailProcess", createFormData(value)),
};

const Review = {
    addreview:(value:any) => requests.post('Review/AddReview',createFormData(value)),
    getreview:(idProduct : any) => requests.get(`Review/GetReviewByIdProduct?idProduct=${idProduct}`),
};

const Cart = {
    getcartlist:(idAccount : any) => requests.get(`Cart/GetCartAll?idAccount=${idAccount}`),
    addcart:(value:any) => requests.post('Cart/AddCart',value),
    removecart:(id : any) => requests.delete(`Cart/DeleteCart?id=${id}`),
    updatecart:(value:any) => requests.put("Cart/UpdateCart",value)
};

const DetailProductImage = {
    create: (values: any) => {
        const formData = new FormData();
        for (const key in values) formData.append(key, values[key]);
        for (let i = 0; i < values.formFiles.length; i++) formData.append("formFiles", values.formFiles[i]);
        return requests.post("ProductDescription/AddProductDescription", formData)
    },
    get: (idProduct : any) => requests.get(`ProductDescription/GetDetailAll/${idProduct}`),
    removeProductImage:(id : any) => requests.delete(`ProductDescription/DeleteProductDescription?id=${id}`),
}

const Product = {
    updateproduct:(value:any) => requests.put("Product/UpdateProduct",createFormData(value)),
    getproduct: (value:any) =>
        requests.get(`Product/GetProduct?searchName=${value.searchName}&searchCategory=${value.searchCategory}&searchDistrict=${value.searchDistrict}`),
    details: (id : any)=> requests.get(`Product/GetProductByID/${id}`),
    create:(value: any) => requests.post("Product/AddProduct", createFormData(value)),
    removeproduct:(id : any) => requests.delete(`Product/DeleteProduct?id=${id}`),
    getproductNew:() => requests.get('Product/GetProductAllNew'),
};

const agent = {
    Account,
    Product,
    Role,
    Cart,
    CategoryProduct,
    District,
    Review,
    ProductDetailProcess,
    DetailProductImage,
    Order,
    Report
};

export default agent;