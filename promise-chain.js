function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const user = { id: userId, name: "User " + userId };
        resolve(user);
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
}

function fetchUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const posts = ["Post 1", "Post 2", "Post 3"];
        resolve(posts);
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
}

function fetchPostComments(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const comments = ["Comment 1", "Comment 2"];
        resolve(comments);
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
}

// Refactored callback-based code to Promise-based code

console.log("Starting Promise chain...");

fetchUserData(1)
  .then((user) => {
    console.log("User:", user);
    return fetchUserPosts(user.id);
  })
  .then((posts) => {
    console.log("Posts:", posts);
    return fetchPostComments(posts[0]);
  })
  .then((comments) => {
    console.log("Comments:", comments);
    console.log("Promise chain completed successfully!");
  })
  .catch((error) => {
    console.error("Error in Promise chain:", error);
  });

console.log("Promise chain initiated. Waiting for results...");
