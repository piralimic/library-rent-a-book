# GraphQheLl Library (Back-End project)
- Type of challenge: GraphQL Learning
- Deadline : Beginning 2020
- Team : Serge Bayet & Michaël Pirali

## Live Demo on glitch.com
GraphQL Playground : https://dev-to-library-graphql.glitch.me/graphql

### 1. Create a user account
```graphql
mutation{
  createUser(name:"YourName",email:"YourEmailAddress",password:"YourPassword"){
    id
    name
    email
    password
  }
}
```

### 2. Login
```graphql
query{
  login(email:"YourEmailAddress",password:"YourPassword"){
    token
  }
}
```

### 3. Add the token into the HTTP HEADERS
> HTTP HEADERS is on the left-bottom of the Playground Screen

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDkxZmZmMTVjNjFjMTMxY2IzZjY5OCIsImlhdCI6MTU3ODA2MzM1MiwiZXhwIjoxNTc4MDc1MzUyfQ.mABeouiv_PbiLXFMHAB8jGw8XS0HxkiVxA9tTokoI3c"
}
```

### 4. Query Example
> See the DOCS and SCHEMA on the rigth-side of the Playground Screen to get all the queries examples
```graphql
query{
  books{
    id
    title
    author
    available
  }
}
```

## Objectives
Create GraphQL API with MongoDB to manage a Library (books renting) :
- manage books informations
- manage users informations
- users authentication
- users should :
  - rent (max) 5 books/month
  - post comments about the books
  - add (5 stars) evaluation to the books

## Tools and References
- Node.js
- Express
- Apollo Server
- GraphQL
- MongoDB
- Mongoose
- Glitch.com
- JWT (authentication token)
