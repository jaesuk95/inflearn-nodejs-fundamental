import express from 'express';

let app = express();
let port = 8000;

// req : 요청 -> Request
// res : 응답 -> Response
app.get("/", (req,res)=>{
    res.send("NodeJS 강의 시작")
})

app.listen(port, ()=>{
    console.log(`server is listening on ${port}`)
});