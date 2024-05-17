import { FlatList, View } from "react-native";
import { useGetCategoriesQuery } from "../services/shopService";
import CategoryItem from "./CategoryItem";
import Loader from "./styledComponents/Loader";

function Categories({ navigation }) {

    const { data, isLoading } = useGetCategoriesQuery();

    return (
        <View>
            {isLoading ? (
                <Loader style={{ marginTop: 300 }} />
            ) : (
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <CategoryItem navigation={navigation} category={item.title} icon={item.icon} />
                    )}
                    keyExtractor={(item) => item.title}
                />

            )}
        </View>
    );
};

export default Categories;