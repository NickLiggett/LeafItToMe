import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { useState, useEffect } from "react";

const Login = ({ navigation }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [user, setUser] = useState(null);

  const userLogin = () => {
    fetch("https://leaf-it-to-me-api.vercel.app/customers")
      .then((response) => response.json())
      .then((data) => {
        const theUser = data.find(
          (customer) =>
            customer.username.toLowerCase() === usernameInput.toLowerCase() &&
            customer.password === passwordInput
        );
        if (theUser !== undefined) {
          setUser(theUser);
        }
      })
      .catch(function (error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  };

  useEffect(() => {
    setPasswordInput("");
    setUsernameInput("");
    if (user) {
      navigation.navigate("Home", { user: user });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Leaf It To Me</Text>
      <View style={styles.inputContainer}>
        <Text>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => setUsernameInput(newText)}
        >
          {usernameInput}
        </TextInput>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(event) => setPasswordInput(event)}
        >
          {passwordInput}
        </TextInput>
      </View>
      <Pressable
        style={styles.loginButton}
        onPress={() => {
          userLogin();
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2E7BB",
    alignItems: "center",
  },
  titleText: {
    color: "#08BA46",
    fontSize: 50,
    fontFamily: "Satisfy-Regular",
    padding: "5%",
    marginTop: 50,
  },
  inputContainer: {
    marginTop: 25,
  },
  loginButton: {
    backgroundColor: "#08BA46",
    width: 100,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  input: {
    height: 30,
    width: 170,
    backgroundColor: "rgba(255,255,255,0.7)",
    margin: "1%",
  },
});

export default Login;
