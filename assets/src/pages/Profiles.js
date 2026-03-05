import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";

function Profile ({ navigation, user, posts, onDeletePost }) {
    //get the logged-in user's name
    const myName = user?.name;
    //filter posts that belong to the logged-in user
    const myPosts = myName ? posts.filter((p) => p?.author === myName) : [];

    //Placeholder stats
    const following = 0;
    const followers = 0;

    return (
        //scrollView allows the whole page to scroll vertically
        <ScrollView contentContainerStyle={styles.container}>
            {/*Card container for the profile info */}
            <View style={styles.profileCard}>
                <Text style={styles.greeting}> Hello {myName ?? "Guest"}</Text>

                {/*Profile statistics: Posts / Following / Followers */}
                {/*Posts */}
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{myPosts.length}</Text>
                        <Text>Posts</Text>
                    </View>
                {/*Following */}
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{following}</Text>
                        <Text>Following</Text>
                    </View>
                {/* Followers */}
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{followers}</Text>
                        <Text>Followers</Text>
                    </View>
                </View>
                {/* Section title for posts */}
                <Text style={styles.sectionTitle}>Posts</Text>

                {/* renders depending on user login and posts
                
                condition ? resultIfTrue : resultIfFalse*/}
                {! user ? (
                    <Text>Login to see posts</Text>
                    // if the user is logged in, reactmoves to the next condition
                ) : myPosts.length === 0 ? (
                    <Text>No posts yet.</Text>
                ) : (
                    //Map through the user's posts and display them
                    <View style={styles.postsContainer}>
                    {myPosts.map((p) => (
                        <View key={p.id} style={styles.postCard}>
                            {/*button for navigating to post details */}
                            <Pressable onPress={() => navigation.navigate("PostDetail", {postId: p.id})}>
                                <Text style={styles.postTitle}>{p.title}</Text>
                            </Pressable>
                        
                         {/* Post body */}
                         <Text style={styles.postBody}>{p.body}</Text>

                         {/* Buttons for Edit and Delete */}
                         <View style={styles.postButtons}>

                        {/* Edit button navigates to the post detail screen with edit mode */}
                        <Pressable onPress={() =>
                            navigation.navigate("PostDetail", {postId : p.id, edit: true})
                        }
                        style={styles.button}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </Pressable>

                             {/* Delete button calls the onDeletePost function */}
                            <Pressable
                            onPress={() => onDeletePost(p.id)}
                            style={[styles.button, {marginLeft: 8}]}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </Pressable>  

                         </View>
              </View>
            ))}
          </View>
        )}

      </View>
    </ScrollView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  profileCard: {
    width: "100%",
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  postsContainer: {
    width: "100%",
  },
  postCard: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postBody: {
    marginTop: 5,
  },
  postButtons: {
    flexDirection: "row",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});