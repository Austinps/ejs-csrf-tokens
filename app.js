import express from "express";
import csrf from "csurf";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRouter from "./routes/authRouter.js";
import protectedRouter from "./routes/protectedRouter.js";
import { helmetOptions } from "./config/helmet.js";
import { corsOptions } from "./config/cors.js";
import { rateLimitOptions } from "./config/ratelimter.js";
import { setLocalToken } from "./middleware/csrf.js";

const app = express();
const csrfProtection = csrf({ cookie: true });
const limiter = rateLimit(rateLimitOptions);

app.use(setLocalToken);
app.use(limiter);
app.use(morgan("common"));
app.use(helmet(helmetOptions));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/auth", csrfProtection, authRouter);
app.use("/protected", csrfProtection, protectedRouter);

export default app;
