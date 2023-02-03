import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

const AddNew = ({ route, navigation }) => {
  const [plantSpecies, setSpecies] = useState("");
  const [plantImage, setPlantImage] = useState("");
  const [careInstructions, setCareInstructions] = useState("");

  const postNewPlant = () => {
    fetch(`http://localhost:4000/customer/addPlant/${route.params.user.id}`, {
      method: "POST",
      body: JSON.stringify({
        id: 3,
        species: plantSpecies,
        img: plantImage,
        instructions: careInstructions,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
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
              navigation.goBack();
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
