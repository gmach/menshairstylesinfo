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