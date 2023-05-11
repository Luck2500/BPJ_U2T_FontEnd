import { message } from "antd";
import { RcFile } from "antd/es/upload";
import { NumericFormat } from "react-number-format";


const padTo2Digits = (num: any) => {
    return num.toString().padStart(2, '0');
};

export const formatDate = (date: any) => {
    return (
        [
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
            date.getFullYear(),
        ].join('/') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
};

export const beforeUploadVdoAntd = (file: RcFile) => {

    const isLt2M = file.size / 1024 / 1024 < 100;
    if (!isLt2M) {
        message.error('วิดิโอต้องมีขนาดเล็กกว่า 100MB!');
    }
    return isLt2M;
};

export const currencyFormat = (price?: number) => {
    return <NumericFormat
        value={price}
        displayType={"text"}
        thousandSeparator=","
        prefix={"฿"}
    />
};

export const Ts = ({ children , className } : any) => <div className={`text-st ${className}`}>{children}</div>

export const convertRole = (roleName: any) => {
    switch (roleName) {
        case "customer":
            return "ลูกค้า";
        case "admin":
            return "ผู้ดูแลระบบ";
        default:
            break;
    };
};



export const beforeUploadAntd = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('สามารถอัปโหลดไฟล์ JPG/PNG เท่านั้น!');
    }
    const isLt2M = file.size / 1024 / 1024 < 100;
    if (!isLt2M) {
      message.error('รูปภาพต้องมีขนาดเล็กกว่า 100MB!');
    }
    return isJpgOrPng && isLt2M;
  };

export const Text = ``;
