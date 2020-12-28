import request from './request';
const getGamesUrl = process.env.NODE_ENV === 'production' ? '/kugou/public/index.php/open/football/getMatchListNew' : '/kugou/public/index.php/open/football/getMatchListNewTest'
// 获取比赛队伍数据信息
export function getTotalGames() {
    return request({
        url: getGamesUrl,
        method: "get",
        withCredentials: true
    });
}

// 登录
export function loginIt() {
    return request({
        url: "/kugou/public/index.php/open/football/login?username=maxxiang&password=kainuo123",
        method: "get"
    });
}


