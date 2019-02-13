/*
var newListItem = document.createElement('li');
var newListItemLink = document.createElement('a');
newListItemLink.setAttribute('href', '/?s=' + 'crewcut');
newListItemLink.innerHTML = 'Crew Cut';
newListItem.appendChild(newListItemLink);
navmenulist.appendChild(newListItem);
*/


$(function() {
    var styles = ['buzzcut', 'caesar'];
    Promise.all(styles.map(style => fetch('/' + style + '/info.json'))).then(responses =>
    Promise.all(responses.map(res => res.json()))).then(data => {  //.json() returns another promise!
        console.log(data);
        console.log('end');
    }).catch(err => console.error(err));

    let s = window.location.search;
    let styleString = s.substring(3);
    if (styleString == "" || styleString == undefined)
        return console.error('Style Not Found!');
    fetch('/' + styleString + '/info.json')
        .then(response => response.json())
        .then(data => {
            let style = new HairStyleInfo(data);
            document.title = style.title;
            document.getElementsByClassName('title')[0].innerHTML = style.title;
            document.getElementsByClassName('description')[0].innerHTML = style.description;
            document.getElementsByClassName('mainImage')[0].src = style.mainImage;;
            document.getElementsByClassName('image1')[0].src = style.image1;
            document.getElementsByClassName('image2')[0].src = style.image2;
            document.getElementsByClassName('image3')[0].src = style.image3;
        }).catch(err => console.error(err));

});