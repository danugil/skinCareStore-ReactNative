import { StyleSheet, View } from "react-native"
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapPreview from "../components/MapPreview";
import { googleAPI } from "../firebase/googleAPI";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "../features/auth/authSlice";
import { usePostUserLocationMutation } from "../services/shopService";
import SubmitButton from "../components/styledComponents/SubmitButton";
import StyledText from "../components/styledComponents/StyledText";
import ErrorText from "../components/styledComponents/ErrorText";

const LocationSelector = ({ navigation }) => {
    const [location, setLocation] = useState({ latitude: "", longitude: "", });
    const [error, setError] = useState(null);
    const [address, setAddress] = useState(null);
    const { localId } = useSelector(state => state.authReducer.value)
    const [triggerPostAddress, result] = usePostUserLocationMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setError("El permiso para acceder a la ubicación fue denegado.");
                return;
            }
            try {
                let location = await Location.getCurrentPositionAsync();
                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            } catch (error) {
                console.error("Error al obtener la ubicación:", error);
                setError("Error al obtener la ubicación.");
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                if (location.latitude) {
                    const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleAPI.mapStatic}`;
                    const response = await fetch(url_reverse_geocode);
                    const data = await response.json();
                    setAddress(data.results[0].formatted_address);
                }
            } catch (err) { }
        })();
    }, [location]);

    const onConfirmAddress = () => {
        const locationFormatted = {
            latitude: location.latitude,
            longitude: location.longitude,
            address: address,
        };
        dispatch(setUserLocation(locationFormatted));

        triggerPostAddress({ localId, location: locationFormatted });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <StyledText bold alignCenter style={{ marginBottom: 15 }}>Mis direcciones</StyledText>
            {location.latitude ? (
                <View>
                    <StyledText medium alignCenter style={{ marginBottom: 15 }}>Lat: {location.latitude}, Long: {location.longitude}</StyledText>
                    <MapPreview location={location} />
                    <StyledText bold textAlign style={{ marginTop: 15 }}>{address}</StyledText>
                    <SubmitButton
                        onPress={onConfirmAddress}
                        title={'Confirmar'}
                        buttonStyle={{ marginTop: 30 }}
                    />
                </View>
            ) : (
                <View>
                    <ErrorText>{error}</ErrorText>
                </View>
            )}
        </View>
    )
};

export default LocationSelector;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
});