# Todo-App

This is a small and simplified application, based on Node.js and MongoDB, that allows us to create a Todo List and save data in a database. The app allows us to type in a todo text in the form and then submit it so that the item appears on the UI and also gets saved in the database. The items listed can be either edited or deleted by the user.

## MongoDB Atlas 

MongoDB Atlas was used to host and manage our database in the cloud. The database name is 'myTodoApp' which contains a single collection named 'items'. Each document in the collection has two key-value pairs {_id: objectID, text: itemText}.

The server side is managed from the server.js file and the client side on the client.js file.

## Express 

Express is used to handle all the request routes.

## Axios

Axios is used to send asynchronous requests to the server, without sending a form. 

We used the unpkg CDN:
```
<script src="https://unpkg.com/axios/dist/axios.min.js"> </script>
```

Client-side rendering was implemented for avoiding the HTML code generated on the server to be duplicated on the browser. For that purpose, we added a script at the end of the HTML code like so:

```
<script> let items = ${JSON.stringify(items)} </script>
```
This will bring our raw data from the server to the browser.

## Security

A basic password protection was added to our app so that only our friends and family we really trust can use the app. 

## Authentication is required on all routes. 

You need a username and a password to use the App. 

For protecting our app from malicious hackers we installed the node package 'sanitize-html' to clean up and sanitize our text or input before we actually accepted into our database.

## Heroku

Finally we pushed our app up to the web by using Heroku.
