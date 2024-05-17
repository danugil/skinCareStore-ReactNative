import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View, Image } from "react-native";
import { colors } from "../global/colors";
import cancel1 from "../../assets/cancelar.png";

const Search = ({ onSearch }) => {
    const [input, setInput] = useState("");

    const onChange = (e) => {
        setInput(e);
        onSearch(e);
    };

    const removeInput = () => {
        setInput("");
        onSearch("");
    };

    return (
        <View>
            <View style={styles.continer}>
                <TextInput
                    onChangeText={(e) => onChange(e)}
                    value={input}
                    style={styles.input1}
                    placeholder="Buscar producto"
                />
                <Pressable style={styles.iconsContainer} onPress={removeInput}>
                    <Image style={styles.icons} source={cancel1} />
                </Pressable>
            </View>
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    continer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    input1: {
        borderRadius: 15,
        borderColor: colors.teal,
        borderWidth: 1,
        padding: 12,
        width: "85%",
        backgroundColor: colors.white,
        fontSize: 16,
        fontFamily: 'NunitoRegular',
    },
    icons: {
        width: 26,
        height: 26,
    },
    iconsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.teal,
        borderRadius: 12,
        height: 50,
        width: '13%',
    },
});