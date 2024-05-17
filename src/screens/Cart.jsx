import { StyleSheet, View, FlatList, Image } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePostOrderMutation } from "../services/shopService";
import { emptyCart } from "../features/shop/cartSlice";
import { randomUUID } from "expo-crypto";
import Loader from "../components/styledComponents/Loader";
import SubmitButton from "../components/styledComponents/SubmitButton";
import CartItem from "../components/CartItem";
import StyledText from "../components/styledComponents/StyledText";
import ConfirmedCart from "../components/ConfirmedCart";

const Cart = () => {
    const cartItems = useSelector((state) => state.cartReducer.value.items);
    const total = useSelector((state) => state.cartReducer.value.total);
    const user = useSelector((state) => state.authReducer.value);
    const [confirmedVisible, setConfirmedVisible] = useState(false);
    const [triggerPost, result] = usePostOrderMutation();
    const dispatch = useDispatch();

    const confirmCart = async () => {
        await triggerPost({ id: randomUUID(), total, cartItems, user, date: new Date().toLocaleDateString() });
        dispatch(emptyCart());
        setConfirmedVisible(true);
    };

    return (
        <View>
            <ConfirmedCart confirmedVisible={confirmedVisible} setConfirmedVisible={setConfirmedVisible}/>
            {cartItems.length > 0 ? (
                <View style={styles.container}>
                    <FlatList
                        data={cartItems}
                        renderItem={({ item }) => <CartItem item={item} />}
                        keyExtraxtor={(cartItem) => cartItem.id}
                    />
                    <View style={styles.total}>
                        <StyledText bold size20 alignStart>Total</StyledText>
                        <StyledText bold size20 alignEnd>$ {total.toFixed(2)}</StyledText>
                    </View>
                    { result.isLoading ? (
                        <Loader style={{marginBottom: 45, marginTop: 0}}/>
                    ) : (
                    <SubmitButton
                        onPress={confirmCart}
                        title={'Confirmar compra'}
                        buttonStyle={{ marginHorizontal: 20, marginTop: 15, marginBottom: 45 }}
                    />
                    )}
                </View>
            ) : (
                <View style={styles.container2}>
                    <StyledText mediumItalic size22 alignCenter textAlign>No hay productos agregados al carrito.</StyledText>
                    <Image style={styles.image} source={require("../../assets/shopping-cart.png")} />
                    <StyledText bold size22 alignCenter textAlign>Agrega productos para poder visualizarlos aquí.</StyledText>
                </View>
            )}
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        height: '100%'
    },
    container2: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '100%',
        padding: 20,
    },
    total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 5,
    },
    image: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        opacity: 0.65,
    },
});