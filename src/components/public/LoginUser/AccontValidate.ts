import * as Yup from 'yup';
const emailValidation = /^[a-zA-Z0-9_\\.]+@[a-zA-Z]+\.[a-zA-Z0-9\\.]+$/;
export const LoginValidate = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('กรุณากรอกอีเมล').matches(emailValidation, "รูปแบบผู้ใช้งานไม่ถูกต้อง"),
  password: Yup.string().required("กรุณากรอกรหัสผ่าน").min(4, "รหัสผ่านต้องมากกว่า 4 ตัว"),
});