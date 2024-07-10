// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Button, Image, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const filters = ['vintage', 'sepia', 'grayscale', 'invert', 'contrast'];

const FilterComponent = ({ photoUri, setFilteredPhoto }) => {
    const applyFilter = async (filter) => {
        let manipResult;
        switch (filter) {
            case 'vintage':
                manipResult = await manipulateAsync(
                    photoUri,
                    [{ resize: { width: 500 } }, { applyFilter: { name: 'Vintage' } }],
                    { format: SaveFormat.JPEG }
                );
                break;
            case 'sepia':
                manipResult = await manipulateAsync(
                    photoUri,
                    [{ resize: { width: 500 } }, { applyFilter: { name: 'Sepia' } }],
                    { format: SaveFormat.JPEG }
                );
                break;
            case 'grayscale':
                manipResult = await manipulateAsync(
                    photoUri,
                    [{ resize: { width: 500 } }, { applyFilter: { name: 'Grayscale' } }],
                    { format: SaveFormat.JPEG }
                );
                break;
            case 'invert':
                manipResult = await manipulateAsync(
                    photoUri,
                    [{ resize: { width: 500 } }, { applyFilter: { name: 'Invert' } }],
                    { format: SaveFormat.JPEG }
                );
                break;
            case 'contrast':
                manipResult = await manipulateAsync(
                    photoUri,
                    [{ resize: { width: 500 } }, { changeContrast: { contrast: 2.0 } }],
                    { format: SaveFormat.JPEG }
                );
                break;
            default:
                manipResult = await manipulateAsync(
                    photoUri,
                    [{ resize: { width: 500 } }],
                    { format: SaveFormat.JPEG }
                );
        }
        setFilteredPhoto(manipResult.uri);
    };

    return (
        <View style={styles.filterContainer}>
            {filters.map(filter => (
                <Button key={filter} title={filter} onPress={() => applyFilter(filter)} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    photoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: {
        width: '100%',
        height: '80%',
        marginBottom: 20,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
});

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [filteredPhoto, setFilteredPhoto] = useState(null);

    const requestPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
        setHasPermission(status === 'granted' && mediaLibraryStatus.status === 'granted');
    };

    useState(() => {
        requestPermissions();
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            const { uri } = await cameraRef.takePictureAsync();
            setPhoto(uri);
        }
    };

    const savePhoto = async () => {
        if (filteredPhoto) {
            const asset = await MediaLibrary.createAssetAsync(filteredPhoto);
            alert('Photo saved to gallery!');
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for permissions...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            {photo ? (
                <View style={styles.photoContainer}>
                    <Image source={{ uri: filteredPhoto || photo }} style={styles.photo} />
                    <FilterComponent photoUri={photo} setFilteredPhoto={setFilteredPhoto} />
                    <Button title="Save" onPress={savePhoto} />
                    <Button title="Retake" onPress={() => setPhoto(null)} />
                </View>
            ) : (
                <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={setCameraRef}>
                    <View style={styles.buttonContainer}>
                        <Button title="Shoot" onPress={takePicture} />
                    </View>
                </Camera>
            )}
        </SafeAreaView>
    );
}