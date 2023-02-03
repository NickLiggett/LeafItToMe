import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Text,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import addIcon from "../../assets/add-icon.png";

import PlantIcon from "./PlantIcon";
import PlantDetails from "./PlantDetails";

const MyPlants = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [userPlants, setUserPlants] = useState(route.params.user.plants)

  const selectPlant = (plant) => {
    setSelectedPlant(plant);
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    fetch(`http://localhost:4000/customers/${route.params.user.id}`)
    .then(response => response.json())
    .then(data => {
      setUserPlants(data.customer.plants)
    })
  }, [userPlants])

  return (
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
          user={route.params.user}
        />
      </Modal>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.addContainer}
          onPress={() => navigation.navigate("AddNew", { screen: "AddNew", user: route.params.user })}
        >
          {/* create post function here */}
          <Image source={addIcon} />
          <Text style={styles.addText}>Add New</Text>
        </Pressable>
      </View>
      <FlatList
        style={styles.flatlist}
        data={userPlants}
        renderItem={({ item }) => (
          <PlantIcon plant={item} selectPlant={selectPlant} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2E7BB",
    alignItems: "center",
    justifyContent: "center",
  },
  flatlist: {
    width: "100%",
  },
  headerContainer: {
    width: "100%",
  },
  addContainer: {
    alignItems: "center",
    alignSelf: "flex-end",
    paddingTop: 10,
    paddingBottom: 3,
    marginRight: 25,
    borderWidth: 1,
  },
  addText: {
    fontWeight: "600",
  },
});

export default MyPlants;
