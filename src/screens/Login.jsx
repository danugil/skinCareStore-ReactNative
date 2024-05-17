import { Pressable, StyleSheet, View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../services/authService";
import { loginSchema } from "../validations/loginSchema";
import { setUser } from "../features/auth/authSlice";
import { insertSession } from "../db";
import InputForm from "../components/styledComponents/InputForm";
import SubmitButton from "../components/styledComponents/SubmitButton";
import StyledText from "../components/styledComponents/StyledText";
import Loader from "../components/styledComponents/Loader";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [triggerSignin, result] = useLoginMutation();

    const dispatch = useDispatch();

    const onSubmit = () => {
        try {
            setErrorMail("");
            setErrorPassword("");

            loginSchema.validateSync({ password, email })
            triggerSignin({ email, password });
        } catch (error) {
            console.log("path", error.path);
            switch (error.path) {
                case "email":
                    setErrorMail(error.message);
                    break;
                case "password":
                    setErrorPassword(error.message);
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        if (result.data) {
            dispatch(setUser(result.data));
            insertSession({
                email: result.data.email,
                localId: result.data.localId,
                token: result.data.idToken
            })
                .then((result) => console.log(result))
                .catch(err => console.log(err.message))
        }
    }, [result]);

    return (
        <ScrollView style={styles.container}>
            <StyledText bold alignCenter>Ingrese en una cuenta</StyledText>
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
            {
                result.isLoading ? (
                    <Loader />
                ) : (
                    <SubmitButton title={"Ingresar"} onPress={onSubmit} textStyle={{ fontSize: 22 }} />
                )
            }
            <View style={styles.container2}>
                <StyledText>¿No tienes una cuenta?</StyledText>
                <Pressable onPress={() => navigation.navigate("SignUp")}>
                    <StyledText bold alignCenter style={{ textDecorationLine: 'underline' }}>Crea una aquí</StyledText>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default Login;

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