import { StyleSheet, View, Image } from "react-native";
import { colors } from "../global/colors";
import Card from "../components/styledComponents/Card";
import StyledText from "./styledComponents/StyledText";

const OrderItem = ({ order }) => {
    return (
        <Card>
            <View style={styles.containerDate}>
                <StyledText>{order.date}</StyledText>
            </View>
            <View style={styles.container2}>
                <Image style={styles.images} source={{ uri: order.cartItems[0].images[0] }} />
                <StyledText style={{ width: '50%' }} medium>{order.cartItems[0].title}</StyledText>
                <View style={styles.quantity}>
                    <StyledText bold>x {order.cartItems[0].quantity}</StyledText>
                </View>
            </View>
            {order.cartItems.length > 1 ? (
                <StyledText alignCenter italic style={{marginBottom: 15}}>{order.cartItems.length-1} prodcuto/s más en el la compra...</StyledText>
            ) : null
            }
            <StyledText bold size20 alignCenter>Total    $ {order.total}</StyledText>
        </Card>

    );
};

export default OrderItem;

const styles = StyleSheet.create({
    containerDate: {
        backgroundColor: colors.mint,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    quantity: {
        position: 'absolute',
        right: 10,
    },
    images: {
        width: 80,
        height: 80,
        resizeMode: 'center',
    }
});