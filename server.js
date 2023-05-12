import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import csrf from 'csurf';

// Set up csrf protection
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// import routes
import authRouter from './routes/authRouter.js';
import protectedRouter from './routes/protectedRouter.js';

// create express app
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// middleware
const csrfProtection = csrf({ cookie: true });
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use(limiter);
app.use(morgan('common'));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://cdn.example.com'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// routes
app.get('/', (_, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('/auth', csrfProtection, authRouter);
app.use('/protected', csrfProtection, protectedRouter);

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((error) =>
    console.log('Error connecting to MongoDB: ', error.message)
  );
