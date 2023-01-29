import { StyleSheet, View, Text, Pressable } from "react-native";
import { useState } from "react";

const Home = ({ navigation, route }) => {
  const [user, setUser] = useState(route.params.user);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Welcome, {user.first_name}!</Text>
      <View style={styles.optionContainer}>
        <Pressable
          style={styles.option}
          onPress={() => navigation.navigate("MyPlants", { user: user })}
        >
          <Text style={styles.optionText}>My Plants</Text>
        </Pressable>
        <Pressable style={styles.option}>
          <Text style={styles.optionText}>My Schedule</Text>
        </Pressable>
        <Pressable style={styles.option}>
          <Text style={styles.optionText}>Leaf it to another</Text>
        </Pressable>
        <Pressable style={styles.option}>
          <Text style={styles.optionText}>Leaf it to me</Text>
        </Pressable>
      </View>
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
  titleText: {
    color: "#08BA46",
    fontSize: 50,
    fontFamily: "Satisfy-Regular",
    flex: 1 / 6,
    marginTop: 30
  },
  option: {
    height: 100,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 15,
    margin: "5%",
  },
  optionText: {
    color: "#08BA46",
    fontSize: 30,
    fontFamily: "Satisfy-Regular",
    margin: "5%",
  },
  optionContainer: {
    flex: 1,
  },
});

export default Home;
