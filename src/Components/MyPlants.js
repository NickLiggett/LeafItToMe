import { View, StyleSheet, FlatList, Image, Text, Modal } from "react-native";
import { useState } from "react";
import addIcon from "../../assets/add-icon.png";

import PlantIcon from "./PlantIcon";
import PlantDetails from "./PlantDetails";

const MyPlants = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const selectPlant = (plant) => {
    setSelectedPlant(plant);
    setModalVisible(!modalVisible);
  };

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
        />
      </Modal>
      <View style={styles.headerContainer}>
        <View style={styles.addContainer}>
          {/* create post function here */}
          <Image source={addIcon} />
          <Text style={styles.addText}>Add New</Text>
        </View>
      </View>
      <FlatList
        style={styles.flatlist}
        data={route.params.user.plants}
        renderItem={({ item }) => (
          <PlantIcon plant={item} selectPlant={selectPlant} />
        )}
        keyExtractor={(item) => item.id}
      />
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
  },
  addText: {
    fontWeight: "600",
  },
});

export default MyPlants;
