import { StyleSheet, Text, View, Pressable } from "react-native";

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Leaf It To Me</Text>
      <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Home')}>
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
    justifyContent: "center",
  },
  titleText: {
    color: "#08BA46",
    fontSize: 50,
    fontFamily: "Satisfy-Regular",
    flex: 2 / 3,
  },
  loginButton: {
    backgroundColor: "#08BA46",
    width: 100,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
