import dayjs from "dayjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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