const fs = require('fs'); // permet de modifier le système de fichiers y compris la suppression

const Sauce = require('../models/sauces');


//implémentation des routes POST GET PUT DELETE

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({message: 'Sauce enregistrée avec succès!'}))
        .catch((error) => res.status(400).json({error: error}));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then((sauces) => {
        res.status(200).json(sauces);
    })
    .catch((error) => {
        res.status(400).json({error: error});
    });
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    })
    .then((sauce) => {
        res.status(200).json(sauce);
    })
    .catch((error) => {
        res.status(404).json({error: error})
    });
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body};
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({error}));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: 'Sauce supprimée !'}))
                    .catch(error => res.status(400).json({error}))
            });
        })
        .catch(error => res.status(500).json({error}));
};

exports.likeSauce = (req, res, next) => {
    const sauceObject = req.body;
    if(sauceObject.like === 1) {
        Sauce.updateOne(
            {_id: req.params.id},
            {$inc: {likes: +1}, $push: {usersLiked: req.body.userId}}
        )
        .then(() => res.status(200).json(sauceObject))
        .catch((error) => res.status(400).json({error}));
    } else if(sauceObject.like === -1) {
        Sauce.updateOne(
            {_id: req.params.id},
            {$inc: {dislikes: +1}, $push: {usersDisliked: req.body.userId}}
        )
        .then(() => res.status(200).json(sauceObject))
        .catch((error) => res.status(400).json({error}));
    } else {
        Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if(sauce.usersLiked.includes(req.body.userId)) {
                Sauce.updateOne(
                    {_id: req.params.id},
                    {$pull: {usersLiked: req.body.userId}, $inc: {likes: -1}}
                )
                .then(() => res.status(200).json({message: "like retiré !"}))
                .catch((error) => res.status(400).json({error}));
            } else if (sauce.usersDisliked.includes(req.body.userId)) {
                Sauce.updateOne(
                    {_id: req.params.id},
                    {$pull: {usersDisliked: req.body.userId}, $inc: {dislikes: -1}}
                )
                .then(() => res.status(200).json({message: "dislike retiré !"}))
                .catch((error) => res.status(400).json({error}))
            }
        })
        .catch((error) => res.status(400).json({error}));
    }
};
