import { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { useDispatch } from "react-redux";
import { addItem } from "../features/shop/cartSlice";
import { useGetProductsByIdQuery } from "../services/shopService";
import { colors } from "../global/colors";
import SubmitButton from "../components/styledComponents/SubmitButton";
import StyledText from "../components/styledComponents/StyledText";
import Loader from "../components/styledComponents/Loader";

const ItemDetail = ({ route }) => {
    const [product, setProduct] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const { id } = route.params;

    const { data: theProduct } = useGetProductsByIdQuery(id);

    const dispatch = useDispatch();

    const onAddCart = () => {
        dispatch(addItem({ ...product, quantity: 1 }))
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 1500);
    };

    useEffect(() => {
        if (theProduct) {
            setProduct(theProduct)
        }
    }, [theProduct]);

    return (
        <View style={styles.container}>
            {product ? (
                <>
                    <Image
                        source={{ uri: product.images[0] }}
                        style={styles.image}
                    />
                    <View style={styles.containerText}>
                        <StyledText size14 style={{ marginBottom: 5 }}>{product.category}</StyledText>
                        <StyledText size20 style={{ marginBottom: 5 }}>{product.title} - {product.brand}</StyledText>
                        <StyledText bold size28 style={{ marginBottom: 5 }}>$ {product.price}</StyledText>
                        <StyledText size16>{product.description}</StyledText>
                    </View>
                    <View style={styles.bottomContainer}>
                        <SubmitButton
                            onPress={onAddCart}
                            title={'Agregar al carrito'}
                            buttonStyle={{ marginHorizontal: 20 }}
                        />
                    </View>
                    {showAlert && (
                        <View style={styles.alert}>
                            <StyledText size16>Producto agregado al carrito</StyledText>
                        </View>
                    )}
                </>
            ) : (
                <Loader style={{ marginTop: 350 }} />
            )}
        </View>
    );
};

export default ItemDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    image: {
        height: 400,
        width: '100%',
        resizeMode: 'center',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 25,
        left: 0,
        right: 0,
    },
    containerText: {
        paddingHorizontal: 20,
    },
    alert: {
        backgroundColor: colors.mint,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 20,
        position: 'absolute',
        top: 20,
        alignSelf: 'center',
    },
});