import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const AddNew = ({ route, navigation }) => {
  const [plantSpecies, setSpecies] = useState("");
  const [plantImage, setPlantImage] = useState("");
  const [careInstructions, setCareInstructions] = useState("");

  const { userId, userPlants, setUserPlants } = route.params;

  const assignId = () => {
    const plantIds = userPlants.map((plant) => plant.id);
    let id = Math.floor(Math.random() * 1000000 + 1);
    if (plantIds.includes(id)) {
      id = Math.floor(Math.random() * 1000000 + 1);
    }
    return id;
  };

  const pickImage = async () => {
    let options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    };
    let result = await ImagePicker.launchImageLibraryAsync(
      options,
      (response) => console.log("Add New, 38, Response: ", response)
    );

    if (!result.canceled) {
      setPlantImage(result.assets[0].base64); // Configure to send to cloudinary.
    }
  };

  const postNewPlant = async () => {
    try {

      // Send image to Cloudinary

      const formData = new FormData();
      formData.append("file", `data:image/jpg;base64,${plantImage}`);
      formData.append("upload_preset", "LITM_User_Plants")

      const imageResponse = await fetch(
        `https://api.cloudinary.com/v1_1/dcnjzxcgj/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imageData = await imageResponse.json();
      console.log("AddNew 63, ImageData: ", imageData);

      // Send data to MongoDB

      const response = await fetch(
        `https://leaf-it-to-me-api.vercel.app/customers/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plants: [
              ...userPlants,
              {
                id: assignId(),
                species: plantSpecies,
                image: imageData.secure_url, // Send cloudinary url
                instructions: careInstructions,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      setUserPlants(data.plants);
    } catch (err) {
      console.log(`AddNew 86, Error: ${err}`);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Add a new plant</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.nameInputWrapper}>
          <Text style={styles.inputTitle}>Name</Text>
          <TextInput
            style={styles.nameInput}
            onChangeText={(newText) => setSpecies(newText)}
          ></TextInput>
        </View>
        <View style={styles.careInputWrapper}>
          <Text style={styles.inputTitle}>Care Instructions</Text>
          <TextInput
            style={styles.careInput}
            multiline
            onChangeText={(newText) => setCareInstructions(newText)}
          ></TextInput>
        </View>
        <View style={{}}>
          <Pressable onPress={() => pickImage()}>
            <Text style={styles.inputTitle}>Upload an image</Text>
          </Pressable>
        </View>
        <Pressable style={styles.submitButton} onPress={() => postNewPlant()}>
          <Text style={styles.submitText}>Submit</Text>
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
    flex: 7 / 8,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "80%",
  },
  nameInputWrapper: {
    width: "90%",
    height: 100,
  },
  inputTitle: {
    color: "#08BA46",
    fontFamily: "Satisfy-Regular",
    fontSize: 30,
  },
  nameInput: {
    width: "100%",
    height: 40,
    padding: "1%",
    paddingLeft: "3%",
    borderRadius: 8,
    backgroundColor: "white",
    fontSize: 18,
  },
  careInputWrapper: {
    width: "100%",
    height: 200,
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
    textAlignVertical: "top",
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
    width: "80%",
  },
  submitText: {
    color: "white",
    textAlign: "center",
    padding: "2%",
    fontSize: 30,
    fontWeight: "900",
    fontFamily: "Satisfy-Regular",
  },
});

export default AddNew;
