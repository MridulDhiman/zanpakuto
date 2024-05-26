## Zanpakuto

> Forge templates through scripts.

## Installation

```bash
npm install -g yo generator-zanpakuto
```

Then generate your new project:

```bash
yo zanpakuto
```

### Templates:

- Express hello world template
- Express mongoose boilerplate.

### Utilities

- [Next.js app router](#nextjs-app-router)

## Usage:

### Next.js app router

#### Features:

1. Metadata configuration.
2. TypeScript Support.
3. App router with '/src' directory support.

#### Steps:

1. Initialize next.js project with app router:

```javascript
npm create-next-app@latest
```

2. Select utility option, after entering `yo zanpakuto`.
3. Initialize a `routes.json` file in the next.js project root directory in this way:

```json
{
  "routes": [
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
    {
      "path": "/api/signup",
      "name": "Signup Route"
    },
    {
      "path": "/api/login",
      "name": "Login Route"
    }
  ]
}
```

4. You can specify whether to use typescript and /src directory according to the project.

## API Reference




## Thank You

You can star the repository, if you like my work.
Contact me at: dhimanmridul91@gmail.com.
