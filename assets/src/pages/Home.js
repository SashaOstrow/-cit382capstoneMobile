import React from "react";
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Platform} from "react-native";
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
        {/*either use IOS and webview depending on how you're viewing it */}
        {/*cheesecake*/}
      <View style={styles.videoContainer}>
        {Platform.OS === "web" ? (
          <iframe
            width="40%"
            height="400"
            src="https://www.youtube.com/embed/Z_f3mxa1R98"
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <WebView
            style={styles.video}
            javaScriptEnabled
            domStorageEnabled
            source={{ uri: "https://www.youtube.com/embed/Z_f3mxa1R98" }}
          />
        )}
      </View>
        {/*icecream*/}
      <View style={styles.videoContainer}>
        {Platform.OS === "web" ? (
          <iframe
            width="40%"
            height="400"
            src="https://youtube.com/embed/-85jyla-gK4?si"
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <WebView
            style={styles.video}
            javaScriptEnabled
            domStorageEnabled
            source={{ uri: "https://youtube.com/embed/-85jyla-gK4?si" }}
          />
        )}
        {/*gummie bears*/}
      </View>
            <View style={styles.videoContainer}>
        {Platform.OS === "web" ? (
          <iframe
            width="40%"
            height="400"
            src="https://youtube.com/embed/q8Phr6M29gY?si"
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <WebView
            style={styles.video}
            javaScriptEnabled
            domStorageEnabled
            source={{ uri: "https://youtube.com/embed/q8Phr6M29gY?si" }}
          />
        )}
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
    alignItems: "center",
  },
  video: {
    flex: 1,
    alignItems: "center",
  },
});