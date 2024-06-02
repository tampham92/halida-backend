const service = require('../database/userDataService');

const login = async (req, res) => {
    const user = await service.findObject(req.body.email);
    if (!user) {
        return res.json({
            status: 401,
            message: "Unauthorized"
        });
    }

    const isValidate = await service.updateObject(user, true);

    return res.json({
        status: 200,
        data: isValidate
    });
}

module.exports = {
    login
}