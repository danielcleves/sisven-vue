import * as yup from 'yup';

const schema = yup.object({
    name: yup.string().required("El nombre es requerido"),
    price: yup.number().required("El precio es requerido"),
    stock: yup.number().required("El stock es requerido"),
    category_id: yup.number().required("La categoría es requerida"),
});

export default schema;