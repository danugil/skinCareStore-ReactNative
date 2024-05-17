import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../global/colors";
import StyledText from "./styledComponents/StyledText";

function Header({ title }) {

    return (
        <View style={styles.container}>
            <StyledText black white size28>{title}</StyledText>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.blue,
        padding: 10,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
    },
});
