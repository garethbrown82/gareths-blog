---
title: Adding Vue frontend to Firebase Functions API - Part 2
date: "2020-10-23T07:22:13+00:00"
---

This is a part 2 of the previous post for setting up Firebase Functions. I thought it would be good to have a frontend for our API. I'm very new to Vue JS so I've chosen to use Vue mainly as a way to learn it further myself.

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

![Vue default app](../assets/vue_default_app.png)