export const ErrorHandler = (err) => {
    let error = ''
    if (err.response.data.message.hasOwnProperty('errors')) {
        let errors = []
        err.response.data.message.errors.forEach(e => errors = [...errors, e.msg])
        error = errors.join('\n')
    } else {
        error = err.response.data.message
    }
    return error
}