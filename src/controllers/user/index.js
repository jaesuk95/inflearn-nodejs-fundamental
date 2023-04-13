import {Router} from "express";

// Router
class UserController {
    router;
    path = '/users';

    users = [
        {
            id: 1,
            name: "me",
            age: 20
        }, {
            id: 2,
            name: "me2",
            age: 21
        }
    ];

    constructor() {
        this.router = Router();
        this.init();
    }

    // 생성자를 실행할 때 가장 먼저 실행하는 함수를 만든다
    // bind 를 해준다. 따로 데이터베이스를 사용하지 않기 때문에 .bind(this) 해준다
    init() {
        this.router.get('/', this.getUsers.bind(this));
        this.router.get('/detail/:id', this.getUser.bind(this));
        this.router.post('/', this.createUser.bind(this));
    }

    getUsers(req,res) {
        res.status(200).json({users: this.users})
    }

    getUser(req,res) {
        const {id} = req.params;
        const user = this.users.find((user) => user.id === Number(id));
        res.status(200).json({users: user});
    }

    createUser(req,res) {
        const {name,age} = req.body;
        this.users.push({
            id: new Date().getTime(),
            name: name,
            age: age
        })
        res.status(201).json({users: this.users});
    }
}

const userController = new UserController();
export default userController;