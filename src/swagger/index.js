import * as Swaggers from '../controllers/swagger'
import DefaultSwagger from "./defaultSwagger";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";

console.log(Swaggers);

// 1. 가공하는 코드
const {paths} = Object.values(Swaggers).reduce(
    (acc, apis) => {
        const APIs = Object.values(apis).map((api) => {
            return {...api};
        })

        // 만약 api.key(ex. detail/:id (endpoint)) 가 없으면 만들어라
        APIs.forEach((api) => {
            const key = Object.keys(api)[0];
            console.log('key')
            console.log(key);

            if (!acc.paths[key]) {
                acc.paths = {
                    ...acc.paths,   // 기존에 있는 acc path 를 유지해주고
                    ...api,         // api 를 넣어준다
                };
            } else {
                acc.paths[key] = {
                    ...acc.paths[key],
                    ...api[key]
                }
            }
        });
        // console.log(APIs);
        console.log('acc')
        console.log(acc)
        return acc;
    }, {
        paths: {}   // 초기값,
    }
);


// 2. 스웨거에 등록할 json 만들기 defaultSwagger + 1) 에서 가공한 paths
export const swaggerDoc = {
    ...DefaultSwagger({
        title: "예시",
        description: "예시 설명",
    }),
    paths,
}

// 3. 스퀘거에 등록하는 방법
export const options = {
    swaggerOptions: {
        url: "/swagger.json",
    },
};