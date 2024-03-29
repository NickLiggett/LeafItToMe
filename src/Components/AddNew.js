import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import LoadingScreen from "../Components/LoadingScreen";
import UploadImage from "../Components/UploadImage";

const AddNew = ({ route, navigation }) => {
  const [plantSpecies, setSpecies] = useState("");
  const [plantImage, setPlantImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [careInstructions, setCareInstructions] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(false);

  const { userId, userPlants, setUserPlants } = route.params;

  const assignId = () => {
    const plantIds = userPlants.map((plant) => plant.id);
    let id = Math.floor(Math.random() * 1000000000 + 1);
    if (plantIds.includes(id)) {
      id = Math.floor(Math.random() * 1000000000 + 1);
    }
    return id;
  };

  const pickImage = async () => {
    setLoadingScreen(true)
    let options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    };
    let result = await ImagePicker.launchImageLibraryAsync(
      options,
      (response) => console.log("Add New 1, Response: ", response)
    );

    if (!result.canceled) {
      setLoadingScreen(false)
      setPlantImage(result.assets[0].base64);
      setImagePreview(result.assets[0].uri);
    }
  };

  const postNewPlant = async () => {
    try {
      setLoadingScreen(true);

      // Send image to Cloudinary

      const formData = new FormData();
      formData.append("file", `data:image/jpg;base64,${plantImage}`);
      formData.append("upload_preset", "LITM_User_Plants");

      const imageResponse = await fetch(
        `https://api.cloudinary.com/v1_1/dcnjzxcgj/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imageData = await imageResponse.json();

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
                imageID: imageData.public_id,
                species: plantSpecies,
                image: imageData.secure_url,
                instructions: careInstructions,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      setUserPlants(data.plants);
    } catch (err) {
      console.log(`There was a problem posting the new plant: ${err.message}`);
    }
    navigation.goBack();
  };

  return !loadingScreen ? (
    <ScrollView contentContainerStyle={styles.container}>
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
        <View style={{ marginTop: 50, width: "100%" }}>
          <UploadImage imagePreview={imagePreview} pickImage={pickImage} />
        </View>
        <Pressable style={styles.submitButton} onPress={() => postNewPlant()}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  ) : (
    <LoadingScreen />
  );
};

const styles = StyleSheet.create({
  container: {
    height: "120%",
    backgroundColor: "#F2E7BB",
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "center",
    width: "100%",
  },
  nameInputWrapper: {
    width: "80%",
    marginTop: 20,
  },
  inputTitle: {
    color: "green",
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
    width: "80%",
    marginTop: 20,
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
    color: "green",
  },
  submitButton: {
    backgroundColor: "green",
    borderRadius: 8,
    width: "80%",
    marginTop: 50,
  },
  submitText: {
    fontFamily: "Satisfy-Regular",
    color: "white",
    textAlign: "center",
    padding: "2%",
    fontSize: 30,
  },
});

export default AddNew;
