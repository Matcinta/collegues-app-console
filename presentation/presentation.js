
var service = require('../service/service');

// récupération du module `readline`
var readline = require('readline');
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function start() {
    var menu1 = '1. Rechercher un collègue par nom';
    var menu2 = '2. Créer un collègue';
    var menu3 = '3. Modifier l\'email';
    var menu4 = '4. Modifier la photo';
    var menu99 = '99. Sortir';
    console.log('\n' + menu1
        + '\n' + menu2
        + '\n' + menu3
        + '\n' + menu4
        + '\n' + menu99);

    // récupération de la saisie utilisateur
    rl.question('Que souhaitez-vous faire ? : ', function (saisie) {
        // TODO: ajouter la condition où l'utilisateur tape autre chose que 1 et 99

        if (saisie === '1') {
            rl.question('Veuillez saisir le nom du collègue que vous souhaitez chercher : ', function (saisie2) {

                // la variable `saisie` contient la saisie effectuée
                console.log(`Vous avez saisi : ${saisie2}`);

                console.log(`>> Recherche en cours du nom : ${saisie2} <<`);

                service.rechercherColleguesParNom(`${saisie2}`, function (colleguesTrouves) {
                    for (i = 0; i < colleguesTrouves.length; i++) {
                        service.rechercherColleguesParMatricule(colleguesTrouves, function (collegue) {
                            console.log(`${collegue.nom}  ${collegue.prenom} ${collegue.dateDeNaissance}`)
                            start();
                        });
                    }
                });
            });
        }
        if (saisie === '2') {
            var collegue = {};
            rl.question('Veuillez saisir le nom du collègue que vous souhaitez ajouter : ', function (nomSaisi) {
                collegue.nom = nomSaisi;
                rl.question('Veuillez saisir le prénom du collègue que vous souhaitez ajouter : ', function (prenomSaisi) {
                    collegue.prenom = prenomSaisi;
                    rl.question('Veuillez saisir l\'email du collègue que vous souhaitez ajouter : ', function (emailSaisi) {
                        collegue.email = emailSaisi;
                        rl.question('Veuillez saisir la date de naissance du collègue que vous souhaitez ajouter : ', function (dateDeNaissanceSaisie) {
                            collegue.dateDeNaissance = dateDeNaissanceSaisie;
                            rl.question('Veuillez saisir l\'url de la photo du collègue que vous souhaitez ajouter : ', function (urlPhotoSaisie) {
                                collegue.photoUrl = urlPhotoSaisie;
                                service.creerCollegue(collegue, function (collegue) {
                                    console.log(collegue);
                                    start();
                                })
                            })
                        })
                    })
                });
            });
        }


        if (saisie === '3') {
            rl.question('Veuillez saisir le matricule du collègue dont vous souhaitez modifier l\'email :', function (matriculeSaisi) {
                service.rechercherColleguesParMatricule(matriculeSaisi, function (collegue) {
                    rl.question('Veuillez saisir un nouvel email : ', function (emailSaisi) {
                        collegue.email = emailSaisi;
                    service.modifierEmail(matriculeSaisi, collegue, function(collegue){
                        console.log(collegue);
                        start();
                    });
                   
                });

            });
        });
    }
        if (saisie === '4') {
            rl.question('Veuillez saisir le matricule du collègue dont vous souhaitez modifier l\'url de sa photo :', function (matriculeSaisi) {
                service.rechercherColleguesParMatricule(matriculeSaisi, function (collegue) {
                    rl.question('Veuillez saisir un nouvel adresse url pour la photo : ', function (photoUrlSaisi) {
                        collegue.photoUrl = photoUrlSaisi;
                    service.modifierPhoto(matriculeSaisi, collegue, function(collegue){
                        console.log(collegue);
                        start();
                    });
                   
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

