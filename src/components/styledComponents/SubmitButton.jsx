import { Pressable, StyleSheet } from "react-native";
import { colors } from "../../global/colors";
import { useState } from "react";
import StyledText from "./StyledText";

const SubmitButton = ({ onPress, title, buttonStyle, textStyle }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handlePressIn = () => {
        setIsHovered(true);
    };

    const handlePressOut = () => {
        setIsHovered(false);
    };

    return (
        <Pressable
            onPress={onPress}
            onHoverIn={handlePressIn}
            onHoverOut={handlePressOut}
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed || isHovered ? colors.teal2 : colors.teal },
                buttonStyle
            ]}
        >
            <StyledText white bold style={textStyle}>{title}</StyledText>
        </Pressable>
    );
};

export default SubmitButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        marginHorizontal: 40,
        marginTop: 50,
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