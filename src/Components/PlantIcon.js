import { StyleSheet, Pressable, Text, Image } from "react-native";

const PlantIcon = ({ plant, selectPlant }) => {
  return (
    <Pressable style={styles.container} onPress={() => selectPlant(plant)}>
      <Image style={styles.image} source={plant.img} resizeMethod="auto" />
      <Text style={styles.text}>{plant.species}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    borderRadius: 15,
    margin: 15,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 20,
  },
  image: {
    width: "80%",
    height: "80%",
    borderRadius: 15,
    margin: "5%",
  },
});

export default PlantIcon;
