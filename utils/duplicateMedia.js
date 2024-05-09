import axios from 'axios'

export function duplicate(media, filename) {
    axios.post('https://bondpetapi.duckdns.org/media/post', media, { headers: { "Content-Type": "multipart/form-data" }, params: { filename } })
}