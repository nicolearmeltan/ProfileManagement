const profileModel = require('../models/profileModel');

module.exports = {
    getProfiles : async (req, res, next) => {
        let count = parseInt(req.query.count) || 10;
        let page = parseInt(req.query.page) || 1;

        if(page < 0 || count < 0) {
            return res.status(404).send({ error: "Invalid Request"});
        }
        profileModel.find({})
            .skip((count * page) - count)
            .limit(count)
            .exec((err, profiles) => {
                profileModel.countDocuments().exec((err, total) => {
                    let pageCount = Math.ceil(total/count);
                    if(err) {
                        res.status(404).send({ error: err });
                        next(err);
                    }
                    res.status(200).send({ data: profiles, page: page, pageCount: pageCount, total: total});
                });
        });
    },

    getProfileById : (req, res, next) => {
        profileModel.findById(req.params.profileId, (err, profiles) => {
            if(err) {
                res.status(404).send({ error: err });
                next(err);
            }
            res.status(201).send({ ata: profiles });
        });
    },

    getProfileByName : (req, res, next) => {
        profileModel.aggregate()
            .project({
                fullname: { $concat: ["$name.first", " ", "$name.last"]},
                gender: 1,
                name: {
                    title: 1,
                    first: 1,
                    last: 1
                  },
                location: {
                    street: 1,
                    city: 1,
                    state: 1,
                    postcode: 1,
                    coordinates: {
                      latitude: 1,
                      longitude: 1
                    },
                    timezone: {
                      offset: 1,
                      description: 1
                    }
                },
                email: 1,
                dob: 1,
                phone: 1,
                cell: 1,
                picture: 1,
                nat: 1
            })
            .match({fullname: new RegExp(String(req.query.name).toLowerCase())})
            .exec((err, profiles) => {
                if(err) {
                    res.status(404).send({ error: err });
                    next(err);
                }
                res.status(201).send({data: profiles });
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
        profileModel.findOneAndUpdate({ _id: req.params.profileId }, req.body, { new: true, userFindAndModify: false }, (err, profiles) => {
            if(err) {
                res.status(404).send({ error: err });
                next(err);
            }
            res.status(201).send({ data: profiles });
        });
    },

    deleteProfile : (req, res, next) => {
        profileModel.deleteOne({ _id: req.params.profileId }, (err, profiles) => {
            if(err) {
                res.status(404).send({ error: err });
                next(err);
            }
            res.status(201).send({ message: "Successfully Deleted." });
        });
    },

    notFound: (req, res, next) => {
        res.status(404).send({ error: "Not Found."})
    }

}