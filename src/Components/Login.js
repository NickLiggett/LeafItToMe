import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { useState, useEffect } from "react";

const Login = ({ navigation }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [user, setUser] = useState(null);

  const userLogin = async () => {
    try {
      const response = await fetch("https://leaf-it-to-me-api.vercel.app/customers")
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
        "Login 23, There has been a problem with your fetch operation: " + err.message
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
        <View style={styles.inputWrapper}>
          <Text style={styles.inputText}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setUsernameInput(newText)}
          >
            {usernameInput}
          </TextInput>
        </View>
        <View style={styles.inputWrapper}>
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
    color: "green",
    fontFamily: "Satisfy-Regular",
    fontSize: 60,
    width: "100%",
    textAlign: "center",
    marginTop: "15%",
  },
  inputWrapper: {
    margin: "3%",
  },
  inputContainer: {
    marginTop: 25,
    width: "60%",
  },
  inputText: {
    color: "green",
    fontFamily: "Satisfy-Regular",
    fontSize: 30,
  },
  input: {
    height: 35,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 8,
    padding: 5,
    fontSize: 18,
    
  },
  loginButton: {
    backgroundColor: "green",
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "35%",
    borderRadius: 8,
  },
  createAccountButton: {
    backgroundColor: "green",
    width: 250,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: "Satisfy-Regular",
    fontSize: 30,
    color: "white",
    padding: 5,
    width: "100%",
    textAlign: "center",
  }
});

export default Login;
