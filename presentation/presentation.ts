var lg = console.log;

import * as service from '../service/service';
import {Collegue} from '../domains';

// récupération du module `readline`
import readline from 'readline';

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
                lg(`Vous avez saisi : ${saisie2}`);
                lg(`>> Recherche en cours du nom : ${saisie2} <<`);
                service.rechercherColleguesParNom(`${saisie2}`)
                    .then((colleguesTrouves: any) => {
                        colleguesTrouves.forEach((collegue: Collegue) => {
                            lg(`${collegue.nom}  ${collegue.prenom} ${collegue.dateDeNaissance}`);
                            start();
                        })
                    }).catch((err: any) => {
                        lg(err);
                    });
            })
        }

        if (saisie === '2') {
            rl.question('Veuillez saisir le nom du collègue que vous souhaitez ajouter : ', (nomSaisi: string) => {
                rl.question('Veuillez saisir le prénom du collègue que vous souhaitez ajouter : ', (prenomSaisi) => {
                    rl.question('Veuillez saisir l\'email du collègue que vous souhaitez ajouter : ', (emailSaisi) => {
                        rl.question('Veuillez saisir la date de naissance du collègue que vous souhaitez ajouter : ', (dateDeNaissanceSaisie) => {  
                            rl.question('Veuillez saisir l\'url de la photo du collègue que vous souhaitez ajouter : ', (urlPhotoSaisie) => {
                                let collegue = new Collegue(nomSaisi, prenomSaisi, emailSaisi, dateDeNaissanceSaisie, urlPhotoSaisie);
                                service.creerCollegue(collegue)
                                .then((collegue) => {
                                    lg(collegue);
                                    start();
                                }).catch((err:any)=>{
                                    lg(err);   
                                })
                            });
                        })
                    })
                })
            });
        }


        if (saisie === '3') {
            let collegue: any = {};
            rl.question('Veuillez saisir le matricule du collègue dont vous souhaitez modifier l\'email :', (matriculeSaisi) => {
                rl.question('Veuillez saisir un nouvel email : ', (emailSaisi) => {
                    collegue.email = emailSaisi;
                    service.modifierEmail(matriculeSaisi, collegue)
                    .then((collegue) =>{
                        lg(collegue);
                        start();
                    })
                    .catch((err:any)=>{
                        lg(err);   
                    })
                    });
                });
        }


        if (saisie === '4') {
            let collegue: any = {};
            rl.question('Veuillez saisir le matricule du collègue dont vous souhaitez modifier l\'url de sa photo :', (matriculeSaisi) => {
                rl.question('Veuillez saisir un nouvel adresse url pour la photo : ', (photoUrlSaisi) => {
                    collegue.photoUrl = photoUrlSaisi;
                    service.modifierPhoto(matriculeSaisi, collegue)
                    .then ((collegue) => {
                        lg(collegue);
                        start();
                    })
                    .catch((err:any)=>{
                        lg(err);   
                    })  
                   
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

