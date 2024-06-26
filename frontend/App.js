import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Landing from './components/layout/Landing'; // make sure the path is correct

export default function App() {
  return (
    <View style={styles.container}>
      <Landing />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
