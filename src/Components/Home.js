import { StyleSheet, View, Text, Pressable } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Welcome, Nick!</Text>
      <View style={styles.optionContainer}>
        <Pressable style={styles.option}>
          <Text style={styles.optionText}>My Plants</Text>
        </Pressable>
        <Pressable style={styles.option}>
          <Text style={styles.optionText}>My Schedule</Text>
        </Pressable>
        <Pressable style={styles.option}>
          <Text style={styles.optionText}>Request a visit</Text>
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
    marginTop: 20
  },
  option: {
    height: 100,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: "15%",
    margin: '5%'
  },
  optionText: {
    color: "green",
    fontSize: 20
  },
  optionContainer: {
    flex: 1,
    // flexDirection: 'row',
  },
});

export default Home;
