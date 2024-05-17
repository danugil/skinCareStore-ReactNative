import { ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export default function Loader({style}) {
    return (
        <ActivityIndicator color={colors.purple} size={40} style={{...styles.general, ...style}}/>
    )
}; 

const styles = StyleSheet.create ({
    general: {
        marginTop: 40,
    },
});