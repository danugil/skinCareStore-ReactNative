import { View, StyleSheet } from "react-native";
import Categories from "../components/Categories";
import { colors } from "../global/colors";


function Home({navigation}) {
    return (
        <View style={styles.container}>
            <Categories navigation={navigation}/>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10, 
        backgroundColor: colors.bg,
    },
});