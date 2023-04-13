import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import {Router} from "express";
import Controllers from "./controllers"

const app = express();
let port = 8000;

// application level 미들웨어 작성
app.use(express.urlencoded({
    extended: true,
    limit: "700mb"
}));
app.use(express.json());
app.use(cors({
    // origin: "https//www.naver.com"  // 네이버에서 요청이 오면 서버에서 응답을 해준다.
    origin: "*"  // 전체를 받을 경우 origin: "*" 하거나, app.use(cors()) 비원둔다.
}));
app.use(helmet());  // 보안 강화

// userController created by Router 방식 1
// app.use("/users", UserController.router);

// controllers
Controllers.forEach((controller) => {
    app.use(controller.path, controller.router);
});


app.get("/", (req,res)=>{
    res.send("NodeJS 강의 시작")
})

app.listen(port, ()=>{
    console.log(`server is listening on ${port}`)
});