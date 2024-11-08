const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelWebsite = new Schema({
    logo: { type: String, default: '' },
    imgBanner: [],
});

module.exports = mongoose.model('website', ModelWebsite);
