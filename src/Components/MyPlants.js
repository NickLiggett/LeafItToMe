import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Text,
  Modal,
  LogBox,
  Animated,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import addIcon from "../../assets/add-icon.png";

import PlantIcon from "./PlantIcon";
import PlantDetails from "./PlantDetails";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const MyPlants = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [userPlants, setUserPlants] = useState(route.params.user.plants);

  const prevUserPlants = useRef(userPlants);

  const selectPlant = (plant) => {
    setSelectedPlant(plant);
    setModalVisible(!modalVisible);
  };

  const getSingleUser = async () => {
    try {
      const response = await fetch(
        `https://leaf-it-to-me-api.vercel.app/customers/${route.params.user._id}`
      );
      const data = await response.json();
      if (prevUserPlants.current !== data.plants) {
        setUserPlants(data.plants);
        prevUserPlants.current = data.plants;
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, [modalVisible]);

  return userPlants.length ? (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <PlantDetails
          setModalVisible={setModalVisible}
          selectedPlant={selectedPlant}
          userPlants={userPlants}
          userId={route.params.user._id}
          setUserPlants={setUserPlants}
        />
      </Modal>
      <Pressable
        style={styles.addContainer}
        onPress={() =>
          navigation.navigate("Add New Plant", {
            screen: "Add New Plant",
            userId: route.params.user._id,
            userPlants: userPlants,
            setUserPlants: setUserPlants,
          })
        }
      >
        <Image source={addIcon} style={{ width: 40, height: 40 }} />
      </Pressable>
      <FlatList
        style={styles.flatlist}
        data={userPlants}
        renderItem={({ item }) => (
          <PlantIcon plant={item} selectPlant={selectPlant} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  ) : (
    <View style={styles.containerNoPlants}>
      <Text style={styles.addFirstPlantText}>Add a plant!</Text>
      <Pressable
        style={styles.addButton}
        onPress={() => {
          navigation.navigate("Add New Plant", {
            screen: "Add New Plant",
            userId: route.params.user._id,
            userPlants: userPlants,
            setUserPlants: setUserPlants,
          });
        }}
      >
        <Image source={addIcon} style={styles.addSymbol} />
      </Pressable>
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
  containerNoPlants: {
    flex: 1,
    backgroundColor: "#F2E7BB",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  flatlist: {
    width: "100%",
  },
  addContainer: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "rgba(0, 128, 0, 0.5)",
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  addText: {
    fontWeight: "600",
  },
  addFirstPlantText: {
    color: "green",
    fontFamily: "Satisfy-Regular",
    fontSize: 40,
    marginTop: "50%",
  },
  addButton: {
    marginTop: "15%",
    backgroundColor: "rgba(250, 250, 250, 0.7)",
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 100,
    width: 170,
    height: 170,
    alignItems: "center",
    justifyContent: "center",
  },
  addSymbol: {
    width: 120,
    height: 120,
  },
});

export default MyPlants;
