import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
let port = 8000;


app.use(cors({
    // origin: "https//www.naver.com"  // 네이버에서 요청이 오면 서버에서 응답을 해준다.
    origin: "*"  // 전체를 받을 경우 origin: "*" 하거나, app.use(cors()) 비원둔다.
}));
app.use(helmet());  // 보안 강화

const today = new Date();
const todayDayJS = dayjs(today).format("YYYY-MM-DD");
console.log(todayDayJS)
console.log(today)

// bcrypt
const password = "1234";
const hashedPassword = bcrypt.hashSync(password, 10);
console.log(hashedPassword)

// jwt token
const token = jwt.sign("1234","secret");
console.log(token);

// req : 요청 -> Request
// res : 응답 -> Response
app.get("/", (req,res)=>{
    res.send("NodeJS 강의 시작")
})

app.listen(port, ()=>{
    console.log(`server is listening on ${port}`)
});