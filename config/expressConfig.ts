import dotenv from "dotenv";
import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import UserRouter from "../src/domains/Users/controllers/index";
import MusicRouter from "../src/domains/Musics/controllers/index";
import ArtistRouter from "../src/domains/Artists/controllers/index";

dotenv.config();

export const app: Express = express();

const options : CorsOptions = {
	credentials: true,
	origin: process.env.APP_URL
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.use("/api/users", UserRouter);
app.use("/api/musics", MusicRouter);
app.use("/api/artist", ArtistRouter);


export default app;
