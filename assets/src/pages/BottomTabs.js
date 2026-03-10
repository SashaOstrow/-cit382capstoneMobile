import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import {Ionicons} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

//each function below represents a full screen in app that allow user switch between using bottom tabs

import Home from "./Home";
import Profiles from "./Profiles";
import CreatePage from "./CreatePage";
import Feed from "./Feed";


//the base of the app that defines the navigation structure
function BottomTabs({  user, setUser, 
  users, setUsers, 
  loginEmail, setLoginEmail, 
  loginPassword, setLoginPassword,
  posts, addPost, deletePost }) {
  return (
  <Tab.Navigator
    // allows you to customize all screens at once
    screenOptions={({ route }) => ({
      // hides the top header for all tabs
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        // this function determines which icon to show for each tab
        let iconName;

        if (route.name === "Home") iconName = focused ? "home" : "home-outline";
        else if (route.name === "Feed") iconName = focused ? "list" : "list-outline";
        else if (route.name === "Create") iconName = focused ? "add-circle" : "add-circle-outline";
        else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";

        // return the icon component for this tab
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#007AFF",
      tabBarInactiveTintColor: "gray",
    })}
  >
    {/* Define each tab screen */}
    <Tab.Screen name="Home">
      {() => <Home user={user} />}
    </Tab.Screen>

    <Tab.Screen name="Feed">
      {() => <Feed posts={posts} deletePost={deletePost}/>}
    </Tab.Screen>

    <Tab.Screen name="Create">
      {() =>
         <CreatePage
          user={user}
          setUser={setUser}
          users={users}
          setUsers={setUsers}
          addPost={addPost} 
         />}
    </Tab.Screen>

    <Tab.Screen name="Profile">
      {() => <Profiles user={user} setUser={setUser} posts={posts} onDeletePost={deletePost}/>}
    </Tab.Screen>

  </Tab.Navigator>
);
}
export default BottomTabs;