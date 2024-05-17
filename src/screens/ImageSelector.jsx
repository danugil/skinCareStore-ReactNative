import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { setCameraImage } from "../features/auth/authSlice";
import { usePostProfileImageMutation } from "../services/shopService";
import { colors } from "../global/colors";
import SubmitButton from "../components/styledComponents/SubmitButton";
import StyledText from "../components/styledComponents/StyledText";
import ErrorText from "../components/styledComponents/ErrorText";

const ImageSelector = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const { localId } = useSelector((state) => state.authReducer.value);
    const [triggerSaveProfileImage, result] = usePostProfileImageMutation();
    const dispatch = useDispatch();

    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (!granted) {
            setError("El permiso para acceder a la camara fue denegado.");
            return false;
        }
        return true;
    };

    const pickImage = async () => {
        const isCameraOk = await verifyCameraPermissions();
        if (isCameraOk) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [3, 4],
                base64: true,
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        }
    };

    const confirmImage = () => {
        dispatch(setCameraImage(image));
        triggerSaveProfileImage({ localId, image });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {image ? (
                <>
                    <Image source={{ uri: image }} style={styles.image} />
                    <SubmitButton
                        onPress={pickImage}
                        title={'Sacar otra foto'}
                        buttonStyle={{ marginTop: 30 }}
                    />
                    <SubmitButton
                        onPress={confirmImage}
                        title={'Confirmar foto'}
                        buttonStyle={{ marginTop: 30 }}
                    />
                </>
            ) : (
                <>
                    <View style={styles.noPhotoContainer}>
                        <StyledText boldItalic textAlign>No hay foto para mostrar</StyledText>
                    </View>
                    <SubmitButton
                        onPress={pickImage}
                        title={'Sacar foto'}
                        buttonStyle={{marginBottom: 15}}
                    />
                </>
            )}
            {error && (
                <View>
                    <ErrorText>{error}</ErrorText>
                </View>
            )}
        </View>
    );
};

export default ImageSelector;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    image: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 200,
        paddingBottom: 20,
    },
    noPhotoContainer: {
        width: 200,
        height: 200,
        borderWidth: 2,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
    },
});