import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";


/*
  LoginForm
  -----------
  Responsibility:
  - Collect username + password from the user
  - Manage local form state
  - Notify the parent (App) when the user submits the form
  - only username/password lives in here

  It does NOT:
  - Decide what "logged in" means
  - Store global auth state
  - Control the popup visibility
*/


function LoginForm( {onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  function handleLogin() {
    onLogin(username, password);
  }
return (
<View style={styles.container}>
    <TextInput 
    value={username}
    onChangeText={setUsername}
    placeholder="username"
    style={styles.input}
        />
    <TextInput
    value={password}
    onChangeText={setPassword}
    placeholder="password"
    secureTextEntry={true}
    style={styles.input}
    />
    <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text></Pressable>

</View>
    )
}

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});