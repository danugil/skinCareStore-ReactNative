import { StyleSheet, View } from "react-native";

const Card = ({ children, style }) => {
    return (
        <View style={{ ...styles.container, ...style }}>
            {children}
        </View>
    );
};

export default Card;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
        padding: 15,
        marginHorizontal: 20,
        marginVertical: 10,
    },
});