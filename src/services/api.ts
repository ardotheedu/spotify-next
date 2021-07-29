import axios, { AxiosError } from 'axios';
import {parseCookies, setCookie} from 'nookies'
import QueryString from 'qs';

let  cookies = parseCookies()
let isRefreshing = false
let failedRequestsQueue = []

export const api = axios.create({
    baseURL: 'https://api.spotify.com/v1/',
    headers: {
        Authorization: `Bearer ${cookies['spotifyauth.token']}`
    }
})

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

api.interceptors.response.use(response => {
    return response
}, (error: AxiosError) => {

    console.log(error)
    if (error.response.status === 401) {
        if (error.response.data.code === 'token.expired') {
            cookies = parseCookies()

            const {'nextauth.refreshToken': refresh_token} = cookies;
            const originalConfig = error.config

            if(!isRefreshing) {
                isRefreshing = true
                axios.post('https://accounts.spotify.com/api/token', 
                    QueryString.stringify({
                        grant_type: 'refresh_token',
                        refresh_token: refresh_token,
                    })
                , 
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
                    }
                }).then(response => {
                    const {access_token} = response.data;
    
                    setCookie(undefined, 'spotifyauth.token', access_token, {
                        maxAge: 60 * 60 * 24 * 30,
                        path: '/'
                    })
                    setCookie(undefined, 'spotify.refreshToken', response.data.refresh_token,{
                        maxAge: 60 * 60 * 24 * 30,
                        path: '/' // /path vai definir de formar global
                    })
    
                    api.defaults.headers['Authorization'] = `Bearer ${access_token}`
                    
                    failedRequestsQueue.forEach(request => request.onSuccess(access_token))
                    failedRequestsQueue = []; 
                }).catch(err => {
                    failedRequestsQueue.forEach(request => request.onFailure(err))
                    failedRequestsQueue = [];
                }).finally(() => {
                    isRefreshing = false
                })
            }


            return new Promise((resolve, reject) => {
                failedRequestsQueue.push({
                    onSuccess: (access_token: string) => {
                        originalConfig.headers['Authorization'] = `Bearer ${access_token}`

                        resolve(api(originalConfig))
                    },
                    onFailure: (err: AxiosError) => {
                        reject(err)
                    }
                })
            })
            
        }
    } else {
        //Deslogar o usuario
    }
})