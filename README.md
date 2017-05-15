# mini-pastebin

[A project for LiftLabs]

A small clone of pastebin [Node.js + ES6 + MongoDB]

This is a RESTful API that supports the following operations:

- GET /paste/:author
  Get all pastes by author name
- POST /paste/:author
  Create a new paste with author name
- DETELE /paste/:id
  Delete a paste by its unique id
- PATCH /paste/:id
  Modify a paste by its unique id
  
Extra feature ("easter egg"):

- GET /git-pun
  Get a random git joke (they are all terrible)
