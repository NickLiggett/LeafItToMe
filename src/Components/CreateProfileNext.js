import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { useState } from "react";

const CreateProfileNext = ({ route, navigation }) => {
  const { firstName, username, password } = route.params;

  const [userCity, setUserCity] = useState("");
  const [userState, setUserState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [userImg, setUserImg] = useState("");
  const [successful, setSuccessful] = useState(false);

  const postNewUser = () => {
    fetch("https://leaf-it-to-me-api.vercel.app/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        username: username,
        password: password,
        city: userCity,
        state: userState,
        zip_code: zipCode,
        user_img: userImg,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setSuccessful(true);
          return response.json();
        }
      })
      .then((data) => {
        console.log(data.new_customer);
        setTimeout(() => navigation.navigate("Login Page"), 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return successful ? (
    <View style={styles.successfulContainer}>
      <Text style={styles.successMessage}>
        Congratulations! You've successfully created an account!
      </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>Create a Profile</Text>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputTitle}>City</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setUserCity(newText)}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.inputTitle}>State</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setUserState(newText)}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.inputTitle}>Zip Code</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setZipCode(newText)}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.inputTitle}>Upload an image</Text>
          {/* Figure out how to upload image here */}
        </View>
        <Pressable style={styles.submitButton} onPress={() => postNewUser()}>
          <Text style={styles.nextText}>Submit</Text>
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
  successfulContainer: {
    flex: 1,
    backgroundColor: "#F2E7BB",
    alignItems: "center",
    justifyContent: "center",
  },
  successMessage: {
    width: "80%",
    textAlign: "center",
    fontSize: 50,
    color: "#08BA46",
    fontFamily: "Satisfy-Regular",
  },
  titleText: {
    color: "#08BA46",
    fontFamily: "Satisfy-Regular",
    fontSize: 50,
    padding: "5%",
    marginTop: 50,
  },
  inputContainer: {
    padding: "5%",
    width: "80%",
    height: 550,
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
  submitButton: {
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

export default CreateProfileNext;
