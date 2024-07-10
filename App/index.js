// Filename: index.js
// Combined code from all files

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Vibration, ScrollView } from 'react-native';

export default function App() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Haptic feedback for each second
        if (seconds % 5 === 0) {
            // Hard Haptic feedback every 5 seconds
            Vibration.vibrate(1000);
        } else {
            // Rigid Haptic feedback every second
            Vibration.vibrate([0, 500]);
        }
    }, [seconds]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>{seconds} seconds</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 8,
        elevation: 5,
    },
    timerText: {
        fontSize: 48,
        fontWeight: 'bold',
    },
});