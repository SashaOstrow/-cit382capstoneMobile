import React, { useState, useEffect } from "react";
//app imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

//import Home from "./pages/Home";
/*import AppNavBar from "./pages/AppNavBar";
import PopUp from "./pages/PopUp";
import ListView from "./pages/ListView";
import NewPost from "./pages/NewPost";
import DetailView from "./pages/DetailView";
import Profile from "./pages/profiles";
*/
import BottomTabs from "./assets/src/pages/BottomTabs";

import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
function App() {
  //initializing state
const [users, setUsers] = useState([]);
const [user, setUser] = useState(null);
const [posts, setPosts] = useState([]);

//useEffect runs things like network, storage, timers
useEffect(() => {
  //async allows us to use await inside loadDats
  const loadData = async () => {
    //catches any errors when readinh from AsyncStorage
    try {
      //AsyncStorage.getItem(key) retrieves a value stored on the device under that key
      //await waits for the promise to finish before moving on aka "pause here until we get results"
      //each call truns a string or null if nothing is stored
      const savedUsers = await AsyncStorage.getItem("users");
      const savedPosts = await AsyncStorage.getItem("posts");
      const savedCurrentUser = await AsyncStorage.getItem("currentUser");
      
      //AsyncStorage stores eveything as a string, JSON converts the string back to a JS object or array
      //then, setUser, setPosts, setUser update your React state with the stored data
      if (savedUsers) setUsers(JSON.parse(savedUsers));
      if (savedPosts) setPosts(JSON.parse(savedPosts));
      if (savedCurrentUser) setUser(JSON.parse(savedCurrentUser));

    } catch (error) {
      console.log("Error loading data:", error);
    }

    };
    loadData();
    //[] meams run effect once
  }, [] );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [showPopUp, setShowPopUp] = useState(false);
  const Stack = createNativeStackNavigator();


  useEffect(() => {
    const savePosts = async () => {
      try {
        await AsyncStorage.setItem("posts", JSON.stringify(posts));
      } catch (error) {
        console.log("Error saving posts:", error);
        }
      };
    savePosts();
    }, [posts]);

  const isLoggedIn = Boolean(user);

  //this useEffect runs whenever the logged-in user changes.
  //if a user exists, save as "currentUser"
  //if user becomes null (logout), romove from localStorage
  useEffect(() => {
    const saveUser = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem("currentUser", JSON.stringify(user));
        }else{
          await AsyncStorage.removeItem("currentUser");
        }
      } catch (error) {
        console.log("Error saving currentUser:", error);
        }
      };
      saveUser();
    }, [user]);

  // Whenever the list of all registered users changes, save it to localStorage
  useEffect(() => {
    const saveUsers = async () => {
      try{
        await AsyncStorage.setItem("users", JSON.stringify(users));
      }catch (error){
        console.log("Error saving users:", error);
      }
      };
    saveUsers();
  }, [users]);


  function handleRegister() {
    const email = loginEmail.trim();
    const password = loginPassword.trim();

    //runs to make sure email and password are not empty
    if (!email.includes("@") || !password) {
      alert("Please enter a valid email and password.");
      return; //stop function if invalid
    }

    //check if a user with this eamil alreadu exists
    //.find() searches through the array and returns the first element that matches a condition if not element matches, it returns undefined
    // (u) => u.email === email
    //'u' is just a placeholder variable representing each user object in the array as .find() loops over it
    // " for each user in the array, check if u.email equals the email trying to register"
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      alert("User already exists.");
      return;
    }

    //Extract name from email (everything before @)
    const name = email.split("@")[0];

    //create new user object
    const newUser = {
      email,
      password,
      name,
    };

    //add the new user to the users array
    setUsers((prevUsers) => [...prevUsers, newUser]);

    //automatically logs user in after registering
    setUser(newUser);
    setLoginEmail("");
    setLoginPassword("");
  }

  function handleLogin() {
    const email = loginEmail.trim();
    const password = loginPassword.trim();
    if (!email.includes("@") || !password) {
      alert("Enter a valid email and password.");
      return;
    }

    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!existingUser) {
      alert("Invalid email or password");
      return;
    }

    setUser(existingUser);
    setShowPopUp(false);
    setLoginEmail("");
    setLoginPassword("");
  }

  function addPost({ title, body, link, image }) {
    const author = user?.name ?? "Guest";

    const newPost = {
      id: Date.now(),
      title,
      body,
      author,
      link,
      image,
    };

    setPosts((prev) => [...prev, newPost]);
  }

  function deletePost(id) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  function handleLogout() {
    //setting user to null logs them out
    setUser(null);
  }

  function Home() { return <Text>Home</Text> }
  function ListView() { return <Text>Feed</Text> }
  function Profile() { return <Text>Profile</Text> }

  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
   
}


//styles
const styles = StyleSheet.create({
  popupBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: 250,
  }
})
export default App;
