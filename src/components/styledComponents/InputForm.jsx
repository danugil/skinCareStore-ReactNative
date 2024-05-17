import { StyleSheet, View, TextInput } from "react-native";
import { useState } from "react";
import { colors } from "../../global/colors";
import StyledText from "./StyledText";
import ErrorText from "./ErrorText";

const InputForm = ({ label, error, onChange, isSecure, placeholder }) => {
    const [input, setInput] = useState("");

    const onChangeText = (text) => {
        setInput(text);
        onChange(text)
    };

    return (
        <View>
            <StyledText medium style={{marginTop: 25, marginBottom: 8}}>{label}</StyledText>
            <TextInput
                style={styles.input1}
                value={input}
                onChangeText={onChangeText}
                secureTextEntry={isSecure}
                placeholder={placeholder}
            />
            {error ? <ErrorText>{error}</ErrorText>: null}
        </View>
    );
};

export default InputForm

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    input1: {
        borderColor: colors.teal,
        borderWidth: 1,
        borderRadius: 15,
        padding: 12,
        width: "100%",
        backgroundColor: colors.white,
        fontFamily: 'NunitoRegular',
        fontSize: 16,
    },
});