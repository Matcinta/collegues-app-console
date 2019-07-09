// importation de la librairie request
// recherche par défaut dans le répertoire node_modules
var request = require('request');


function rechercherColleguesParNom(nomRecherche, callback) {
    request(`https://munier-collegues-api.herokuapp.com/collegue?nom=${nomRecherche.trim()}`, { json: true }, function (err, res, body) {
        var tableauColleguesTrouves = body;
        callback(tableauColleguesTrouves);

    });

}

function rechercherColleguesParMatricule(matricule, callback) {
    request(`https://munier-collegues-api.herokuapp.com/collegue/${matricule}`, { json: true }, function (err, res, body) {
        var collegue = body;
        callback(collegue);
    });

}

exports.rechercherColleguesParNom = rechercherColleguesParNom;
exports.rechercherColleguesParMatricule = rechercherColleguesParMatricule;
