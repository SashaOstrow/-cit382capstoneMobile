import React from "react";
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview"; //for youtube videos

function Home (){
  return(
    //ScrollView allows vertical scrolling since content might overflow the screen
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Cookn' Share!</Text>
      <Text style={styles.subtitle}> Share and find Recipes</Text>

      {/*Hero image 
      <Image
      source={require("../../assets/logosmall.png")}
      style={styles.heroImage} //styles for image size and layout
      resizeMode="contain" //scale image to fit without distortion
      />
      */}
      <Text style={styles.scrollText}>Continue Scrolling ⬇️ </Text>

      <Text style={styles.sectionTitle}>Check out what's viral:</Text>

      <View style={styles.videoContainer}>
        <WebView
        style={styles.video} // fills container
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: "https://www.youtube.com/embed/Z_f3mxa1R98" }}
          />
      </View>
    </ScrollView>
  );
}

export default Home;

// Define all your styles here
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  scrollText: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  videoContainer: {
    width: "100%",
    height: 220,
    marginBottom: 20,
  },
  video: {
    flex: 1,
  },
});