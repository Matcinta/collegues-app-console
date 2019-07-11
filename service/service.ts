// importation de la librairie request
// recherche par défaut dans le répertoire node_modules
import request from 'request-promise-native';

var lg = console.log;


export const rechercherColleguesParNom = (nomRecherche:string) => {
    return request(`https://munier-collegues-api.herokuapp.com/collegue?nom=${nomRecherche}`, { json: true })
    .then((tabMats) =>
    Promise.all(tabMats.map((matricule:string) => {
        return rechercherColleguesParMatricule(matricule);
    })));
}

export const rechercherColleguesParMatricule = (matricule:string) => {
    return request(`https://munier-collegues-api.herokuapp.com/collegue/${matricule}`, { json: true })
    }



export function creerCollegue(collegue:any){
    return request(`https://munier-collegues-api.herokuapp.com/collegue`, { json: true, method: "POST", body: collegue} )
}

export function modifierEmail(matricule:string, collegue:any){
    return request(`https://munier-collegues-api.herokuapp.com/collegue/${matricule}`, { json: true, method: "PATCH" , body: collegue})
}

export function modifierPhoto(matricule:string, collegue:any){
    return request(`https://munier-collegues-api.herokuapp.com/collegue/${matricule}`, { json: true, method: "PATCH", body: collegue})
}
