import axios from 'axios'

export let http = axios.create({
    baseURL: 'https://api-you-win-retro.herokuapp.com/api'
})