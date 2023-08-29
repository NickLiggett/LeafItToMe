import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import { useState } from "react";
import CryptoJS from "crypto-js";
import * as ImagePicker from "expo-image-picker";

import UploadImage from "../Components/UploadImage";
import LoadingScreen from "../Components/LoadingScreen";

const cloudName = process.env.CLOUD_NAME;
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

const EditPlant = ({
  setEditScreen,
  setUserPlants,
  plant,
  userPlants,
  userId,
  removePlant,
  setModalVisible
}) => {
  const { id, image, instructions, species, imageID } = plant;

  const [newSpecies, setNewSpecies] = useState(species);
  const [plantImage, setPlantImage] = useState(image);
  const [imagePreview, setImagePreview] = useState(null);
  const [newInstructions, setNewInstructions] = useState(instructions);
  const [loadingScreen, setLoadingScreen] = useState(false);

  const pickImage = async () => {
    setLoadingScreen(true);
    let options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    };
    let result = await ImagePicker.launchImageLibraryAsync(
      options,
      (response) => console.log("Response: ", response)
    );

    if (!result.canceled) {
      setLoadingScreen(false);
      setPlantImage(result.assets[0].base64);
      setImagePreview(result.assets[0].uri);
    }
    setLoadingScreen(false);
  };

  const postEditedPlant = async () => {
    try {
      setLoadingScreen(true);

      // Delete old image from cloudinary if user has selected a new image.
      if (imagePreview) {
        const timestamp = Math.floor(Date.now() / 1000);
        const signaturePayload = `public_id=${imageID}&timestamp=${timestamp}${apiSecret}`;
        const signature = CryptoJS.SHA1(signaturePayload).toString();
        const imageDeleteResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              public_id: imageID,
              api_key: apiKey,
              timestamp: timestamp,
              signature: signature,
            }),
          }
        );
        if (!imageDeleteResponse.ok) {
          console.log("Failed to delete image");
        }
      }

      // Send new image to Cloudinary if user has selected a new image.
      let newImageData
      if (imagePreview) {
        const formData = new FormData();
        formData.append("file", `data:image/jpg;base64,${plantImage}`);
        formData.append("upload_preset", "LITM_User_Plants");

        const newImageResponse = await fetch(
          `https://api.cloudinary.com/v1_1/dcnjzxcgj/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        newImageData = await newImageResponse.json();
      }

      // Find and update the specified plant

      const plantIndex = userPlants.findIndex((plant) => plant.id === id);
      console.log("It's this...", newImageData)
      userPlants.splice(plantIndex, 1, {
        id: id,
        imageID: imagePreview ? newImageData.public_id : imageID,
        species: newSpecies,
        image: imagePreview ? newImageData.secure_url : image, // if imagePreview not null, use newImageData.secure_url otherwise use "image" (the cloud url)
        instructions: newInstructions,
      });

      // Send data to MongoDB

      const response = await fetch(
        `https://leaf-it-to-me-api.vercel.app/customers/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plants: [...userPlants],
          }),
        }
      );

      const data = await response.json();
      setUserPlants(data.plants);
    } catch (err) {
      console.log(`There was a problem posting the new plant: ${err.message}`);
    }
    setLoadingScreen(false);
    setEditScreen(false);
    setModalVisible(false)
  };

  return !loadingScreen ? (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Edit this plant</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.nameInputWrapper}>
          <Text style={styles.inputTitle}>Name</Text>
          <TextInput
            style={styles.nameInput}
            value={newSpecies}
            onChangeText={(newText) => setNewSpecies(newText)}
          ></TextInput>
        </View>
        <View style={styles.careInputWrapper}>
          <Text style={styles.inputTitle}>Care Instructions</Text>
          <TextInput
            style={styles.careInput}
            multiline
            value={newInstructions}
            onChangeText={(newText) => setNewInstructions(newText)}
          ></TextInput>
        </View>
        <View style={{ marginTop: 50, width: "100%" }}>
          <UploadImage
            imagePreview={imagePreview ? imagePreview : plantImage}
            pickImage={pickImage}
            buttonTitle="Change this image"
          />
        </View>
        <Pressable
          style={styles.submitButton}
          onPress={() => postEditedPlant()}
        >
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={() => removePlant()}
        >
          <Text style={styles.deleteText}>Delete this plant</Text>
        </Pressable>
      </View>
      <Pressable onPress={() => setEditScreen(false)}>
        <Text>Cancel</Text>
      </Pressable>
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
  titleView: {
    marginTop: "20%",
  },
  titleText: {
    fontSize: 50,
    fontFamily: "Satisfy-Regular",
    color: "green",
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
  deleteButton: {
    backgroundColor: "#DC143C",
    borderRadius: 8,
    width: "80%",
    marginTop: 20,
  },
  deleteText: {
    fontFamily: "Satisfy-Regular",
    color: "white",
    textAlign: "center",
    padding: "2%",
    fontSize: 30,
  },
});

export default EditPlant;
