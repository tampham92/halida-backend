
const { v4: uuidv4 } = require('uuid');
const service = require('../database/storeDataService');

const addStore = async (req, res) => {
    const db = await service.loadData();
    const fromData = {
        id: uuidv4(),
        name: req.body.name.toUpperCase(),
        street: req.body.street.toUpperCase(),
        district: req.body.district.toUpperCase(),
        city: req.body.city.toUpperCase(),
        time: req.body.time,
        date: req.body.date,
    }

    if (!db) {
        const storeInfo = { storeInfo: [fromData] };
        await service.saveData(storeInfo);
    } else {
        db.storeInfo.push(fromData);
        const newList = { storeInfo: db.storeInfo };
        await service.saveData(newList);
    }

    const newDb = await service.loadData();
    return res.json({
        status: 200,
        data: newDb
    })
}

const updateStore = async (req, res) => {
    const object = await service.findObject(req.params.id);
    if (!object) {
        return res.json({
            status: 404,
            message: 'Not found'
        })
    }

    const fromData = {
        id: object.id,
        name: req.body.name.toUpperCase(),
        street: req.body.street.toUpperCase(),
        district: req.body.district.toUpperCase(),
        city: req.body.city.toUpperCase(),
        time: req.body.time,
        date: req.body.date,
    }
    console.log(fromData);

    const update = await service.updateObject(fromData);
    return res.json({
        status: 200,
        data: update
    })
}

const deleteStore = async (req, res) => {
    const findObject = await service.findObject(req.params.id);
    if (!findObject) {
        return res.json({
            status: 404,
            message: 'Not found'
        })
    }

    const deleteObject = await service.deleteObject(findObject);
    if (!deleteObject) {
        return res.json({
            status: 500,
            message: 'Something went wrong!'
        })
    }

    return res.json({
        status: 204,
        data: "success"
    })
}


const getStores = async (req, res) => {
    const stores = await service.loadData();
    return res.json({
        status: 200,
        data: stores.storeInfo ?? []
    });
}

module.exports = {
    addStore,
    getStores,
    deleteStore,
    updateStore
}