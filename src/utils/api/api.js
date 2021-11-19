const baseUrl = 'https://mycorsproxy-tuto.herokuapp.com';
const live = `${baseUrl}/https://www.showroom-live.com/api/live`;
const room = `${baseUrl}/https://www.showroom-live.com/api/room`;

const roomList = `${baseUrl}/https://campaign.showroom-live.com/akb48_sr/data/room_status_list.json`;

// Live API
const streamUrl = (roomId) => {
    return `${live}/streaming_url?room_id=${roomId}`;
}

const titleLive = (roomId) => {
    return `${live}/telop?room_id=${roomId}`;
}

const comments = (roomId) => {
    return `${live}/comment_log?room_id=${roomId}`;
}

const liveRanking = (roomId) => {
    return `${live}/stage_user_list?room_id=${roomId}`
}

const giftLog = (roomId) => {
    return `${live}/gift_log?room_id=${roomId}`;
}

const totalRank = (roomId) => {
    return `${live}/summary_ranking?room_id=${roomId}`;
}

// Room API
const profileApi = (roomId) => {
    return `${room}/profile?room_id=${roomId}`;
}

const nextLive = (roomId) => {
    return `${room}/next_live?room_id=${roomId}`;
}

const fanLetter = (roomId) => {
    return `${room}/recommend_comments?room_id=${roomId}`;
}

export { roomList, streamUrl, profileApi, comments, titleLive, nextLive, giftLog, fanLetter, totalRank, liveRanking }