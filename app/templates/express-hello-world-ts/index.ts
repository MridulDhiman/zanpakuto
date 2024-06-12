const express, { Express, IncomingMessage, ServerResponse } = require("express");

const app : Express = express();

app.get("/", (req: IncomingMessage, res: ServerResponse) => {

});

app.listen(3000, () => {
    console.log(`Server is listening on port ${3000}`);
})