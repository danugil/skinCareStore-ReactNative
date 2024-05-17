import { Pressable, Text, View, StyleSheet, Modal, Image } from "react-native";
import StyledText from "./styledComponents/StyledText";
import { colors } from "../global/colors";

const ConfirmedCart = ({
    confirmedVisible,
    setConfirmedVisible,
}) => {

    return (
        <Modal transparent={true} animationType='fade' visible={confirmedVisible}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <StyledText bold size22>¡Listo!</StyledText>
                    <Image style={styles.image} source={require("../../assets/confirmed.png")}/>
                    <StyledText italic>Su compra se realizó con éxito.</StyledText>
                    <Pressable style={styles.buttonContainer} onPress={() => setConfirmedVisible(false)}>
                        <StyledText white bold>Cerrar</StyledText>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmedCart;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        height: 500,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        opacity: 0.80,
    },
    buttonContainer: {
        backgroundColor: colors.purple,
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
})