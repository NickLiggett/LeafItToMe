import { StyleSheet, View, Image, Pressable, Text } from "react-native"

const UploadImage = ({ pickImage, imagePreview }) => {
    return (
        <View style={styles.uploadSection}>
        {imagePreview && (
          <Image
            style={styles.checkmark}
            source={require("../../assets/checkmark.gif")}
          ></Image>
        )}
        <Pressable
          onPress={() => pickImage()}
          style={!imagePreview ? styles.uploadButton : styles.uploadedButton}
        >
          <Text style={styles.uploadText}>
            Upload an image
          </Text>
        </Pressable>
        {imagePreview && (
          <Image
            style={styles.imagePreview}
            source={{ uri: imagePreview }}
          ></Image>
        )}
      </View>
    )
}

const styles = StyleSheet.create({
    uploadSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
      },
      checkmark: {
        width: 60,
        height: 60,
      },
      uploadButton: {
        padding: 10,
        backgroundColor: "green",
        borderRadius: 8,
      },
      uploadedButton: {
        padding: 10,
        backgroundColor: "green",
        borderRadius: 8,
      },
      uploadText: {
        color: "white",
        fontFamily: "Satisfy-Regular",
        fontSize: 30,
      },
      uploadedText: {
        color: "#08BA46",
        fontFamily: "Satisfy-Regular",
        fontSize: 30,
      },
      imagePreview: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginLeft: 0
      },
})

export default UploadImage