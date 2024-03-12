import * as yup from 'yup';

export const inputSchema = yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .max(50, 'Name must be at most 50 characters'),
  email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),
    address: yup.string()
    .required('Address is required') // В этой строке указано сообщение для вывода ошибки при отсутствии адреса
    .min(2, 'Address must be at least 5 characters')
    .max(300, 'Address must be at most 300 characters'),
  phone: yup.string()
    .matches(/^\+?[0-9]{8,15}$/, 'Invalid phone number') // Проверка на соответствие формату номера телефона
    .required('Phone number is required'),
 
});
