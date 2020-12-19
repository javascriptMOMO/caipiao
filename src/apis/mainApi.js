import request from './request';
// 获取比赛队伍数据信息
// export function getTotalGames() {
//     return request({
//         url: "/kugou/public/index.php/open/football/getMatchList",
//         method: "get"
//     });
// }
// 获取比赛队伍数据信息
export function getTotalGames() {
    return request({
        url: "/kugou/public/index.php/open/football/getMatchListNew",
        method: "get"
    });
}


