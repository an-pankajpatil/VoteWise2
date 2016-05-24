var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Category', new Schema({

    civilLiberties: Boolean,
    crimeAndPunishment: Boolean,
    education: Boolean,
    energy: Boolean,
    enviroment: Boolean,
    gunControl: Boolean,
    healthAndSafety: Boolean,
    immigration: Boolean,
    infrastructure: Boolean,
    internationalRelations: Boolean,
    jobs: Boolean,
    qualityOfLife: Boolean,
    reproduction: Boolean,
    taxes: Boolean,
    socialServices: Boolean
}));
