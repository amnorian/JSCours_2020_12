var lastID=0;
var descripteurDInterval;
//declaration d'une fonction
function initialisationJS(prenom) {
    var jsload = document.querySelector('#jsload');
    jsload.innerHTML = 'mon <span style="font-weight:900"> JS </span> est chargé pour ' + prenom;
    //modiff du style de la balise dans la var
    jsload.style.backgroundColor = 'LIME';
}

addEventListener('load', function (evt) {
    //usage d'une fonction
    initialisationJS('Rémy');
    document.querySelector('form').addEventListener('submit', formSubmited);
    document.querySelector('form').addEventListener('submit',formReseted)
    //chargement initial des postit
    /*(new Crud(BASE_URL)).recuperer('/postit', function (mesPostits) {
        console.log('j\'ai fini de recevoir mes postil voici la liste;', mesPostits);
        mesPostits.forEach(function (postit) {
            if(lastID<postit.id)
            {
                lastID=postit.id;
            }
            console.log(postit);
            createPostitByObject(postit);
        });
    })*/
    pullingFunction();
    descripteurDInterval=setInterval(pullingFunction,5000);
});

const formReseted=(evt)=>{
    const form=document.forms['editor-form'];
    for(let i=0;i < form.lenght;i++)
    {
        if(form[i].type !=='reset' && form[i].type !== 'submit')
        {
            form[i].value='';
        }
    }
}

function formSubmited(evt) {
    evt.preventDefault(); //arret du rechargement de la page qui supprimerait le post-it
    //console.log('mon formulaire est "submit" ');
    console.log(evt.target[0].value);
    console.log(evt.target[1].value);
    console.log(evt.target[2].value);
    console.log(evt.target[3].value);
    var monFormulaire = document.forms['editor-form'];
    //var dateFormated=moment(monFormulaire['date'].value,'DD MM YYYY')
    //constitution de l'obket à envoyer au rest
    var postit = {
        titre: monFormulaire["titre"].value,
        datetime: monFormulaire["date"].value + 'T' + monFormulaire["time"].value,
        description: evt.target["description"].value
    };

    if(monFormulaire['id'].value!==''){
        postit.id=monFormulaire['id'].value;
    }


    (new Crud(BASE_URL)).envoiRessource('/postit',postit,function(objsaved){
        if(undefined !== postit.id)
        {
            document.querySelector('#postit-'+postit.id).remove();
        }
        createPostitByObject(objsaved);
        monFormulaire.reset();
    });
}    
//document.querySelector('form').addEventListener('submit', formSubmited);
//document permet de selectionner tous le document, queryselector pour aller chercher le formulaire form
//addevelistener(ce que l'on veut faire (ici submit à, la function lancée sans les parenthèse car on ne veut pas l'executer))



/** "faire /** puis entrer pour entrer toutes les éléménts @param qui seront définie dans la création du postit (créatePostit)" */
/**
 * 
 * @param {string} titre titre de la note
 * @param {String} date date ISO AAA-MM*JJ pour la note
 * @param {String} heure heure ISO HH:MM:SS pour la note
 * @param {*String} description description de la note
 */
function createPostit(titre, date, heure, description) {
    var postit = document.createElement('div');
    postit.classList.add('postit');
    postit.innerHTML = '<div class="close"><img src="img/Close.png"/> \
    </div><div class="postit-titre">' + titre + '</div> date : <span class="datetime">' + date + ' </span> heure : <span class:"datetime">' + heure + '</span>\
        <h2>Description</h2>'+ description;
    //pour sauter les lignes on met un "\"
    postit.querySelector('.close img').addEventListener('click', deletePostit)
    var liste = document.querySelector('#list');
    liste.append(postit);
}
/** exemple de lancement de la fonction : createPostit('mon titre','2020-01-02','00:00:00', 'description du content') */


/**fonction de création d'un postit avec ajour dand la balise di#list
*/
function createPostitByObject(postitInput) {
    //if(lastID<postitInput.id)
    var postit = document.createElement('div');
    //créationde l'id de balise en liens avec l'id du postit dans le rest
    //pour faciliter la suppression
    postit.id = 'postit-' + postitInput.id;
    postit.classList.add('postit');
    postit.addEventListener('dblclick',putinformclickedpostit);
    postit.innerHTML = '<div class="close"><img src="img/Close.png"/> \
    </div><div class="postit-titre">' + postitInput.titre + '</div> date : <span class="datetime postit-date">' + postitInput.datetime.substring(0, 10) + '</span> heure : <span class="datetime postit-heure">' + postitInput.datetime.substring(11) + '</span>\
        <h2>Description</h2><div class="postit-description">'+ postitInput.description+'</div>';
    //pour sauter les lignes on met un "\"

    //selection à partir de ".close.img" puis addeventlistener('click,deletePostit)
    postit.querySelector('.close img').addEventListener('click', deletePostit)
    var liste = document.querySelector('#list');
    liste.append(postit);
}

function deletePostit(evt) {
    evt.stopPropagation();
    //window.evt=evt; <--mis dans une variable globale pour avoir l'autocomplétion
    console.log('evenement lié à la suppresion d\'une note', evt);
    var domPostitId = evt.path[2].id.substring(7);
    (new Crud(BASE_URL)).supprimer('/postit/' + domPostitId, function () {
        evt.path[2].remove();
        //evt.currentTarget.parentElement.parentElement.remove();
    });
} 
//ParentELement en premier car cela correspond au parent de l'image close (la croix) puis le parent de la croix (donc le postit)
//Un élément est contenu dans une balise (ex <span> coucou </span>) un node contient l'ensemble du coup un élément c'est un noeud, un noeud n'est pas toujours un élément
function putinformclickedpostit(evt){
    console.log('j\ai double cliqué sur un postit',evt);
    var dompostit=evt.currentTarget;
    console.log(
        dompostit.id.substring(7),
        dompostit.querySelector('.postit-titre').innerText,
        dompostit.querySelector('.postit-date').innerText,
        dompostit.querySelector('.postit-heure').innerText,
        dompostit.querySelector('.postit-description').innerText
    );
    document.forms['editor-form']['id'].value=dompostit.id.substring(7);
    document.forms['editor-form']['titre'].value=dompostit.querySelector('.postit-titre').innerText;
    document.forms['editor-form']['date'].value=dompostit.querySelector('.postit-date').innerText;
    document.forms['editor-form']['time'].value=dompostit.querySelector('.postit-heure').innerText;
    document.forms['editor-form']['description'].value=dompostit.querySelector('.postit-description').innerText;

}

/**
 * Fonction pour récuperer les notes a partir de la valeur d'un id lastID
 */
const pullingFunction=()=>{
    let lastIdPlus1=lastID+1;
    (new Crud(BASE_URL)).recuperer('/postit?id_gte='+lastIdPlus1,(listeDesPostIt)=>{
        listeDesPostIt.map((element)=>{
            lastID=(lastID<element.id?element.id:lastID);
            createPostitByObject(element);
        });
    });
}

function getLastIdInDOM(){
    lastID=-1;
    const listechildren=document.querySelector('#liste').children;
    for(domPostit in listechildren){
        if(lasID<parseInt(domPostit.id.substring(1,7)))
        {
            lastID=domPostit.id.substring(7);
        }
    }
}