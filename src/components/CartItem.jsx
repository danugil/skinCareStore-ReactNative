import { StyleSheet, Image } from "react-native";
import Card from "./styledComponents/Card";
import StyledText from "./styledComponents/StyledText";
import Counter from "./Counter";

const CartItem = ({ item }) => {
  return (
    <Card>
      <StyledText bold>{item.title}</StyledText>
      <StyledText size14>{item.brand}</StyledText>
      <Image style={styles.images} source={{ uri: item.images[0] }} />
      <StyledText bold alignEnd size20>$ {item.price}</StyledText>
      <Counter quantity={item.quantity} id={item.id} />
    </Card>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  images: {
    resizeMode: 'center',
    width: '100%',
    height: 200,
  },
});