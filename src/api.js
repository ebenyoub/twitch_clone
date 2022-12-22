import axios from 'axios';

let api = axios.create({
    headers: {
        "Client-ID" : 'empv6s9dwkqef4zq6ajdpcs0v8005v',
        "Authorization" : "Bearer mgpwv5sqnim44ut5amusxy8t59g85u"
    }
})

/*
    CLIENT_ID = x3zzuxlubcwbw9lelgaja1cyv9frlm
    REDIRECT = https://localhost:3000
    LIEN AUTH = 'https://id.twitch.tv/oauth2/authorize?client_id=empv6s9dwkqef4zq6ajdpcs0v8005v&redirect_uri=https://192.168.1.17:3000&response_type=token
    LIEN REMPLI = 
*/

export default api;
