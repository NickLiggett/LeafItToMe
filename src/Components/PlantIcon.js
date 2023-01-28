import { StyleSheet, View, Text } from "react-native";

const PlantIcon = ({ plant }) => {
  console.log(plant);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{plant.species}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 100,
    borderRadius: 15,

    margin: "5%",
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  text: { textAlign: "center" },
});

export default PlantIcon;
