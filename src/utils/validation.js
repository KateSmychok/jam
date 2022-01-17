import * as Yup from 'yup';

export const PotsSchema = Yup.object().shape({
  pots: Yup.string()
    .max(5, 'Максимальная длина - 5 символов')
    .matches(/^[0-9]+$/, 'Только цифры')
    .required('Поле обязательно должно быть заполнено'),
});

export const JamSchema = Yup.object().shape({
  cherry: Yup.string()
    .max(5, 'Максимальная длина - 5 символов')
    .matches(/^[0-9]+$/, 'Только цифры')
    .required('Поле обязательно должно быть заполнено'),
  apricot: Yup.string()
    .max(5, 'Максимальная длина - 5 символов')
    .matches(/^[0-9]+$/, 'Только цифры')
    .required('Поле обязательно должно быть заполнено'),
  strawberry: Yup.string()
    .max(5, 'Максимальная длина - 5 символов')
    .matches(/^[0-9]+$/, 'Только цифры')
    .required('Поле обязательно должно быть заполнено'),
});
