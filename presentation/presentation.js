
const service = require('../service/service');

// récupération du module `readline`
const readline = require('readline');
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function start() {
    const menu1 = '1. Rechercher un collègue par nom';
    const menu2 = '2. Créer un collègue';
    const menu3 = '3. Modifier l\'email';
    const menu4 = '4. Modifier la photo';
    const menu99 = '99. Sortir';
    console.log(`\n ${menu1} \n ${menu2} \n ${menu3} \n ${menu4} \n ${menu99}\n`);

    // récupération de la saisie utilisateur
    rl.question('Que souhaitez-vous faire ? : ', (saisie) => {
        // TODO: ajouter la condition où l'utilisateur tape autre chose que 1 et 99

        if (saisie === '1') {
            rl.question('Veuillez saisir le nom du collègue que vous souhaitez chercher : ', (saisie2) => {

                // la variable `saisie` contient la saisie effectuée
                console.log(`Vous avez saisi : ${saisie2}`);

                console.log(`>> Recherche en cours du nom : ${saisie2} <<`);

                service.rechercherColleguesParNom(`${saisie2}`, (colleguesTrouves) => {
                    for (i = 0; i < colleguesTrouves.length; i++) {
                        service.rechercherColleguesParMatricule(colleguesTrouves, (collegue) => {
                            console.log(`${collegue.nom}  ${collegue.prenom} ${collegue.dateDeNaissance}`)
                            start();
                        });
                    }
                });
            });
        }
        if (saisie === '2') {
            let collegue = {};
            rl.question('Veuillez saisir le nom du collègue que vous souhaitez ajouter : ', (nomSaisi) => {
                collegue.nom = nomSaisi;
                rl.question('Veuillez saisir le prénom du collègue que vous souhaitez ajouter : ', (prenomSaisi) => {
                    collegue.prenom = prenomSaisi;
                    rl.question('Veuillez saisir l\'email du collègue que vous souhaitez ajouter : ', (emailSaisi) => {
                        collegue.email = emailSaisi;
                        rl.question('Veuillez saisir la date de naissance du collègue que vous souhaitez ajouter : ', (dateDeNaissanceSaisie) => {
                            collegue.dateDeNaissance = dateDeNaissanceSaisie;
                            rl.question('Veuillez saisir l\'url de la photo du collègue que vous souhaitez ajouter : ', (urlPhotoSaisie) => {
                                collegue.photoUrl = urlPhotoSaisie;
                                service.creerCollegue(collegue, (collegue) => {
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
            rl.question('Veuillez saisir le matricule du collègue dont vous souhaitez modifier l\'email :', (matriculeSaisi) => {
                service.rechercherColleguesParMatricule(matriculeSaisi, (collegue) => {
                    rl.question('Veuillez saisir un nouvel email : ', (emailSaisi) => {
                        collegue.email = emailSaisi;
                    service.modifierEmail(matriculeSaisi, collegue, (collegue) => {
                        console.log(collegue);
                        start();
                    });
                   
                });

            });
        });
    }
        if (saisie === '4') {
            rl.question('Veuillez saisir le matricule du collègue dont vous souhaitez modifier l\'url de sa photo :', function (matriculeSaisi) {
                service.rechercherColleguesParMatricule(matriculeSaisi, (collegue) => {
                    rl.question('Veuillez saisir un nouvel adresse url pour la photo : ', (photoUrlSaisi) => {
                        collegue.photoUrl = photoUrlSaisi;
                    service.modifierPhoto(matriculeSaisi, collegue, (collegue) => {
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

