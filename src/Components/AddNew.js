import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

const AddNew = ({ route, navigation }) => {
  const [plantSpecies, setSpecies] = useState("");
  const [plantImage, setPlantImage] = useState("");
  const [careInstructions, setCareInstructions] = useState("");

  const { user, setUserPlants } = route.params;

  const postNewPlant = () => {
    fetch(`https://leaf-it-to-me-api.vercel.app/customers/${user.id}/plants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        species: plantSpecies,
        img: plantImage,
        instructions: careInstructions,
      }),
    })
      .then((response) => response.json())
      .then((data) => setUserPlants(data.plants))
      .catch((error) => console.error(error))
      .finally(() => {
        navigation.goBack();
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text>Name:</Text>
          <TextInput
            style={{ width: 150, height: 20, backgroundColor: "white" }}
            onChangeText={(newText) => setSpecies(newText)}
          ></TextInput>
        </View>
        <View>
          <Text>Care Insturctions:</Text>
          <TextInput
            style={{ width: 200, height: 100, backgroundColor: "white" }}
            multiline={true}
            onChangeText={(newText) => setCareInstructions(newText)}
          ></TextInput>
          <Pressable
            style={{ width: 100, height: 20, backgroundColor: "green" }}
            onPress={() => {
              postNewPlant();
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2E7BB",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddNew;
