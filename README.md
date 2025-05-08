# Promise Chain Demonstration

## Overview

This project demonstrates the refactoring of callback-based asynchronous code to Promise-based code with proper chaining. It simulates API calls to fetch user data, posts, and comments with artificial delays.

## Features

- Conversion of callback-based functions to Promise-based functions
- Implementation of Promise chaining with `.then()`
- Proper error handling throughout the Promise chain
- Simulated asynchronous operations using `setTimeout()`

## Code Structure

- `promise-chain.js` - Contains the Promise-based implementation of the data fetching functions

## Running the Project

To run the demonstration:

```bash
node promise-chain.js
```

## Expected Output

The script will produce the following output with delays between each step:

```
Starting Promise chain...
Promise chain initiated. Waiting for results...
User: { id: 1, name: 'User 1' }
Posts: [ 'Post 1', 'Post 2', 'Post 3' ]
Comments: [ 'Comment 1', 'Comment 2' ]
Promise chain completed successfully!
```

## Implementation Details

### Promise-based Functions

The project converts three callback-based functions to Promise-based equivalents:

1. `fetchUserData(userId)` - Returns a Promise that resolves with user data
2. `fetchUserPosts(userId)` - Returns a Promise that resolves with a list of posts
3. `fetchPostComments(postId)` - Returns a Promise that resolves with a list of comments

### Promise Chaining

The implementation demonstrates proper Promise chaining by:

1. Calling `fetchUserData` first
2. Using the user ID to fetch posts with `fetchUserPosts`
3. Using the first post to fetch comments with `fetchPostComments`

### Error Handling

Each Promise includes proper error handling with:

- Try/catch blocks within the Promise executors
- A `.catch()` handler at the end of the Promise chain

## Benefits of Promise Chaining

- Avoids callback hell (deeply nested callbacks)
- Provides cleaner, more readable code
- Enables better error propagation and handling
- Creates a clear flow of asynchronous operations
