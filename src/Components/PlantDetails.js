import { View, Text, StyleSheet, Pressable, Image } from "react-native";

const PlantDetails = ({ setModalVisible, selectedPlant, user }) => {
  const deleteHandler = () => {
    fetch(`http://localhost:4000/customers/${user.id}/plants/${selectedPlant.id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error))
        .then(() => setModalVisible(false))
  };

  return selectedPlant ? (
    <View style={styles.container}>
      <Image style={styles.image} source={selectedPlant.img} />
      <View style={styles.description}>
        <Text style={styles.plantName}>{selectedPlant.species}</Text>
        <Pressable onPress={() => deleteHandler()}>
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
