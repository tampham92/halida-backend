const fs = require('fs/promises')
const path = require('path');
const dataPath = path.join(__dirname, '.', 'infoStore.json');

const loadData = async () => {
    const jsonData = await fs.readFile(dataPath);

    if (!Object.keys(jsonData).length) {
        return 0;
    }

    return JSON.parse(jsonData);
}

const findObject = async (id) => {
    const stores = await loadData();
    return stores.storeInfo.find(store => store.id === id);
}

const deleteObject = async (object) => {
    const stores = await loadData();
    const filterData = stores.storeInfo.filter(store => object.id !== store.id);
    await saveData({ storeInfo: filterData });
    return 1;
}


const updateObject = async (object) => {
    const jsonData = await loadData();
    const stores = jsonData.storeInfo;
    const foundIndex = stores.findIndex(store => store.id == object.id);
    stores[foundIndex] = object;
    
    const storeInfo = { storeInfo: stores };
    await saveData(storeInfo);
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
    deleteObject,
    updateObject
}