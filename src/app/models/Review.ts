export interface Review {
    id:        string;
    created:   Date;
    text:      string;
    accountID: number;
    productID: number;
    account:   Account;
    product:   null;
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