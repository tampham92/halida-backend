const fs = require('fs/promises')
const path = require('path');
const dataPath = path.join(__dirname, '.', 'user.json');

const loadData = async () => {
    const jsonData = await fs.readFile(dataPath);

    if (!Object.keys(jsonData).length) {
        return 0;
    }

    return JSON.parse(jsonData);
}

const findObject = async (username) => {
    const users = await loadData();
    return users.userInfo.find(user => user.username === username);
}

const updateObject = async (object, isLogin) => {
    const user = await findObject(object.username);
    if (user) {
        return 0;
    }
    user.isLogin = isLogin;
    const data = { userInfo: [user] }
    await saveData(data);
    return 1;
}

const saveData = async (data) => {
    await fs.writeFile(
        dataPath,
        JSON.stringify(data)
    );
}

module.exports = {
    loadData,
    saveData,
    findObject,
    updateObject
}