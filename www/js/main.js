var asymmetrical = new HairStyleInfo('asymmetrical', 'Asymmetrical', '');
var businessman = new HairStyleInfo('businessman', 'Buiness Man', '');
var buzzcut = new HairStyleInfo('buzzcut', 'Buzz Cut', '');
var caesar = new HairStyleInfo('caesar', 'Caesar', '');
var crewcut = new HairStyleInfo('crewcut', 'Crew Cut', '');
var fauxhawk = new HairStyleInfo('fauxhawk', 'Faux Hawk', '');
var highandtight = new HairStyleInfo('highandtight', 'High and Tight', '');
var mohawk = new HairStyleInfo('mohawk', 'Mohawk', '');
var pompadour = new HairStyleInfo('pompadour', 'Pompadour', '');
var quiff = new HairStyleInfo('quiff', 'Quiff', '');
var skinfade = new HairStyleInfo('skinfade', 'Skin Fade', '');
var slickedback = new HairStyleInfo('slickedback', 'Slicked Back', '');
var spikyhair = new HairStyleInfo('spikyhair', 'Spiky Hair', '');
var undercut = new HairStyleInfo('undercut', 'Undercut', '');
var hairstyles =  { asymmetrical: asymmetrical,
                    businessman: businessman,
                    buzzcut: buzzcut,
                    caesar: caesar,
                    crewcut: crewcut,
                    fauxhawk: fauxhawk,
                    highandtight: highandtight,
                    mohawk: mohawk,
                    pompadour: pompadour,
                    quiff: quiff,
                    skinfade: skinfade,
                    slickedback: slickedback,
                    spikyhair: spikyhair,
                    undercut: undercut }

                    /*
var navmenulist = document.getElementById('navmenulist');
var newListItem = document.createElement('li');
var newListItemLink = document.createElement('a');
newListItemLink.setAttribute('href', '/?s=' + 'crewcut');
newListItemLink.innerHTML = 'Crew Cut';
newListItem.appendChild(newListItemLink);
navmenulist.appendChild(newListItem);
*/

Object.keys(hairstyles).forEach(function(style) {
    $.get('/' + style + '/info', function(data) {
        hairstyles[style].description = data;
    }, 'text');
})

$(function() {
    let s = window.location.search;
    let styleString = s.substring(3);
    let style = hairstyles[styleString];
    if (styleString != "" & style != undefined) {
        document.title = style.title;
        document.getElementsByClassName('title')[0].innerHTML = style.title;
        document.getElementsByClassName('description')[0].innerHTML = style.description;
        document.getElementsByClassName('mainImage')[0].src = style.mainImage;;
        document.getElementsByClassName('image1')[0].src = style.image1;
        document.getElementsByClassName('image2')[0].src = style.image2;
        document.getElementsByClassName('image3')[0].src = style.image3;
    }
});