---
title: Adding Vue frontend to Firebase Functions API - Part 2
date: "2020-10-23T07:22:13+00:00"
---

This is a part 2 of the previous post for setting up Firebase Functions. I thought it would be good to have a frontend for our API. I'm very new to Vue JS so I've chosen to use Vue mainly as a way to learn it further myself. I'm not going to explain in detail about which part of Vue js does what, rather I'm just going to show you how to implement it. There are loads of really good introductions and how tos for Vue js if you want to look into it in more detail, I would recommend [Tania Rascia's overview and walkthrough](https://www.taniarascia.com/getting-started-with-vue/) (Vue 2). A good place to start is also the [Vue Introduction](https://vuejs.org/v2/guide/index.html). This is for Vue 2 but there's a drop down on the page where you can see the introduction for Vue 3.

### Installing Vue JS

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

### Display the notes

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

