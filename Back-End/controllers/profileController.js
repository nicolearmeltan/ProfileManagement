const profileModel = require('../models/profileModel');

module.exports = {
    getProfiles : (req, res, next) => {
        profileModel.find({}, (err, profiles) => {
            if(err) {
                res.status(404).send({ error: err});
                next(err);
            }
            res.status(200).send({data: profiles});
        });
    },

    getProfileById : (req, res, next) => {
        profileModel.findById(req.params.profileId, (err, profiles) => {
            if(err) {
                res.status(404).send({ error: err});
                next(err);
            }
            console.log(req.params.profileId)
            res.status(201).send({data: profiles});
        });
    },

    getProfileByName : (req, res, next) => {
        profileModel.find({name: new RegExp(String(req.params.profileName).toLowerCase())}, (err, profiles) => {
            if(err) {
                res.status(404).send({ error: err});
                next(err);
            }
            res.status(201).send({data: profiles});
        });
    },

    addProfile : (req, res, next) => {
        let newProfile = new profileModel(req.body);
        newProfile.save((err, profile) => {
            if(err) {
                res.status(404).send({ error: err});
                next(err);
            }
            res.status(201).send({data: profile});
        });
    }, 

    updateProfile : (req, res, next) => {
        profileModel.findOneAndUpdate({_id: req.params.profileId}, req.body, { new: true, userFindAndModify: false }, (err, profiles) => {
            if(err) {
                res.status(404).send({ error: err});
                next(err);
            }
            res.status(201).send({data: profiles});
        });
    },

    deleteProfile : (req, res, next) => {
        profileModel.deleteOne({_id: req.params.profileId}, (err, profiles) => {
            if(err) {
                res.status(404).send({ error: err});
                next(err);
            }
            res.status(201).send({ message: "Successfully Deleted."});
        });
    },

    notFound: (req, res, next) => {
        res.status(404).send({ error: "Not Found."})
    }

}