import { StyleSheet, Text, View } from 'react-native';
import satisfied from "./assets/fonts/Satisfy-Regular.ttf"

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Leaf It To Me</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E7BB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#08BA46',
    fontSize: 50,
    fontFamily: "Satisfy-Regular",
  }
});
