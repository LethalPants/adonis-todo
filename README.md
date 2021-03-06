[![LinkedIn][linkedin-shield]][linkedin-url]

## Project Screenshots

![Demo Gif][product-gif]


![Demo Screen Shot][product-screenshot]


<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

```sh
npm install
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/LethalPants/adonis-todo.git
```

2. Install NPM packages

```sh
npm install
cd client
npm install
```

3. Copy the `.env.example` file and rename to `.env` and add the following.

   ```
       HOST=127.0.0.1
       PORT=3333
       NODE_ENV=development
       APP_NAME=AdonisJs
       APP_URL=http://${HOST}:${PORT}
       CACHE_VIEWS=false
       APP_KEY=<Leave blank>
       DB_CONNECTION=pg
       DB_HOST=127.0.0.1
       DB_PORT=5432
       DB_USER=<POSTRES USERNAME>
       DB_PASSWORD=<POSTGRES PASSWORD>
       DB_DATABASE=todo-app
       HASH_DRIVER=bcrypt
   ```

4. Run `npm run dev`

Runs the app in the development mode.

Open http://localhost:3000 to view it in the browser. Whenever you modify any of the source files inside the `/src` folder,
the module bundler ([Webpack](http://webpack.github.io/)) will recompile the app on the fly and refresh all the connected browsers.


## API DOCS

All API requests are made to `/api/v1/`
| resource      | description                       |type                       |
|:--------------|:----------------------------------|:----------------------------------|
| `/users/register`      | adds a new user to the database return the user details with `jwt`| `POST` |
| `/users/login`    | returns object with user details and `jwt` | `POST` |
| `/users/logout` | removes auth token from the database | `POST` |
| `/todos`      | returns array of todos belonging to user | `GET` |
| `/todos/new`  | creates a new todo | `POST` |
| `/todos/:id` | edit existing todo | `PATCH` |
| `/todos/:id` | delete todo | `DELETE` |
 

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/hatim-murtuza/
[product-screenshot]: https://github.com/LethalPants/adonis-todo/blob/master/screenshot/dashboard.png
[product-gif]: https://github.com/LethalPants/adonis-todo/blob/master/screenshot/app-demo-final.gif
