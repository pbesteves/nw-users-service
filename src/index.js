import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// DB
import makeConnection from "@/db/makeConnection";
import User from "@/db/models/userModel";
import Token from "@/db/models/tokenModel";

// Handlers
import addUserHandler from "@/handlers/addUserHandler";
import confirmationHandler from "@/handlers/confirmationHandler";

// Middlewares
import createToken from "@/middlewares/createToken";
import dispatchMail from "@/middlewares/dispatchMail";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(createToken);
app.use(dispatchMail);

app.route("/api/v1/users").get((req, res) => res.send("Get users route"));

app.post("/api/v1/users/signup", async (req, res) => {
  res.json(
    await addUserHandler(
      req.body,
      makeConnection,
      User,
      req.tokenComponent,
      req.emailComponent
    )
  );
});

app.post("/api/v1/users/confirmation", async (req, res) => {
  res.json(await confirmationHandler(req.body, makeConnection, User, Token));
});

app.listen(process.env.PORT, () => {
  console.log(`Running on http://localhost:${process.env.PORT}`);
});
