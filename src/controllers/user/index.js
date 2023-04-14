import {Router} from "express";
import {UserDto,CreateUserDto} from "./dto";

// Router
class UserController {
    router;
    path = '/users';

    users = [
        {
            id: 1,
            firstName: "Sand",
            lastName: "Box",
            age: 20
        }, {
            id: 2,
            firstName: "Home",
            lastName: "Boy",
            age: 25
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
        this.router.get('/fullName/:id', this.getUserFullName.bind(this));
    }

    getUsers(req,res,next) {
        try {
            const users = this.users.map((user) => new UserDto(user));
            // 하나만 가져오기
            let fullName = users[0].getFullName();
            console.log(fullName);

            res.status(200).json({users})
        } catch (e) {
            next(e);
        }
    }

    getUserFullName(req, res, next) {
        try {
            const {id} = req.params;
            const targetUser = this.users.find((user)=> user.id === Number(id));

            if (!targetUser) {
                throw {status: 404, message: "유저를 찾을 수 없습니다."}
            }

            const user = new UserDto(targetUser);
            res.status(200).json({fullName: user.getFullName()});
        } catch (e) {
            next(e);
        }
    }

    getUser(req,res,next) {
        try {
            const {id} = req.params;
            const user = this.users.find((user) => user.id === Number(id));

            if (!user) {
                throw {status: 404, message: "non user"}
            }

            res.status(200).json({users: user});
        } catch (e) {
            next(e);
        }
    }

    createUser(req,res,next) {
        try {
            const {firstName,lastName,age} = req.body;

            if (!firstName || !lastName) {
                throw {status: 400, message: "이름이 없습니다"}
            }
            const newUser = new CreateUserDto(firstName,lastName,age).getNewUser();
            this.users.push(newUser);
            res.status(201).json({users: this.users});
        } catch (e) {
            next(e);
        }
    }

}

const userController = new UserController();
export default userController;