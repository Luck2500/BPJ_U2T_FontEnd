export interface Order {
    id:             string;
    paymentStatus:  Paymentstatus;
    proofOfPayment: string;
    created:        Date;
    priceTotal:     number;
    deliveryFee:    number;
    accountStatus:  boolean;
    accountID:      number;
    account:        Account;
    orderItems:     OrderItem[];
}

export interface Account {
    id:          number;
    name:        string;
    email:       string;
    password:    string;
    phoneNumber: string;
    address:     string;
    image:       string;
    roleID:      number;
    role:        null;
}

export interface OrderItem {
    id:             string;
    orderAccountID: string;
    productID:      number;
    productPrice:   number;
    productAmount:  number;
}


export interface OrderRequest {
    accountId: number;
    items:     ItemRequest[];
}

export interface ItemRequest {
    id:            string;
    productID:     number;
    productPrice:  number;
    productAmount: number;
}

export enum Paymentstatus
{
    WaitingForPayment, // กำลังรอการชำระเงิน
    PendingApproval, // รอการอนุมัติ
    SuccessfulPayment // ชำระเงินสำเร็จ
}

export interface ConfirmOrder {
    id:             string;
    paymentStatus:  number;
    proofOfPayment: string;
    created:        Date;
    priceTotal:     number;
    accountStatus:  boolean;
    accountID:      number;
}