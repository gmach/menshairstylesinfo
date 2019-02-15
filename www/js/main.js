/* Dynamically build nav menu - incomplete!
var newListItem = document.createElement('li');
var newListItemLink = document.createElement('a');
newListItemLink.setAttribute('href', '/?s=' + 'crewcut');
newListItemLink.innerHTML = 'Crew Cut';
newListItem.appendChild(newListItemLink);
navmenulist.appendChild(newListItem);
*/

function HairStyleInfo(style, title, description) {
    this.style = style;
    this.title = 'The ' + title;
    this.description = description;
    this.mainImage = '/' + style + '/' + style + 'main.jpg';
    this.image1 = '/' + style + '/' + style + '1.jpg';
    this.image2 = '/' + style + '/' + style + '2.jpg';
    this.image3 = '/' + style + '/' + style + '3.jpg';
}
function HairStyleInfo(data) {
    this.style = data.style;
    this.title = 'The ' + data.title;
    this.description = data.description;
    this.mainImage = '/' + data.style + '/' + data.style + 'main.jpg';
    this.image1 = '/' + data.style + '/' + data.style + '1.jpg';
    this.image2 = '/' + data.style + '/' + data.style + '2.jpg';
    this.image3 = '/' + data.style + '/' + data.style + '3.jpg';
}

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