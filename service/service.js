"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importation de la librairie request
// recherche par défaut dans le répertoire node_modules
var request_promise_native_1 = __importDefault(require("request-promise-native"));
var lg = console.log;
exports.rechercherColleguesParNom = function (nomRecherche) {
    return request_promise_native_1.default("http://munier-collegues-api.herokuapp.com/collegue?nom=" + nomRecherche, { json: true })
        .then(function (tabMats) {
        return Promise.all(tabMats.map(function (matricule) {
            return exports.rechercherColleguesParMatricule(matricule);
        }));
    });
};
exports.rechercherColleguesParMatricule = function (matricule) {
    return request_promise_native_1.default("http://localhost:8080/collegue/" + matricule, { json: true });
};
function creerCollegue(collegue) {
    return request_promise_native_1.default("http://munier-collegues-api.herokuapp.com/collegue", { json: true, method: "POST", body: collegue });
}
exports.creerCollegue = creerCollegue;
function modifierEmail(matricule, collegue) {
    return request_promise_native_1.default("http://munier-collegues-api.herokuapp.com/collegue/" + matricule, { json: true, method: "PATCH", body: collegue });
}
exports.modifierEmail = modifierEmail;
function modifierPhoto(matricule, collegue) {
    return request_promise_native_1.default("http://localhost:8080/collegue/" + matricule, { json: true, method: "PATCH", body: collegue });
}
exports.modifierPhoto = modifierPhoto;
