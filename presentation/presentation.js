
function start(){
    var menu1 = '1. Rechercher un collègue par nom';
    var menu2 = '99. Sortir';
   console.log(menu1 + '\n' + menu2);



   // récupération du module `readline`
var readline = require('readline');


// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// récupération de la saisie utilisateur
rl.question('Que souhaitez-vous faire ? : ', function(saisie) {

    if (saisie === '1') {
        rl.question('Veuillez saisir le nom du collègue que vous souhaitez chercher : ', function(saisie2) {
    
            // la variable `saisie` contient la saisie effectuée
            console.log(`Vous avez saisi : ${saisie2}`);

            console.log(`Recherche en cours du nom : ${saisie2}`);
    })}
    else if (saisie === '99') {
        console.log('Au revoir');
        rl.close();
    }

   // attention, une fois l'interface fermée, la saisie n'est plus possible
});


}

exports.start = start;

