import mongoose from 'mongoose';
import constants from '../constants';

const PasteSchema = mongoose.Schema({
	title: String,
	date: Date,
	body: String,
	author: String,
	syntax: String
});

const PunSchema = mongoose.Schema({
	body: String
});

module.exports.startDB = () => {
	mongoose.connect(constants.DB_PROTOCOL +
        constants.DB_USER + ':' +
        constants.DB_PWD +
        constants.DB_INSTANCE);
	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log("Openned connection to " + constants.DB_INSTANCE);
        console.log("DB User:" + constants.DB_USER);
        // Schema exports
        module.exports.Paste = mongoose.model('Paste', PasteSchema);
        module.exports.Pun = mongoose.model('Pun', PunSchema);
    });
    return db;
}
