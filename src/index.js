import express from 'express';
import cors from 'cors';
import helmet from "helmet";

const app = express();
let port = 8000;

let users = [
    {
        id: 1,
        name: "me",
        age: 12
    }
]


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



// GET METHOD
app.get("/users", (req, res) => {
    res.status(200).json({
        users
    });
});

// POST METHOD
app.post("/users", (req,res)=> {
    const {name,age} = req.body;
    console.log(req.body)
    users.push({
        id: new Date().getTime(),
        name: name,
        age: age
    })
    res.status(201).json({users})
})

// PATCH METHOD
app.patch("/users/:id", (req,res)=> {
    const {id} = req.params;
    const {name, age} = req.body;

    console.log('param', req.params)
    const targetUser = users.findIndex((user) => user.id === Number(id));

    users[targetUser] = {
        id: users[targetUser].id,
        name: name ? name : users[targetUser].name,    // req.body 안에 name 이 없으면 users[targetUser] 의 이름을 사용하겠다
        age: age ? age : users[targetUser].age
    }

    res.status(204).json({});
})

// DELETE METHOD
app.delete("/users/:id", (req,res)=> {
    const {id} = req.params;

    const deleteUsers = users.filter((user) => user.id !== Number(id));     // param 아이디와 같지 않으면 다 찾는다
    users = deleteUsers;

    res.status(204).json({});
})



app.get("/", (req,res)=>{
    res.send("NodeJS 강의 시작")
})

app.listen(port, ()=>{
    console.log(`server is listening on ${port}`)
});