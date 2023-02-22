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
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Add a new plant</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.nameInputWrapper}>
          <Text style={styles.nameInputTitle}>Name</Text>
          <TextInput
            style={styles.nameInput}
            onChangeText={(newText) => setSpecies(newText)}
          ></TextInput>
        </View>
        <View style={styles.careInputWrapper}>
          <Text style={styles.careInputTitle}>Care Instructions</Text>
          <TextInput
            style={styles.careInput}
            multiline
            onChangeText={(newText) => setCareInstructions(newText)}
          ></TextInput>
        </View>
        <Pressable
          style={styles.submitButton}
          onPress={() => {
            postNewPlant();
          }}
        >
          <Text
            style={styles.submitText}
          >
            Submit
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2E7BB",
    alignItems: "center",
  },
  inputContainer: {
    flex: 3 / 4,
    alignItems: "center",
    width: "80%",
    marginTop: 30,
  },
  nameInputWrapper: {
    width: "80%",
    height: 100,
  },
  nameInputTitle: {
    fontSize: 30,
    marginBottom: "1%",
    color: "#08BA46",
    fontFamily: "Satisfy-Regular",
  },
  nameInput: {
    width: "100%",
    height: 40,
    padding: "1%",
    paddingLeft: "3%",
    borderRadius: 8,
    backgroundColor: "white",
    fontSize: 18
  },
  careInputWrapper: {
    width: "80%",
    height: 200,
    marginTop: 50,
  },
  careInputTitle: {
    fontSize: 30,
    marginBottom: "1%",
    color: "#08BA46",
    fontFamily: "Satisfy-Regular",
  },
  careInput: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
    fontSize: 25,
    borderRadius: 8,
    padding: "3%",
    paddingTop: "3%",
    fontSize: 16,
    textAlignVertical: "top"
  },
  titleView: {
    marginTop: "5%",
  },
  titleText: {
    fontSize: 50,
    fontFamily: "Satisfy-Regular",
    color: "#08BA46",
  },
  submitButton: {
    backgroundColor: "green",
    borderRadius: 8,
    marginTop: 50,
    width: "80%"
  },
  submitText: {
    color: "white",
    textAlign: "center",
    padding: "2%",
    fontSize: 30,
    fontWeight: "900",
    fontFamily: "Satisfy-Regular",
  }
});

export default AddNew;
