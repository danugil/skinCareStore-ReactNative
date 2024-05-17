import { useFonts } from "expo-font";
import { StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { colors } from "./src/global/colors";
import { fonts } from "./src/global/fonts";
import MainNavigator from "./src/navigation/MainNavigator.jsx";
import { Provider } from "react-redux";
import store from "./src/store/index.js";
import { init } from "./src/db";

init()
  .then(() => console.log("Base de datos iniciada."))
  .catch((err) => {
    console.log("Error en base de datos.")
    console.log(err)
  })

export default function App() {
  const [fonstLoaded] = useFonts(fonts);

  if (!fonstLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <MainNavigator />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.bg,
  },
});