import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import {Ionicons} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

//each function below represents a full screen in app that allow user switch between using bottom tabs

import Home from "./Home";
import Profiles from "./Profiles";

function CreateScreen (){
  return(
    <View>
      <Text>
        Create Post Screen
      </Text>
    </View>
  );
}

function FeedScreen() {
  return(
    <View>
      <Text>
        Feed Screen
      </Text>
    </View>
  );
}



//the base of the app that defines the navigation structure
function BottomTabs() {
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
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Feed" component={FeedScreen} />
    <Tab.Screen name="Create" component={CreateScreen} />
    <Tab.Screen name="Profile" component={Profiles} />
  </Tab.Navigator>
);
}
export default BottomTabs;