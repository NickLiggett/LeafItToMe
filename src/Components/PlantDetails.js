import { View, Text, StyleSheet, Image } from "react-native";

const PlantDetails = ({ setModalVisible, selectedPlant }) => {
  return selectedPlant ? (
    <View style={styles.container}>
      <Image style={styles.image} source={selectedPlant.img} />
      <View style={styles.description}>
        <Text style={styles.plantName}>{selectedPlant.species}</Text>
        <Text style={styles.instructions}>{selectedPlant.instructions}</Text>
        <Text onPress={() => setModalVisible(false)}>Close</Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <Text>Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2E7BB",
    alignItems: "center",
  },
  image: {
    width: "100%",
    flex: 2 / 3,
  },
  plantName: {
    fontSize: 30,
    padding: 10,
  },
  description: {
    backgroundColor: "rgba(255,255,255,0.7)",
    width: "100%",
    flex: 1 / 3,
    alignItems: "center",
  },
  instructions: {
    fontSize: 15,
    flex: 7 / 8,
    padding: 20,
    textAlign: "center",
  },
});

export default PlantDetails;
