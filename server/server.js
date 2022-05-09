import express from "express";
import morgan from "morgan";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 8011;
let apiIsOn = true;
let apiStatus = 200;

app.set("view engine", "pug");
app.set("views", process.cwd() + "/server/views");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static("dist"));

const fakeDB = () => {
    const dataFile = fs.readFileSync(
        process.cwd() + "/server/data/fake.json",
        "utf-8"
    );
    const dataJson = JSON.parse(dataFile);
    const innerData = dataJson.serviceData;
    const range = innerData.length + 1;
    const target = Math.floor(Math.random() * range);
    innerData.splice(target, 10);
    innerData.forEach((obj) => {
        Object.keys(obj).forEach((field) => {
            if (field != "name" && field != "server" && field != "execCnt") {
                const randInt = Math.floor(Math.random() * 3);
                if (randInt == 1) {
                    obj[field] = "CRITICAL";
                }
                if (randInt == 2) {
                    obj[field] = "WARN";
                }
                if (randInt == 3) {
                    obj[field] = "NORMAL";
                }
            }
            if (field == "execCnt") {
                const randInt = Math.floor(Math.random() * 100);
                obj[field] = randInt;
            }
        });
    });
    const editedData = {
        serviceData: innerData,
    };
    return editedData;
};

const apiController = async (req, res) => {
    if (apiIsOn) {
        res.json(fakeDB());
    } else {
        res.status(apiStatus);
        res.end();
    }
};

const apiOn = async (req, res) => {
    apiIsOn = true;
    res.status(200);
    res.end();
};

const apiOff = async (req, res) => {
    apiIsOn = false;
    let status = req.params.stat;
    if (status == "200") {
        apiStatus = 200;
    }
    if (status == "404") {
        apiStatus = 404;
    }
    if (status == "500") {
        apiStatus = 500;
    }
    res.status(200);
    res.end();
};

app.post("/api/post", apiController);
app.get("/api/get", apiController);

app.get("/api/on", apiOn);
app.get("/api/off/:stat", apiOff);
app.get("/", async (req, res) => res.render("index"));

const listen = () => {
    app.listen(
        PORT,
        console.log(
            `\n\n\n===============================\nServer Listening on: http://localhost:${PORT}`
        )
    );
};

console.log("server will be start in 3000ms..");
setTimeout(listen, 3000);
