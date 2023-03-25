import { View, Text, StyleSheet, Pressable, Image } from "react-native";

const PlantDetails = ({
  setModalVisible,
  selectedPlant,
  userPlants,
  userId,
}) => {
  const removePlant = async () => {
    try {
      const response = await fetch(
        `https://leaf-it-to-me-api.vercel.app/customers/${userId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            plants: userPlants.filter(
              (plant) => parseInt(plant.id) !== parseInt(selectedPlant.id)
            ),
          }),
          headers: { "Content-type": "application/json" },
        }
      );
      const data = await response.json();
      console.log("PlantDetails 24, Success: ", data.plants);
    } catch (err) {
      console.log("PlantDetails 26, Error: ", err.message);
    }
    setModalVisible(false);
  };

  return selectedPlant ? (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: selectedPlant.image }} />
      <View style={styles.description}>
        <Text style={styles.plantName}>{selectedPlant.species}</Text>
        <Pressable onPress={() => removePlant()}>
          <Text>Delete</Text>
        </Pressable>
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
