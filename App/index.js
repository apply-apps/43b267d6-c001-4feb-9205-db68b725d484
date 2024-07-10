// Filename: index.js
// Combined code from all files

import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Vibration, ScrollView } from 'react-native';

export default function App() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    useEffect(() => {
        if (isRunning) {
            if (seconds % 5 === 0) {
                // Hard Haptic feedback every 5 seconds
                Vibration.vibrate(1000);
            } else {
                // Rigid Haptic feedback every second
                Vibration.vibrate([0, 500]);
            }
        }
    }, [seconds, isRunning]);

    const startStopTimer = () => {
        if (isRunning) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setSeconds(0);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>{seconds} seconds</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title={isRunning ? "Stop" : "Start"} onPress={startStopTimer} />
                    <Button title="Reset" onPress={resetTimer} />
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
        marginBottom: 20,
    },
    timerText: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
    }
});