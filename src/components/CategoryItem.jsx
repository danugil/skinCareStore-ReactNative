import { Pressable, StyleSheet, Image } from "react-native";
import { useDispatch } from "react-redux";
import { setCategorySelected } from "../features/shop/shopSlice";
import Card from "./styledComponents/Card";
import StyledText from "./styledComponents/StyledText";

const CategoryItem = ({ category, navigation, icon }) => {
    const dispatch = useDispatch()

    return (
        <Card>
            <Pressable
                onPress={() => {
                    dispatch(setCategorySelected(category))
                    navigation.navigate("ItemListCategories", { category })
                }}
                style={styles.container}
            >
                <Image
                    source={{ uri: icon }}
                    style={styles.image} />
                <StyledText size20>{category}</StyledText>
            </Pressable>
        </Card>
    );
};

export default CategoryItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    image: {
        width: 24,
        height: 24,
    },
});