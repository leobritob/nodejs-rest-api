const yup = require('yup');
const { yupValidator } = require('../../helpers/validator');

const createUserSchema = yup.object().shape({
  first_name: yup.string().required('Informe seu nome'),
  last_name: yup.string().required('Informe seu sobrenome'),
  email: yup.string().email('Informe um e-mail válido').required('Informe seu e-mail'),
  password: yup.string().required('Informe sua senha'),
});

const createUserValidator = yupValidator(createUserSchema);

const updateUserSchema = yup.object().shape({
  first_name: yup.string().required('Informe seu nome'),
  last_name: yup.string().required('Informe seu sobrenome'),
});

const updateUserValidator = yupValidator(updateUserSchema);

module.exports = { createUserValidator, updateUserValidator };
