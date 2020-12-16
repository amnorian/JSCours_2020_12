//declaration d'une fonction
function initialisationJS(prenom){
var jsload=document.querySelector('#jsload');
jsload.innerHTML='mon <span style="font-weight:900"> JS </span> est chargé pour '+prenom;
//modiff du style de la balise dans la var
jsload.style.backgroundColor='LIME';
}



//usage d'une fonction
initialisationJS('Rémy');

function formSubmited(params) {
    console.log('mon formulaire est "submit" ');
}
document.querySelector('form').addEventListener('submit',formSubmited); //document permet de selectionner tous le document, queryselector pour aller chercher le formulaire form
//addevelistener(ce que l'on veut faire (ici submità, la function lancée sans les parenthèse car on ne veut pas l'executer))