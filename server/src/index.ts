import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";

import authRoute from "./routes/auth.route";
import usersRoute from "./routes/users.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.use(cookieParser());

/* ROUTES */
app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "hello from server endpoint" });
});

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
