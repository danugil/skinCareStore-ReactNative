import { View, StyleSheet, Image} from "react-native";
import { colors } from "../global/colors";
import StyledText from "./styledComponents/StyledText";

function HeaderLogin() {

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/logo.png")} style={styles.image}/>
            <StyledText black size28>skinCare Store</StyledText>
        </View>
    );
};

export default HeaderLogin;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bg,
        padding: 10,
    },
    image: {
        alignSelf: 'center',
        width: 100,
        height: 100,
    },
});
