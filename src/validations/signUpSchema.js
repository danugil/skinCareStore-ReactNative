import { object, string, ref } from "yup";

export const signUpSchema = object().shape({
    email: string()
        .required("Es necesario ingresar un correo electrónico.")
        .email("El correo electrónico es inválido. Por favor, vuelve a intentarlo."),
    password: string()
        .required("Es necesario ingresar una contraseña.")
        .min(6, "La contraseña debe tener al menos 6 caracteres."),
    confirmPassword: string()
        .oneOf([ref("password"), null], "Las contraseñas no coinciden. Inténtalo de nuevo.")
});