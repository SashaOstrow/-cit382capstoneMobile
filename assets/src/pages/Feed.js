import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";

function Feed ({posts =[], onVote}) {

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Community Feed</Text>

            {/* If posts don't exist */}
            {posts.length === 0 ? (
                <Text>No posts yet</Text>
            ):(
                //lopp through every post
                posts.map((post) => (
                    <View key={post.id} style={styles.postCard}>

                        {/* Post Title */}
                        <Text style={styles.title}>{post.title}</Text>

                         {/* Author */}
                         <Text style={styles.author}> Posted by: {post.author}  </Text>

                        {/* Date */}
                        <Text style={styles.date}>
                            {new Date(post.date).toLocaleDateString()}
                        </Text>

                        {/* Post Content */}
                        <Text style={styles.body}>{post.body}</Text>

                        {/* Voting Section */}
                        <View style={styles.voteContainer}>
                            <Pressable style={styles.voteButton} onPress={() => onVote(post.id, 1)}>
                                <Text>⬆️</Text>
                            </Pressable>

                            <Text style={styles.voteCount}>{post.votes}</Text>

                            <Pressable styles={styles.voteButton} onPress={() => onVote(post.id, -1)}>
                                <Text>⬇️</Text>
                            </Pressable>
                        </View>

                    </View>
                )
            )
            )}
        </ScrollView>
    )
}

export default Feed;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20
  },

  postCard: {
    backgroundColor: "#f4f4f4",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8
  },

  title: {
    fontSize: 18,
    fontWeight: "bold"
  },

  author: {
    fontSize: 14,
    color: "gray",
    marginTop: 5
  },

  date: {
    fontSize: 12,
    color: "gray",
    marginBottom: 10
  },

  body: {
    marginBottom: 10
  },

  voteContainer: {
    flexDirection: "row",
    alignItems: "center"
  },

  voteButton: {
    padding: 8
  },

  voteCount: {
    marginHorizontal: 10,
    fontWeight: "bold"
  }

});