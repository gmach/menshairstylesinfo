function HairStyleInfo(style, title, description) {
    this.style = style;
    this.title = 'The ' + title;
    this.description = description;
    this.mainImage = '/' + style + '/' + style + 'main.jpg';
    this.image1 = '/' + style + '/' + style + '1.jpg';
    this.image2 = '/' + style + '/' + style + '2.jpg';
    this.image3 = '/' + style + '/' + style + '3.jpg';
}