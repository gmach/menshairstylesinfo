
// This IIFE demonstrates when calling await it only 'blocks' the current executing scope waiting
// until the promise resolves but continues any parent scope thread execution.
// If it is the main thread executing then it will pause as expected.
(async () => {
    async function someAsyncFn() {
        console.log(await new Promise(resolve => setTimeout(() => resolve('after 2 secs from first await'), 2000)));
    }
    someAsyncFn();
    console.log('after calling someAsyncFn function');
    console.log(await new Promise(resolve => setTimeout(() => resolve('after 1 sec from second await'), 1000)));
    console.log('after second await');
})();

// This function showcases 3 ways to wait for multiple asynchronous ajax calls
async function go() {
    let styles = ['buzzcut', 'caesar'];
    let promises = [];

    // 1. With Fetch API. Notice //.json() returns another promise so need 2 callback .then
    // Using ES6 Promises
    Promise.all(styles.map(style => fetch('/' + style + '/info.json')))
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(data => printData(data))
        .catch(err => console.error(err));
    // Using ES8 async/await
    promises = await Promise.all(styles.map(style => fetch('/' + style + '/info.json')));
    printData(await Promise.all(promises.map(res => res.json())));


    // 2. With XMLHttpRequest
    function getPromiseFromAjaxGet(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    };
    promises = [];
    styles.forEach(style =>
        promises.push(getPromiseFromAjaxGet(('/' + style +'/info.json'))));
    // Using ES6 Promises
    Promise.all(promises).then(jsonArr => printData(jsonArr));
    // Using ES8 async/await
    printData(await Promise.all(promises));


    // 3. With JQuery.
    function getPromiseFromJQueryGetJSON(url) {
        return new Promise(function(resolve, reject) {
            $.getJSON(url)
            .done(json => resolve(json))
            .fail((jqxhr, textStatus, error) => reject(error));
        });
    };
    promises = [];
    styles.forEach(style =>
        promises.push(getPromiseFromJQueryGetJSON(('/' + style +'/info.json'))));
    // Using ES6 Promises
    Promise.all(promises).then(jsonArr => printData(jsonArr));
    // Using ES8 async/await
    printData(await Promise.all(promises));

    function printData(data) {
        data.forEach(d => {
            if (typeof d == 'string')
                console.log(JSON.parse(d));
            else
                console.log(d);
        });
    }
}


/* Dynamically build nav menu - incomplete!
var newListItem = document.createElement('li');
var newListItemLink = document.createElement('a');
newListItemLink.setAttribute('href', '/?s=' + 'crewcut');
newListItemLink.innerHTML = 'Crew Cut';
newListItem.appendChild(newListItemLink);
navmenulist.appendChild(newListItem);
*/

//go();


$(function() {
    let s = window.location.search;
    let styleString = s.substring(3);
    if (styleString == "" || styleString == undefined)
        return console.error('Style Not Found!');
    let style = JSON.parse(sessionStorage.getItem(styleString));
    if(style) {
        displayStyle(style);
    } else {
        fetch('/' + styleString + '/info.json')
            .then(response => response.json())
        .then(data => {
            style = new HairStyleInfo(data);
            sessionStorage.setItem(styleString, JSON.stringify(style));
            displayStyle(style);
        }).catch(err => console.error(err));
    }

    function displayStyle(style) {
        document.title = style.title;
        document.getElementsByClassName('title')[0].innerHTML = style.title;
        document.getElementsByClassName('description')[0].innerHTML = style.description;
        document.getElementsByClassName('mainImage')[0].src = style.mainImage;
        document.getElementsByClassName('image1')[0].src = style.image1;
        document.getElementsByClassName('image2')[0].src = style.image2;
        document.getElementsByClassName('image3')[0].src = style.image3;
    }

});