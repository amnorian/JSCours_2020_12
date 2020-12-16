//declaration d'une fonction
function initialisationJS(prenom) {
    var jsload = document.querySelector('#jsload');
    jsload.innerHTML = 'mon <span style="font-weight:900"> JS </span> est chargé pour ' + prenom;
    //modiff du style de la balise dans la var
    jsload.style.backgroundColor = 'LIME';
}

document.addEventListener('load', function (evt) {
    //usage d'une fonction
    initialisationJS('Rémy');
    document.querySelector('form').addEventListener('submit', formSubmitted);
});


function formSubmited(evt) {
    evt.preventDefault();
    console.log('mon formulaire est "submit" ');
    console.log(evt.target[0].value);
    console.log(evt.target[1].value);
    console.log(evt.target[2].value);
    console.log(evt.target[3].value);
}
document.querySelector('form').addEventListener('submit', formSubmited); //document permet de selectionner tous le document, queryselector pour aller chercher le formulaire form
//addevelistener(ce que l'on veut faire (ici submità, la function lancée sans les parenthèse car on ne veut pas l'executer))



/** "faire /** puis entrer pour entrer toutes les éléménts @param qui seront définie dans la création du postit (créatePostit)" */
/**
 * 
 * @param {string} titre titre de la note
 * @param {String} date date ISO AAA-MM*JJ pour la note
 * @param {String} heure heure ISO HH:MM:SS pour la note
 * @param {*String} description descritpion de la note
 */
function createPostit(titre, date, heure, description) {
    var postit = document.createElement('div');
    postit.classList.add('postit');
    postit.innerHTML ='<div class="postit-titre">' +titre+ '</div> date : <span class="datetime">'+date+' </span> heure : <span class:"datetime">'+heure+'</span>\
        <h2>Description</h2>'+description; 
        //pour sauter les lignes on met un "\"
    var liste = document.querySelector('#list');
    liste.append(postit);
}

/** exemple de lancement de la fonction : createPostit('mon titre','2020-01-02','00:00:00', 'description du content') */