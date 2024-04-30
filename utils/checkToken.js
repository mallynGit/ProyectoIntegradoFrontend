export async function checkToken(token, axios) {
    try {
        let res = await axios.post('/auth/check')
        return res.data
    } catch (err) {
        console.log(err, 'desde checktoken store')
        return false
    }
}