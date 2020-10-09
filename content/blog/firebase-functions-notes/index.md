---
title: Building a notes API with Firebase Functions
date: "2020-10-08T08:54:01+0000"
---

I've been a big fan of Firebase for a while and have now used it in a number of project. I've even put together a [video course about it with Manning](https://www.manning.com/livevideo/building-web-applications-with-firebase)

However it's only recently that I've started to use Firebase Cloud Functions. A way to easily develop and deploy cloud functions on the Firebase platform with seemless integration into other Firebase services such as Firestore and the Firebase Local Emulator Suite.

In this tutorial blog post I want to create an API endpoint using Cloud Funcitons where we can create and get notes from Firestore. We'll also develop this functionality using the Firebase Local Emulator Suite.

I'm going to assume some basic knowledge of Firebase here but with some reference to Firebase docs you'll still be able to follow this post. I'm just not going to go into details about all the Firebase concepts covered.

### Create a Firebase Project

Add a new project from the [Firebase Console](https://console.firebase.google.com/) and give it a name. I've call mine Notes Editor.

![Project name](./assets/project_name.png)

There'll be a question about Google Analytics, whether you decide to add it or not is up to you. Then click to create your project.

Now that the project is setup we won't need to refer to the Firebase console very much for the rest of this post.

### Node and Firebase CLI

You will need to make sure Node is installed and also the [Firebase CLI](https://firebase.google.com/docs/cli?#setup_update_cli). If node is aready installed you can install the Firebase CLI with `npm install -g firebase-tools`.

Once Firebase CLI is installed make sure you are logged in using `firebase login`. This is so the CLI knows who Firebase account you actually want the CLI to interact with.

### Create the project

Start by creating a directory to house your project with `mkdir notes-editor` then navigate to it with `cd notes-editor`.

Now that we're in the project directories root we can initialise this as a Firebase project. Use the Firebase CLI to do this by running:

```
firebase init functions
```
You'll be asked a few questions. First we need to specify which Firebase project we want to associate with the project we're initialising. Select the option to **Use an existing project** and then choose the project you've just created in the Firebase console named Notes Editor. You'll just see the Project ID which for me reads as `notes-editor-c330b`.

Next you'll be asked what language you want to use, either JavaScript or TypeScript. I'm going to keep it simple and select JavaScript. I've also selected to use ESLint and specified that I **want to install dependencies with npm now**. Otherwise you'll have to install them later with `npm install` anyway.

Now we wait while Firebase CLI does its thing and NPM dependencies get installed. Once completed you should see a message indicating that Firebase initilization is complete.

![Firebase initilization complete](./assets/initilization_complete.png)

Spend a few minutes having a look at the files and directories that have been created. I won't go over the details of what each do but you should note that you now have a `/functions` folder. This is where all your cloud function code is going to live.

I do want to draw your attention to one detail in the `package.json` file inside the functions directory. You will see that the node version is set to 10.
```
"engines": {
  "node": "10"
},
```

This is the recommended version and will all work fine, unless you want to deploy your functions to Firebase using the free Spark plan. The free Spark plan only support Node 8, which was deprecated on June 8th 2020. Firebase will halt execution of these function after March 15, 2021. It's hard to know what will happen regarding running Cloud Functions on Firebase using the free Spark plan but you might need to bite the bullet and upgrade to the pay as you go Blaze plan.

We'll leave this as Node 10 for now as we're only going to be running this locally using the Firebase Local Emulator Suite.


### Running functions locally

If you have a look at `/functions/index.js` you'll see that there's already a `helloWorld` function for us to use that's commented out. Uncomment the function so we can run it and see what happens.
```js
const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
```

We can now try this by running Emulator Suite using the Firebase CLI from the root of our project directory.

```
firebase emulators:start
```

You can see the URL of the Emulator Suite dashboard in the console. Mine is running at http://localhost:4000 so I'll open this in my browswer.

![Emulator Suite URL](./assets/emulator_console.png)

Once it's running navigate to the URL and you should be on the Emulator's overview page.

![Emulator Suite overview](./assets/emulator_dashboard.png)

Navigate to the Logs tab, this will give you the output you need to find out where your functions are running and the URL to send your http request to. You can see below that the hello world function for me is running at http://localhost:5001/notes-editor-c330b/us-central1/helloWorld.

![Emulator logs](./assets/emulator_logs.png)

As this is a get request you can just paste the URL in your browser and you'll see the respone.

![Hello world response](helloworld_response)

Woo hoo! Looks like that worked perfectly :)


















### References

Here's some links to documentations that I've used and reference material for this post. I'd recommend you looking at them if you want to know more about the Firebase concepts I've discussed in this post.

[Get started with Cloud Functions](https://firebase.google.com/docs/functions/get-started)

This is the first place I would go to as a starting point for Firebase Cloud Functions and was referenced heavily for the initial setup phase of this post.


[Understand Firebase Projects](https://firebase.google.com/docs/projects/learn-more)

A great reference for what a Firebase project is and how it relates to projects on the Google Cloud Platform. Namely that they are the **same thing!**

[Firebase CLI](https://firebase.google.com/docs/cli?#setup_update_cli)

The CLI you need for all things Firebase.



