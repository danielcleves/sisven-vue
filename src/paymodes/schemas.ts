import * as yup from 'yup';

const schema = yup.object({
    name: yup.string().required('El nombre es requerido'),
    observation: yup.string().required('La observación es requerida'),
});

export default schema;