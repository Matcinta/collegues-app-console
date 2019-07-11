"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lg = console.log;
var service = __importStar(require("../service/service"));
var domains_1 = require("../domains");
// récupération du module `readline`
var readline_1 = __importDefault(require("readline"));
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
function start() {
    var menu1 = '1. Rechercher un collègue par nom';
    var menu2 = '2. Créer un collègue';
    var menu3 = '3. Modifier l\'email';
    var menu4 = '4. Modifier la photo';
    var menu99 = '99. Sortir';
    console.log("\n " + menu1 + " \n " + menu2 + " \n " + menu3 + " \n " + menu4 + " \n " + menu99 + "\n");
    // récupération de la saisie utilisateur
    rl.question('Que souhaitez-vous faire ? : ', function (saisie) {
        // TODO: ajouter la condition où l'utilisateur tape autre chose que 1 et 99
        if (saisie === '1') {
            rl.question('Veuillez saisir le nom du collègue que vous souhaitez chercher : ', function (saisie2) {
                // la variable `saisie` contient la saisie effectuée
                lg("Vous avez saisi : " + saisie2);
                lg(">> Recherche en cours du nom : " + saisie2 + " <<");
                service.rechercherColleguesParNom("" + saisie2)
                    .then(function (colleguesTrouves) {
                    colleguesTrouves.forEach(function (collegue) {
                        lg(collegue.nom + "  " + collegue.prenom + " " + collegue.dateDeNaissance);
                        start();
                    });
                }).catch(function (err) {
                    lg(err);
                });
            });
        }
        if (saisie === '2') {
            rl.question('Veuillez saisir le nom du collègue que vous souhaitez ajouter : ', function (nomSaisi) {
                rl.question('Veuillez saisir le prénom du collègue que vous souhaitez ajouter : ', function (prenomSaisi) {
                    rl.question('Veuillez saisir l\'email du collègue que vous souhaitez ajouter : ', function (emailSaisi) {
                        rl.question('Veuillez saisir la date de naissance du collègue que vous souhaitez ajouter : ', function (dateDeNaissanceSaisie) {
                            rl.question('Veuillez saisir l\'url de la photo du collègue que vous souhaitez ajouter : ', function (urlPhotoSaisie) {
                                var collegue = new domains_1.Collegue(nomSaisi, prenomSaisi, emailSaisi, dateDeNaissanceSaisie, urlPhotoSaisie);
                                service.creerCollegue(collegue)
                                    .then(function (collegue) {
                                    lg(collegue);
                                    start();
                                }).catch(function (err) {
                                    lg(err);
                                });
                            });
                        });
                    });
                });
            });
        }
        if (saisie === '3') {
            var collegue_1 = {};
            rl.question('Veuillez saisir le matricule du collègue dont vous souhaitez modifier l\'email :', function (matriculeSaisi) {
                rl.question('Veuillez saisir un nouvel email : ', function (emailSaisi) {
                    collegue_1.email = emailSaisi;
                    service.modifierEmail(matriculeSaisi, collegue_1)
                        .then(function (collegue) {
                        lg(collegue);
                        start();
                    })
                        .catch(function (err) {
                        lg(err);
                    });
                });
            });
        }
        if (saisie === '4') {
            var collegue_2 = {};
            rl.question('Veuillez saisir le matricule du collègue dont vous souhaitez modifier l\'url de sa photo :', function (matriculeSaisi) {
                rl.question('Veuillez saisir un nouvel adresse url pour la photo : ', function (photoUrlSaisi) {
                    collegue_2.photoUrl = photoUrlSaisi;
                    service.modifierPhoto(matriculeSaisi, collegue_2)
                        .then(function (collegue) {
                        lg(collegue);
                        start();
                    })
                        .catch(function (err) {
                        lg(err);
                    });
                });
            });
        }
        else if (saisie === '99') {
            console.log('Au revoir');
            rl.close();
        }
        // attention, une fois l'interface fermée, la saisie n'est plus possible
    });
}
exports.start = start;
