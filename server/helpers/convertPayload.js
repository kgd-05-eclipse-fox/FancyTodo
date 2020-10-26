const convertPayload = (reqDotBody) => {
    return {
        title: reqDotBody.title,
        description: reqDotBody.description,
        due_date: reqDotBody.due_date,
        status: reqDotBody.status
    }
}

module.exports = convertPayload