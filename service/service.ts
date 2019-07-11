// importation de la librairie request
// recherche par défaut dans le répertoire node_modules
import request from 'request-promise-native';
import * as domains from '../domains';

var lg = console.log;


export const rechercherColleguesParNom = (nomRecherche:string) => {
    return request(`http://munier-collegues-api.herokuapp.com/collegue?nom=${nomRecherche}`, { json: true })
    .then((tabMats) =>
    Promise.all(tabMats.map((matricule:string) => {
        return rechercherColleguesParMatricule(matricule);
    })));
}

export const rechercherColleguesParMatricule = (matricule:string) => {
    return request(`http://localhost:8080/collegue/${matricule}`, { json: true })
    }



export function creerCollegue(collegue:domains.Collegue){
    return request(`http://munier-collegues-api.herokuapp.com/collegue`, { json: true, method: "POST", body: collegue} )
}

export function modifierEmail(matricule:string, collegue:domains.Collegue){
    return request(`http://munier-collegues-api.herokuapp.com/collegue/${matricule}`, { json: true, method: "PATCH" , body: collegue})
}

export function modifierPhoto(matricule:string, collegue:domains.Collegue){
    return request(`http://localhost:8080/collegue/${matricule}`, { json: true, method: "PATCH", body: collegue})
}
