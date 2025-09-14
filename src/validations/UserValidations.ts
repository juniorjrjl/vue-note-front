import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    name: yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be at most 100 characters'),
    email: yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup.string()
        .min(5, 'Password must be at least 5 characters')
        .required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
});

export type RegisterForm = yup.InferType<typeof registerSchema>;

export const loginSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup.string()
        .min(5, 'Password must be at least 5 characters')
        .required('Password is required'),
});

export type LoginForm = yup.InferType<typeof loginSchema>;

export const editSchema = yup.object().shape({
    name: yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be at most 100 characters'),
    email: yup.string()
        .email('Invalid email format')
        .required('Email is required'),
})

export type EditForm = yup.InferType<typeof editSchema>;