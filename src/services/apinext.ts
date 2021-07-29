import axios from 'axios'

export const apinext = axios.create({
    baseURL: '/api'
})