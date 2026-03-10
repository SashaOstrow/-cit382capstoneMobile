import React, { useState } from "react";
import {
  View, Text, TextInput, Button, StyleSheet,
  ScrollView, Pressable, Modal
} from "react-native";

function CreatePost({ user, setUser, users, setUsers, addPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const email = username.trim();
    const pass = password.trim();
    if (!email.includes("@") || !pass) {
      alert("Enter a valid email and password.");
      return;
    }
    const existingUser = users.find(
      (u) => u.email === email && u.password === pass
    );
    if (!existingUser) {
      alert("Invalid email or password");
      return;
    }
    setUser(existingUser);
    setModalVisible(false);
    setUsername("");
    setPassword("");
  };

  const handleRegister = () => {
    const email = username.trim();
    const pass = password.trim();
    if (!email.includes("@") || !pass) {
      alert("Please enter a valid email and password.");
      return;
    }
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      alert("User already exists.");
      return;
    }
    const name = email.split("@")[0];
    const newUser = { name, email, password: pass };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    setModalVisible(false);
    setUsername("");
    setPassword("");
  };

  const handleCreatePost = () => {
    if (!title || !content) {
      alert("Please fill in both fields.");
      return;
    }
    addPost({ title, body: content });
    setTitle("");
    setContent("");
    alert("Post Created!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Create Post</Text>

      {!user ? (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text>Please log in or make an account</Text>
          {/* Single button that OPENS the modal */}
          <Pressable
            style={[styles.button, { marginTop: 10 }]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Login / Register</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Post Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter title here"
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.label}>Post Content</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Write post here"
            value={content}
            onChangeText={setContent}
            multiline={true}
          />
          <Button title="Create Post" onPress={handleCreatePost} />
        </View>
      )}

      {/* Modal with Login AND Register buttons inside */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.sectionTitle}>Login / Register</Text>

            <TextInput
              placeholder="Email"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Login button calls handleLogin */}
            <Pressable style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            {/* Register button calls handleRegister */}
            <Pressable
              style={[styles.button, { backgroundColor: "green", marginTop: 10 }]}
              onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>

            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={{ marginTop: 10, textAlign: "center" }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

export default CreatePost;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    height: 120,
    marginBottom: 20,
    borderRadius: 5,
    textAlignVertical: "top",
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});