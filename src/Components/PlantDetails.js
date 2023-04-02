import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator } from "react-native";
import { useState } from "react"
import CryptoJS from 'crypto-js'

import LoadingScreen from "../Components/LoadingScreen"

const PlantDetails = ({
  setModalVisible,
  selectedPlant,
  userPlants,
  userId,
}) => {
  const cloudName = process.env.CLOUD_NAME;
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_SECRET;

  const [loadingScreen, setLoadingScreen] = useState(false)

  const removePlant = async () => {
    try {

      setLoadingScreen(true)

      // Remove from cloudinary

      const timestamp = Math.floor(Date.now() / 1000);
      const signaturePayload = `public_id=${selectedPlant.imageID}&timestamp=${timestamp}${apiSecret}`
      const signature = CryptoJS.SHA1(signaturePayload).toString()
      const imageResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_id: selectedPlant.imageID,
          api_key: apiKey,
          timestamp: timestamp,
          signature: signature
        }),
      })
          if (!imageResponse.ok) {
            throw new Error("Failed to delete image");
          }
          console.log("Image deleted successfully");
        

      // Remove from MongoDB

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
      console.log(`Plant removed successfully: , ${data.plants}`);
    } catch (err) {
      console.log(`There was a problem removing the plant: ${err.message}`);
    }
    setModalVisible(false);
  };

  return !loadingScreen ? (
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
    <LoadingScreen/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2E7BB",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F2E7BB",
    alignItems: "center",
    justifyContent: "center",
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
