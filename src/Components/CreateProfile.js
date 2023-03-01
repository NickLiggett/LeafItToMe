import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { useState } from "react";

const CreateProfile = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Create a Profile</Text>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputTitle}>First Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setFirstName(newText)}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.inputTitle}>Username:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setUserName(newText)}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.inputTitle}>Password:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setPassword(newText)}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.inputTitle}>Re-Enter Password:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setReEnteredPassword(newText)}
          ></TextInput>
        </View>
        <Pressable
          style={styles.nextButton}
          onPress={() =>
            navigation.navigate("Create Profile Page 2", {
              firstName: firstName,
              username: username,
              password: password,
              reEnteredPassword: reEnteredPassword,
            })
          }
        >
          <Text style={styles.nextText}>Next</Text>
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
  },
  titleContainer: {},
  titleText: {
    color: "#08BA46",
    fontFamily: "Satisfy-Regular",
    fontSize: 50,
    padding: "5%",
  },
  inputContainer: {
    padding: "5%",
    width: "80%",
    height: 500,
    justifyContent: "space-between",
  },
  inputTitle: {
    color: "#08BA46",
    fontFamily: "Satisfy-Regular",
    fontSize: 30,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
    height: 30,
    fontSize: 18,
  },
  nextButton: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#08BA46",
    width: 100,
    height: 40,
    borderRadius: 8,
    marginTop: 80,
  },
  nextText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default CreateProfile;
