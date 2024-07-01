import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Promos = () => {
    return (
        <View style={styles.container}>
            <Text>Promos</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Promos;