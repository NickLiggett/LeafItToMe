import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { useState, useEffect } from "react";

const Login = ({ navigation }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [user, setUser] = useState(null);

  const userLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/customers")
      const data = await response.json()
      const theUser = data.find(
        (customer) =>
          customer.username.toLowerCase() === usernameInput.toLowerCase() &&
          customer.password === passwordInput
      );
      if (theUser !== undefined) {
        setUser(theUser);
      }
    } catch (err) {
      console.log(
        "There has been a problem with your fetch operation: " + err.message
      );
    }

  }

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
        <View>
          <Text style={styles.inputText}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setUsernameInput(newText)}
          >
            {usernameInput}
          </TextInput>
        </View>
        <View>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(event) => setPasswordInput(event)}
          >
            {passwordInput}
          </TextInput>
        </View>
      </View>
      <Pressable
        style={styles.loginButton}
        onPress={() => {
          userLogin();
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable
        style={styles.createAccountButton}
        onPress={() => navigation.navigate("Create Profile Page")}
      >
        <Text style={styles.buttonText}>Create an Account</Text>
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
    fontFamily: "Satisfy-Regular",
    fontSize: 60,
    padding: "5%",
  },
  inputContainer: {
    marginTop: 25,
    width: "60%",
    padding: "5%",
  },
  inputText: {
    color: "#08BA46",
    fontFamily: "Satisfy-Regular",
    fontSize: 40,
  },
  input: {
    height: 35,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 8,
    padding: 5,
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: "#08BA46",
    width: "30%",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "35%",
    borderRadius: 8,
  },
  createAccountButton: {
    backgroundColor: "#08BA46",
    width: "50%",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  }
});

export default Login;
