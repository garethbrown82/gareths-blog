---
title: Adding Vue frontend to Firebase Functions API - Part 2
date: "2020-10-23T07:22:13+00:00"
---

This is a part 2 of the previous post for setting up Firebase Functions. I thought it would be good to have a frontend for our API. I'm very new to Vue JS so I've chosen to use Vue mainly as a way to learn it further myself. I'm not going to explain in detail about which part of Vue js does what, rather I'm just going to show you how to implement it. There are loads of really good introductions and how tos for Vue js if you want to look into it in more detail, I would recommend [Tania Rascia's overview and walkthrough](https://www.taniarascia.com/getting-started-with-vue/) (Vue 2). A good place to start is also the [Vue Introduction](https://vuejs.org/v2/guide/index.html). This is for Vue 2 but there's a drop down on the page where you can see the introduction for Vue 3.

## Installing Vue JS

First we need to install Vue on in our project. Make sure you're a level up from your the root of your project directory. The Vue CLI can be used to create a whole new Vue project but can also add Vue to an existing project, which is what we're going to do.

Run the following to install vue into the current project folder, make sure the folder name matches exactly otherwise a new folder and project will be created. Make sure to select the 'Merge' option so that your project is not overwritten.
```
vue create notes-editor
```

I was given the option to select Vue 2 or Try Vue 3, I'm going to dive into Vue 3 which I'll use for the rest of this tutorial.

Ok this is installed and ready to go. You can see the default Vue app by running:

```
npm run serve
```

![Vue default app](./assets/vue_default_app.png)

## Display the notes

The first bit of UI we'll work on is displaying a list of all the notes we have saved. Create a directory named `components` and a file inside named `components/NotesList.vue`. We'll just add some placeholder text here for the moment.

### **`NotesList.vue`**
```vue
<template>
  <p>Notes go here...</p>
</template>

<script>
export default {
  
}
</script>

<style scoped>

</style>
```

Then render this component in the main `App.vue` file by replacing the `HelloWorld.vue` component with your `NotesList.vue` component.
You can see that I've also deleted the default image.

### **`App.vue`**
```vue
<template>
  <NotesList />
</template>

<script>
import NotesList from './components/NotesList.vue'

export default {
  name: 'App',
  components: {
    NotesList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

Once you've done this just go ahead and delete the now redundant `HelloWorld.vue` file. If you reload the browser now you should see a white screen with the words 'Notes go here...'.

![Browser screenshot](./assets/notes_go_here.png)

Now we'll hard code a list of notes in our component using the composition API by setting `notes` as a reactive variable. I'm primarily a React developer so if you're familiar with React then setting a variable using `ref()` is basically the same as component state in React. To render these notes to the UI we can using the Vue `v-for` directive which will loop through the array of notes and display each one.

### **`NotesList.vue`**
```vue
<template>
  <h1>Notes</h1>
  <!-- Render the array of notes using v-for directive just like a for loop -->
  <div v-for="note in notes" v-bind:key="note.title">
    <h3>{{ note.title }}</h3>
    <p>{{ note.text }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  // Using the composition API to set our component variables
  setup() {
    let notes = ref([
      { title: 'Shopping List', text: 'Tomatoes, Milk, Salt' },
      { title: 'Book', text: 'Name of the wind' },
      { title: 'Note', text: 'This is a note' },
    ]);
    
    return {
      notes,
    };
  }
}
</script>

<style scoped>

</style>
```

Modify the `App.vue` file to add a wrapper `div` with some minor styling so the notes are displayed nicely.

### **`App.vue`**
```vue
<template>
  <div class="wrapper">
    <NotesList />
  </div>
</template>

<script>
import NotesList from './components/NotesList.vue'

export default {
  name: 'App',
  components: {
    NotesList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.wrapper {
  width: 40%;
  margin: auto;
  display: flex;
  flex-direction: column;
}
</style>

```

## Run Vue with Firebase emulator

To develop and test this locally we'll need to run Vue alongside the Firebase emulator so that Vue can make requests to our Firebase functions. At the moment even if you just try to run them separately they both try to run on port `8080` so you'll only be able to run one at a time. Let's fix this now.

Change the Firebase emulator to run on a different port, I had to change mine to port `8082`.

### **`firebase.json`**
```jsonc
{
  "functions": {
    "predeploy": [
      "npm --prefix \"$RESOURCE_DIR\" run lint"
    ],
    "source": "functions"
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  // Add this to chance the port number the Firebase emulator will run on
  "emulators": {
    "firestore": {
      "port": 8082
    }
  }
}
```

Then in the `scripts` section of your `package.json` file add the follow script to be ran using `npm start`.

### **`package.json`**
```jsonc
"scripts": {
  // Add the line below to run the Vue server and Firebase emulator concurrently
    "start": "npm run serve & firebase emulators:start --import=firestore_data",
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
```

Now try running Vue and the Firebase emulator concurrently in your terminal, run this from the root of your project directory.

```
npm start
```

## Get notes from Firestore

In part 1 of this tutorial we added some notes to Firestore and create a Firebase function that would get the notes from Firestore and return them to us. If you go to your Firebase emulator logs tab (mine is at http://localhost:4000/logs) you'll see the endpoint for this get request.

![Endpoint in Firebase logs](./assets/firebase_logs.png).

We're going to setup our Vue app so that we populate the note by getting them from this endpoint. It's common to use axios for this, so that's what we'll do. Install axios using the following:

```
npm install axios
```

Then in your `NotesList.vue` file change to script to request notes from your endpoint using axios. We'll do this in the `onMounted` lifecycle hook which is call when the component is mounted. Remember you can find your `notes` endpoint in the logs we discussed above.

### **`NotesList.vue`**
```vue
<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  // Using the composition API to set our component variables
  setup() {
    let notes = ref([]);

    onMounted(() => {
      // Your enpoint will be different to this so make sure to find it in your Firebase emulator logs
      axios
        .get('http://localhost:5001/notes-editor-c330b/us-central1/notes')
        .then((notesResult) => {
          notes.value = notesResult.data;
        });
    });
    
    return {
      notes,
    };
  }
}
</script>
```

Make sure your servers are running with `npm start` and reload your Vue app in the browser (http://localhost:8080/). At this point you will not see any notes and possibly wonder why! Well you just got CORS'd! Open the browser console and you'll see the following error:

```
Access to XMLHttpRequest at 'http://localhost:5001/notes-editor-c330b/us-central1/notes' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

This is becuase our Firebase function enpoint has not specified an `Access-Control-Allow-Origin` header indicating which client may call it. We'll need to modify the code in our function to allow our client to call it.
