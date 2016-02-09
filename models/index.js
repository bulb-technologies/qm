(function(){

    //avoid namespace pollution.
    var qm = qm || {};
    qm.models = qm.models || {};
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var ObjectId = mongoose.Schema.ObjectId;
    var db = require('_/config/connection');

    //define middleware

    //create schemas and model compilations.

    var administratorSchema = new Schema({

        name: {

            first: {type: String, trim: true},
            last: {type: String, trim: true}

        },
        contact: {

            email: {type: String, unique: true, trim: true}

        },
        created: {type: Date, default: Date.now()}

    });

    qm.models.administratorModel = db.model('Administrator', administratorSchema);

    var producerSchema = new Schema({

        name: {

            app: {type: String, unique: true}

        }
        credentials: {

            authkey: {type: String, unique: true}

        },
        created: {type: Date, default: Date.now()}

    });

    qm.models.producerModel = db.model('Producer', producerSchema);

    var transactionSchema = new Schema({

        pos: ObjectId, //terminal that made the transcation
        meter: {

            num: String,
            owner: String

        },
        reciever: {type: String, default: 'Botswana Post'},
        token: {

            recipient: String, //phone number
            value: String,
            delivery: {type: String, enum: ['delivered', 'fail']}

        },
        units: Number,
        amount:{

            electricity: Number,
            vat: Number,
            levy: Number,
            transcation: Number,
            vat: Number

        },
        state: { //from POSO or BPC

            value: {type: String, enum: ['success', 'fail']},
            message: {type: String, default: 'Transaction Successful'} //a reason to one of the states above

        },
        created: {type: Date, default: Date.now()}

    });

    qm.models.transactionModel = db.model('Transaction', transactionSchema);

    //export models object.
    module.exports = qm.models;


})();
