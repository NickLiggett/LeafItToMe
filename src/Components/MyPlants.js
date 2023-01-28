import { View, StyleSheet, FlatList, Text } from "react-native";
import { useState } from "react";

import PlantIcon from "./PlantIcon"

const MyPlants = ({ route }) => {
  const [plants, setPlants] = useState(route.params.user.plants);
  console.log(plants);

  return (
    <View style={styles.container}>
      <FlatList
        data={plants}
        renderItem={({item}) => <PlantIcon plant={item}/>}
        keyExtractor={item => item.id}
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
});

export default MyPlants;
