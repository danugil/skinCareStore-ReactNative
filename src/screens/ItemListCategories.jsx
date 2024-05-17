import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useGetProductsByCategoryQuery } from "../services/shopService";
import { colors } from "../global/colors";
import Search from "../components/Search";
import ProductItem from "../components/ProductItem";
import Loader from "../components/styledComponents/Loader";

function ItemListCategories({ navigation }) {
    const [productsFiltered, setProductsFiltered] = useState([]);

    const category = useSelector(
        (state) => state.shopReducer.value.categorySelected
    );

    const { data: productsFilteredByCategory, isLoading, error } = useGetProductsByCategoryQuery(category);

    const search = (searchWord) => {
        let filteredProducts = Object.values(productsFilteredByCategory);
        if (searchWord && searchWord != "") {
            filteredProducts = filteredProducts.filter(p => p.title.toLowerCase().includes(searchWord.toLowerCase()))
        }
        setProductsFiltered(filteredProducts);
    };

    useEffect(() => {
        if (productsFilteredByCategory) {
            setProductsFiltered(productsFilteredByCategory)
        }
    }, [productsFilteredByCategory])

    return (
        <View style={styles.container}>
            <Search onSearch={(e) => search(e)} />
            {isLoading ? (
                <Loader style={{ marginTop: 250 }} />
            ) : (
                <FlatList
                    data={Object.values(productsFiltered)}
                    renderItem={({ item }) => <ProductItem product={item} navigation={navigation} />}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

export default ItemListCategories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        backgroundColor: colors.bg,
    },
});