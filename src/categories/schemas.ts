import * as yup from 'yup';

const schema = yup.object({
    name: yup.string().required('Name is required'),
    description: yup.string().nullable(),
});

export default schema;