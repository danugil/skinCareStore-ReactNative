import { Pressable, StyleSheet, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signUpSchema } from "../validations/signUpSchema";
import { useSignUpMutation } from "../services/authService";
import { setUser } from "../features/auth/authSlice";
import InputForm from "../components/styledComponents/InputForm";
import SubmitButton from "../components/styledComponents/SubmitButton";
import StyledText from "../components/styledComponents/StyledText";
import Loader from "../components/styledComponents/Loader";

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [triggerSignup, result] = useSignUpMutation();

    const dispatch = useDispatch();

    const onSubmit = () => {
        try {
            setErrorMail("");
            setErrorPassword("");
            setErrorConfirmPassword("");

            signUpSchema.validateSync({ password, confirmPassword, email });
            triggerSignup({ email, password });
        } catch (error) {
            console.log("path", error.path);
            switch (error.path) {
                case "email":
                    setErrorMail(error.message);
                    break;
                case "password":
                    setErrorPassword(error.message);
                    break;
                case "confirmPassword":
                    setErrorConfirmPassword(error.message);
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        if (result.data) {
            dispatch(setUser(result.data));
        }
    }, [result]);

    return (
        <ScrollView style={styles.container}>
            <StyledText bold alignCenter>Crea una cuenta</StyledText>
            <InputForm
                label={'Correo electrónico'}
                error={errorMail}
                onChange={setEmail}
                placeholder={'Ingrese un correo electrónico'}
            />
            <InputForm
                label={'Contraseña'}
                error={errorPassword}
                onChange={setPassword}
                isSecure={true}
                placeholder={'Ingrese una contraseña'}
            />
            <InputForm
                label={'Repetir contraseña'}
                error={errorConfirmPassword}
                onChange={setConfirmPassword}
                isSecure={true}
                placeholder={'Repita la contraseña'}
            />
            {
                result.isLoading ? (
                    <Loader />
                ) : (
                    <SubmitButton title={"Registrate"} onPress={onSubmit} textStyle={{ fontSize: 22 }} />
                )
            }
            <View style={styles.container2}>
                <StyledText>¿Ya tienes una cuenta?</StyledText>
                <Pressable onPress={() => navigation.navigate("Login")} >
                    <StyledText bold alignCenter style={{ textDecorationLine: 'underline' }}>Ingresa aquí</StyledText>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
    },
    container2: {
        paddingTop: 50,
        flexDirection: 'column',
        alignSelf: 'center',
    },
});