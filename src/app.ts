import express, { Request, Response, NextFunction } from "express"
import helmet from "helmet";
import morgan from "morgan";
import hpp from 'hpp';
import errorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import trackRouter from "./routes/trackRouter.js";
import scoreboardRouter from "./routes/scoreboardRouter.js";
import authRouter from "./routes/authRouter.js";
import passport from "passport";
import { passportGoogle20, passportJWT } from "./controllers/authController.js";
import cookieParser from "cookie-parser"
import userRouter from "./routes/userRouter.js";
import config from "./config.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'Example API with Swagger and Express',
    },
  },
  // Point to the API docs in your source code
  apis: ['./src/routes/*.ts'], // adjust the path to your routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.options("*", cors())
if (config.nodeEnv === "development") 
    app.use(morgan("tiny"));

const corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions));

// Parsers
//

app.use(express.json());
app.use(cookieParser());
//Security
//HTTP response headers
app.use(helmet());
//Parameter pollution
app.use(hpp());
//Sanitize user query from cross stie script atacck
//mongoDB sanitazer
app.use(ExpressMongoSanitize());
//serving static files
app.use(express.static('public'));


app.use(passport.initialize());
passport.use(passportJWT);
passport.use(passportGoogle20);
//Routers
app.use("/api/user", userRouter);
app.use("/api/track", trackRouter);
app.use("/api/scoreboard", scoreboardRouter);
app.use("/auth", authRouter );
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});
// Handling 404 routers
app.all("*", (req:Request, res:Response, next:NextFunction) => {
 return next(new AppError(`Geopuzzle nie znalazło takiego endpointu: ${req.url}`, 404));
});

//Global Error Handler
app.use(errorHandler);
export default app;