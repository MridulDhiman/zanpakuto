## Zanpakuto
> Forge templates through scripts.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-zanpakuto using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo generator-zanpakuto
```

Then generate your new project:

```bash
yo zanpakuto
```



### Templates: 
-  Express hello world template
-  Express mongoose boilerplate.

### Utilities 
-  [Next.js app router](#nextjs-app-router)

## Usage:

### Next.js app router

1. Initialize next.js project with app router: 

```javascript
npm create-next-app@latest
```

2. Select utility option, after entering `yo zanpakuto`.
3. Initialize a `routes.json` file in the next.js project root directory in this way: 

```json
{
    "routes":
     [
        // normal routes
     {
        "path": "/signup",
        "name": "Signup"
     },
     {
        
        "path": "/login",
        "name": "Login"
     },
     {
      "path": "/dashboard",
      "name": "Dashboard"
     },

     // api routes
     {
      "path" : "/api/signup",
      "name": "Signup Route"
     },
     {
      "path" : "/api/login",
      "name": "Login Route"
     }
    ]
}
```

4. You can specify whether to use typescript and /src directory according to the project.

