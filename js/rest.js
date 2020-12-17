

var BASE_URL = 'http://localhost:5629'
var Crud=function (baseurl) {
/**
 * Permet l'appel HTTP avec XMLHttpRequest
 * @param {Uri} ressourceURL chemin de la ressource
 */

function get(ressourceURL,clbk) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', baseurl + ressourceURL);
    xhr.onreadystatechange = function (evt) {
        if (evt.currentTarget.readyState < XMLHttpRequest.DONE) { return; }
        var objt = JSON.parse(evt.currentTarget.response);
        console.log(objt);
        clbk(objt);
    };
    xhr.send();
}

/**
 * Permet l'envoi en post d'une ressource sur l'ressourceUrl 
 * @param {Uri} ressourceUrl chemin du post
 * @param {object} ressource data a envoyer
 */

function post(ressourceUrl, ressource) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', baseurl + ressourceUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function (evt) {
        if (xhr.readyState < 4) { return; }
        console.log(JSON.parse(xhr.response));
    }
    xhr.send(JSON.stringify(ressource));
}

/**
 * 
 * @param {uri} ressourceUrl chemin de la ressource dans le serveur
 * @param {Function} clbk fonction à executer à la fin de la fonction
 */
function remove(ressourceUrl, clbk) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', baseurl + ressourceUrl);
    xhr.onreadystatechange = function (evt) {
        if (xhr.readyState < XMLHttpRequest.DONE || xhr.status != 200) { return; }
        //var objt = JSON.parse(xhr.response);
        //console.log(objt);
        clbk();
    };
    xhr.send();
}


/**
 * Mise à jour d'une source URL
 * @param {*} ressourceUrl 
 * @param {*} ressource 
 */
function put(ressourceUrl, ressource) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', baseurl + ressourceUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function (evt) {
        if (xhr.readyState < 4) { return; }
        console.log(JSON.parse(xhr.response));
    }
    xhr.send(JSON.stringify(ressource));
}

//zone d'exposition des fonctions necessaire pour l'appel des fonctions du crud
this.recuperer=get;
this.creer=post;
this.mettreAJour=put;
this.supprimer=remove;
}