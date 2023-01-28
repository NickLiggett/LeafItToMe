import { StyleSheet, View, Text, Image } from "react-native";

const PlantIcon = ({ plant }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={plant.img} resizeMethod="auto"/>
      <Text style={styles.text}>{plant.species}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    borderRadius: 15,
    margin: "5%",
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "900",
  },
  image: {
    width: "80%",
    height: "80%",
    borderRadius: 15,
    margin: "5%",
  },
});

export default PlantIcon;
