import * as yup from 'yup';

const schema = yup.object({
    document_number: yup.string().required('El número de documento es requerido'),
    first_name: yup.string().required('El primer nombre es requerido'),
    last_name: yup.string().required('El apellido es requerido'),
    addres: yup.string().required('La dirección es requerida'),
    birthday: yup.date().required('La fecha de nacimiento es requerida'),
    phone_number: yup.string().required('El número de teléfono es requerido'),
    email: yup.string().email('Ingrese un email válido').required('El email es requerido')
});

export default schema;