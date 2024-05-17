import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderLogin from "../components/HeaderLogin";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ header: () => <HeaderLogin /> }}
    >
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;