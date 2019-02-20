---
title: Full Jam Stack Jam Part 1
date: "2019-02-20T07:53:00.000Z"
---

## Creating a JAMStack project with Netlify functions

I'm somewhat taken by the JAMStack and it's huge potential to seriously simplify the whole development process. My goal for this tutorial serious is to create a JAMStack application with a static front end using React hosted on Netlify. I'll take advantage of Netlify functions to access the serverless database FaunaDB. I'm basically writing these blog posts as I learn these specific technologies myself as I plan on using them on an upcoming project.

To start off we'll scaffold a simple interface using Create React App. So fire up your favourite terminal and type the following commands:

`create-react-app full-stack-jam`

`cd full-stack-jam`

Open up the repo in a code editor and lets make a quik UI with our app. I'm going to politely decline to build a todo app just for something different. Instead we'll create a favourite book app. This way we can have different access for logged in users and all users. Eventually the logged in users will be able to create and edit their own favourite books and all users will be able to view everyone's favourite books.

To start with open up the App.js file and modify it so it looks like the code below:

```javascript
import React, { Component } from 'react'

const createBook = (title, author, userName) => {
  return {
    title,
    author,
    user: userName,
  }
}

const booksData = [
  createBook('Moby Dick', 'Herman Melville', 'luvbooks'),
  createBook('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 'magicman'),
  createBook('Three Men in a Boat', 'Jerome K. Jerome', 'luvbooks'),
  createBook('Magician', ' Raymond E. Feist', 'magicman'),
  createBook('To Kill a Mockingbird', 'Harper Lee', 'atticus60'),
]

// We'll use a function to return books from where ever we get them from.
// In this case it is from the hard coded 'booksData' object above but will eventually
// come from a Netlify function
const getBooksData = () => {
  return booksData
}

class App extends Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    const books = getBooksData()
    this.setState({ books })
  }
  
  render() {
    const { books } = this.state

    return (
      <div style={{ 
        maxWidth: '500px',
        margin: 'auto',
      }}>
        {books && books.map((book) => (
          <div>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p><i>{book.user}</i></p>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

export default App;

```

All we've done here is create a simple books data object and used the getBooksData function to bring it into our app state. I've created a function createBook for the book objects, I find this a good way to create objects as we get the advantage of IDE features such as intellisense for the createBook arguments and cleaner code in general. Using a factory function like this can also allow for future data checks or modifications needed for each object.

I won't add too much styling to this app so that we stay focused on the tech we're learning, however I have added some width and alignment to the containing div just so it's a bit easier on the eye.