import { Pressable, StyleSheet, View } from "react-native";
import { increment, decrement, removeItem } from "../features/shop/cartSlice";
import { useDispatch } from "react-redux";
import { colors } from "../global/colors";
import { AntDesign } from '@expo/vector-icons';
import StyledText from "./styledComponents/StyledText";

const Counter = ({ quantity, id }) => {
    const dispatch = useDispatch();

    const handleDecrement = () => {
        if (quantity === 1) {
            dispatch(removeItem(id));
        } else {
            dispatch(decrement(id));
        }
    };

    const handleIncrement = () => {
        dispatch(increment(id));
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.buttonContainer}
                onPress={handleDecrement}>
                {quantity === 1 ? (
                    <AntDesign name="delete" size={24} color={colors.white} />
                ) : (
                    <StyledText white size22>-</StyledText>
                )}
            </Pressable>
            <StyledText bold style={{paddingHorizontal: 10}}>{quantity}</StyledText>
            <Pressable style={styles.buttonContainer} onPress={handleIncrement}>
                <StyledText white size22>+</StyledText>
            </Pressable>
        </View>
    )
};

export default Counter;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonContainer: {
        backgroundColor: colors.purple,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 50,
    },
});