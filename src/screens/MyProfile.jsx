import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import SubmitButton from "../components/styledComponents/SubmitButton";
import LogoutButton from "../components/styledComponents/LogoutButton";

const MyProfile = ({ navigation }) => {
    const { profileImage, imageCamera } = useSelector((state) => state.authReducer.value);

    return (
        <View style={styles.container}>
            {profileImage || imageCamera ? (
                <Image
                    source={{ uri: profileImage || imageCamera }}
                    style={styles.image}
                />
            ) : (

                <Image
                    source={require("../../assets/defaultProfile.jpg")}
                    style={styles.image}
                />
            )}
            <SubmitButton
                onPress={() => navigation.navigate("ImageSelector")}
                title={'Agregar foto de perfil'}
                buttonStyle={{ marginTop: 30 }}
            />
            <SubmitButton
                onPress={() => navigation.navigate("LocationSelector")}
                title={'Mis direcciones'}
                buttonStyle={{ marginTop: 30 }}
            />
            <LogoutButton />
        </View>
    );
};

export default MyProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    image: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 200,
    },
});