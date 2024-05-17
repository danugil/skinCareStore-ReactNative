import { useEffect } from "react";
import { useGetProfileImageQuery, useGetUserLocationQuery } from "../services/shopService";
import AuthStack from "./AuthStack";
import TabNavigator from "./TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { setProfileImage, setUserLocation } from "../features/auth/authSlice";
import { fetchSession } from "../db";

const MainNavigator = () => {
    const { user, localId } = useSelector(state => state.authReducer.value);
    const { data, error, isLoading } = useGetProfileImageQuery(localId);
    const { data: location } = useGetUserLocationQuery(localId);

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const session = await fetchSession();
                console.log("a");
                console.log("local", session.rows._array);
                if (session?.rows.length) {
                    const user = session.rows._array[0];
                    dispatch(setUser(user));
                }
            } catch (error) {
                console.log(error.message);
            }
        })()
    }, [])

    useEffect(() => {
        if (data) {
            console.log(data.image);
            dispatch(setProfileImage(data.image))
        }
        if (location) {
            dispatch(setUserLocation(location))
        }
    }, [data, location])

    return (
        <NavigationContainer>
            {user ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default MainNavigator;