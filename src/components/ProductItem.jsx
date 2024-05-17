import { StyleSheet, Image, Pressable } from "react-native";
import Card from "./styledComponents/Card";
import StyledText from "./styledComponents/StyledText";

const ProductItem = ({ product, navigation }) => {
    return (
        <>
            <Pressable onPress={() => navigation.navigate("ItemDetail", { id: product.id })}>
                <Card>
                    <StyledText bold>{product.title}</StyledText>
                    <StyledText size14>{product.brand}</StyledText>
                    <Image style={styles.images} source={{ uri: product.images[0] }} />
                    <StyledText bold alignEnd size20>$ {product.price}</StyledText>
                </Card>
            </Pressable>
        </>
    );
};

export default ProductItem;

const styles = StyleSheet.create({
    images: {
        resizeMode: 'center',
        width: '100%',
        height: 250,
    },
});