import { Pressable, StyleSheet } from "react-native";
import { colors } from "../../global/colors";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { deleteSession } from "../../db";
import { MaterialIcons } from "@expo/vector-icons";
import StyledText from "./StyledText";

const LogoutButton = ({ buttonStyle }) => {
    const [isHovered, setIsHovered] = useState(false);

    const { localId } = useSelector((state) => state.authReducer.value);

    const dispatch = useDispatch();

    const onLogout = async () => {
        dispatch(logout());
        const deletedSession = await deleteSession({ localId });
    };

    const handlePressIn = () => {
        setIsHovered(true);
    };

    const handlePressOut = () => {
        setIsHovered(false);
    };

    return (
        <Pressable
            onPress={onLogout}
            onHoverIn={handlePressIn}
            onHoverOut={handlePressOut}
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed || isHovered ? colors.purple2 : colors.purple },
                buttonStyle
            ]}
        >
            <StyledText white bold>Cerrar sesión</StyledText>
            <MaterialIcons name="logout" size={24} color="white" style={styles.logoutIcon} />
        </Pressable>
    );
};

export default LogoutButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        position: 'absolute',
        bottom: 25,
        marginHorizontal: 20,
        right: 0,
        left: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
    },
    logoutIcon: {
        position: 'absolute',
        right: 20,
    },
});