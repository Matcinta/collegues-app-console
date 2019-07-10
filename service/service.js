// importation de la librairie request
// recherche par défaut dans le répertoire node_modules
const request = require('request');


function rechercherColleguesParNom(nomRecherche, callback) {
    request(`https://munier-collegues-api.herokuapp.com/collegue?nom=${nomRecherche.trim()}`, { json: true }, (err, res, body) => {
        let tableauColleguesTrouves = body;
        callback(tableauColleguesTrouves);

    });

}

function rechercherColleguesParMatricule(matricule, callback) {
    request(`https://munier-collegues-api.herokuapp.com/collegue/${matricule}`, { json: true }, (err, res, body) => {
        let collegue = body;
        callback(collegue);
    });

}

function creerCollegue(collegue, callback){
    request(`https://munier-collegues-api.herokuapp.com/collegue`, { json: true, method: "POST", body: collegue}, (err, res, body) => {
    let collegue = body;
    callback(collegue);

});
}

function modifierEmail(matricule, collegue, callback){
    request(`https://munier-collegues-api.herokuapp.com/collegue/${matricule}`, { json: true, method: "PATCH", body: collegue}, (err, res, body) => {
        let collegue = body;
        callback(collegue);
});
}

function modifierPhoto(matricule, collegue, callback){
    request(`https://munier-collegues-api.herokuapp.com/collegue/${matricule}`, { json: true, method: "PATCH", body: collegue}, (err, res, body) => {
        let collegue = body;
        callback(collegue);
});
}

exports.rechercherColleguesParNom = rechercherColleguesParNom;
exports.rechercherColleguesParMatricule = rechercherColleguesParMatricule;
exports.creerCollegue = creerCollegue;
exports.modifierEmail = modifierEmail;
exports.modifierPhoto = modifierPhoto;