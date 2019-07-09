// importation de la librairie request
// recherche par défaut dans le répertoire node_modules
var request = require('request');


function rechercherColleguesParNom(nomRecherche, callback){
   request(`https://munier-collegues-api.herokuapp.com/collegue?nom=${nomRecherche.trim()}`, { json: true }, function(err, res, body) {
        var tableauColleguesTrouves = body;
        callback(tableauColleguesTrouves);
        });
        
}

exports.rechercherColleguesParNom = rechercherColleguesParNom;
