export default (state) => {
    return {
        headers: {
            Authorization: 'Bearer ' + state.token
        }
    }
}
