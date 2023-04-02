import { View, StyleSheet, ActivityIndicator } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="green"></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: "#F2E7BB",
        alignItems: "center",
        justifyContent: "center",
    }
})

 export default LoadingScreen