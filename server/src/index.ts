import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";

/* ROUTES */
import authRoute from "./routes/auth.route";
import usersRoute from "./routes/users.route";
import accommodationsRoute from "./routes/accommodations.route";
import myAccommodationsRoute from "./routes/my-accommodations.route";
import bookingsRoute from "./routes/bookings.route";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [process.env.CLIENT_URL!, process.env.PRODUCT_URL!],
    credentials: true
  })
);
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

app.use(cookieParser());

/* ROUTES */
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "hello from server endpoint" });
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/accommodations", accommodationsRoute);
app.use("/api/my-accommodations", myAccommodationsRoute);
app.use("/api/bookings", bookingsRoute);

const url = process.env.SERVER_URL!;

// const interval = 14 * 60 * 1000; // 14 minutes

// const reloadWebsite = () => {
//   const now = new Date();

//   const ukHour = new Intl.DateTimeFormat("en-GB", {
//     timeZone: "Europe/London",
//     hour: "numeric",
//     hour12: false
//   }).format(now);

//   const hour = parseInt(ukHour, 10);

//   if (hour >= 9 && hour < 21) {
//     axios
//       .get(url)
//       .then(() => {
//         console.log(
//           "✅ Pinged at",
//           now.toLocaleTimeString("en-GB", { timeZone: "Europe/London" })
//         );
//       })
//       .catch((error) => {
//         console.error("Ping error:", error.message);
//       });
//   } else {
//     console.log(
//       "Skipped ping at",
//       now.toLocaleTimeString("en-GB", { timeZone: "Europe/London" })
//     );
//   }
// };

// if (process.env.NODE_ENV === "production") {
//   reloadWebsite();
//   setInterval(reloadWebsite, interval);
// }

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
