import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useState } from "react";
import CryptoJS from "crypto-js";

import editIcon from "../../assets/edit-icon.png";

import LoadingScreen from "../Components/LoadingScreen";
import EditPlant from "../Components/EditPlant";

const cloudName = process.env.CLOUD_NAME;
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

const PlantDetails = ({
  setModalVisible,
  selectedPlant,
  userPlants,
  userId,
  setUserPlants,
}) => {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [editScreen, setEditScreen] = useState(false);

  const removePlant = async () => {
    try {
      setLoadingScreen(true);

      // Remove from cloudinary (will throw error if no cloudinary image exists)

      const timestamp = Math.floor(Date.now() / 1000);
      const signaturePayload = `public_id=${selectedPlant.imageID}&timestamp=${timestamp}${apiSecret}`;
      const signature = CryptoJS.SHA1(signaturePayload).toString();
      const imageResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            public_id: selectedPlant.imageID,
            api_key: apiKey,
            timestamp: timestamp,
            signature: signature,
          }),
        }
      );
      if (!imageResponse.ok) {
        console.log("Failed to delete image");
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
    !editScreen ? (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: selectedPlant.image }} />
        <View style={styles.description}>
          <Text style={styles.plantName}>{selectedPlant.species}</Text>
          <Pressable
            style={styles.editButton}
            onPress={() => setEditScreen(true)}
          >
            <Image style={styles.editIcon} source={editIcon} />
          </Pressable>
          <Text style={styles.instructions}>{selectedPlant.instructions}</Text>
          <Text
            style={{ textAlign: "center" }}
            onPress={() => setModalVisible(false)}
          >
            Close
          </Text>
        </View>
      </View>
    ) : (
      <EditPlant
        setEditScreen={setEditScreen}
        plant={selectedPlant}
        userPlants={userPlants}
        userId={userId}
        setUserPlants={setUserPlants}
        removePlant={removePlant}
        setModalVisible={setModalVisible}
      />
    )
  ) : (
    <LoadingScreen />
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
    textAlign: "center",
  },
  description: {
    backgroundColor: "rgba(255,255,255,0.7)",
    width: "100%",
    flex: 1 / 3,
  },
  editButton: {
    marginRight: 10,
    alignSelf: "flex-end",
  },
  editIcon: {
    width: 20,
    height: 20,
    alignSelf: "flex-end",
  },
  instructions: {
    fontSize: 15,
    flex: 7 / 8,
    padding: 20,
    textAlign: "center",
  },
});

export default PlantDetails;
