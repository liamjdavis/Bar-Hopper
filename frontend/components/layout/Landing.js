// Landing.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Landing = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Landing Page!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Landing;
