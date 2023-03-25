import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const CreateProfileNext = ({ route, navigation }) => {
  const { firstName, username, password } = route.params;

  const [userCity, setUserCity] = useState("");
  const [userState, setUserState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [image, setImage] = useState(null);
  const [successful, setSuccessful] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const postNewUser = async () => {
    try {
      const response = await fetch(
        "https://leaf-it-to-me-api.vercel.app/customers",
        {
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
            user_img: image,
          }),
        }
      );
      const data = await response.json();
      setSuccessful(true);
      console.log("CreateProfileNext 56, Data: ", data);
      setTimeout(() => navigation.navigate("Login Page"), 2000);
    } catch (err) {
      console.log("CreateProfileNext 59, Error: ", err.message);
    }
  };

  return successful ? (
    <View style={styles.successfulContainer}>
      <Text style={styles.successMessage}>
        Congratulations! You've successfully created an account!
      </Text>
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.titleText}>Create a Profile</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}> City</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setUserCity(newText)}
          ></TextInput>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}> State</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setUserState(newText)}
          ></TextInput>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}> Zip Code</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setZipCode(newText)}
          ></TextInput>
        </View>
        <View style={styles.inputWrapper}>
          <Pressable
            onPress={() => pickImage()}
            style={styles.uploadImageButton}
          >
            <Text style={styles.imageInputTitle}> Upload an image</Text>
          </Pressable>
        </View>
        <Pressable style={styles.submitButton} onPress={() => postNewUser()}>
          <Text style={styles.nextText}>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "140%",
    width: "100%",
    backgroundColor: "#F2E7BB",
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
    width: "100%",
    textAlign: "center",
    padding: "5%",
  },
  inputContainer: {
    width: "100%",
    height: 550,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  inputWrapper: {
    width: "80%",
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
  uploadImageButton: {
    backgroundColor: "#08BA46",
    borderRadius: 8,
  },
  imageInputTitle: {
    color: "#fff",
    fontFamily: "Satisfy-Regular",
    fontSize: 30,
    textAlign: "center",
  },
  submitButton: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#08BA46",
    width: 100,
    height: 40,
    marginTop: 70,
    borderRadius: 8,
  },
  nextText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default CreateProfileNext;
