import { StyleSheet, View, Image, Text, Pressable } from "react-native";

const Home = ({ navigation, route }) => {
  const user = route.params.user;

  return (
    <View style={user.user_img ? styles.container : styles.containerNoPic}>
      {user.user_img ? <Image
        style={styles.userImage}
        source={{ uri: user.user_img }}
      ></Image>: null}
      <Text style={styles.titleText}>Welcome, {user.first_name}!</Text>
      <View style={styles.optionContainer}>
        <Pressable
          style={styles.option}
          onPress={() => navigation.navigate("My Plants", { user: user })}
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
  containerNoPic: {
    flex: 1,
    backgroundColor: "#F2E7BB",
    alignItems: "center",
  },
  userImage: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: "#08BA46",
  },
  optionContainer: {
    marginTop: 50
  },
  titleText: {
    color: "green",
    fontSize: 50,
    fontFamily: "Satisfy-Regular",
    marginTop: 50,
  },
  option: {
    height: 80,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 15,
    margin: "5%",
  },
  optionText: {
    color: "green",
    fontSize: 30,
    fontFamily: "Satisfy-Regular",
    padding: "2%",
  },
});

export default Home;
