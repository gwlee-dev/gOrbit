import express from "express";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 8080;

app.set("view engine", "pug");
app.set("views", process.cwd() + "/server/views");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static("dist"));
app.use("/data", express.static("server/data"));

const rootRouter = express.Router();
const controller = async (req, res) => res.render("index");
rootRouter.get("/", controller);
app.use("/", rootRouter);

app.listen(
    PORT,
    console.log(
        `\n\n\n===============================\nServer Listening on: http://localhost:${PORT}`
    )
);
