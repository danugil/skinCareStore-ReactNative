import { object, string } from "yup";

export const loginSchema = object().shape({
    email: string()
        .required("Es necesario ingresar un correo electrónico.")
        .email("El correo electrónico es inválido. Por favor, vuelve a intentarlo."),
    password: string()
        .required("Es necesario ingresar una contraseña."),
});