// // Task 1: Circle

// class Circle {
//     #radius;

//     constructor(radius) {
//         this.radius = radius;
//     }

//     get radius() {
//         return this.#radius;
//     }

//     set radius(value) {
//         if (!Number.isFinite(value) || value < 0) {
//             throw new Error("Радіус має бути невід'ємним числом.");
//         }

//         this.#radius = value;
//     }

//     get diameter() {
//         return this.#radius * 2;
//     }

//     getArea() {
//         return Math.PI * this.#radius * this.#radius;
//     }

//     getLength() {
//         return 2 * Math.PI * this.#radius;
//     }
// }

// let circle = new Circle(5);

// console.log("Радіус:", circle.radius); // 5
// console.log("Діаметр:", circle.diameter); // 10
// console.log("Площа:", circle.getArea().toFixed(2)); // 78.54
// console.log("Довжина:", circle.getLength().toFixed(2)); // 31.42

// circle.radius = 10;

// console.log("Новий радіус:", circle.radius); // 10
// console.log("Новий діаметр:", circle.diameter); // 20
// console.log("Нова площа:", circle.getArea().toFixed(2)); // 314.16
// console.log("Нова довжина:", circle.getLength().toFixed(2)); // 62.83


// // Task 2: HTML ELEMENT

// class HtmlElement {
//     constructor(tagName, isSelfClosing = false, text = "") {
//         this.tagName = tagName;
//         this.isSelfClosing = isSelfClosing;
//         this.text = text;
//         this.attributes = [];
//         this.styles = [];
//         this.children = [];
//     }

//     setAttribute(name, value) {
//         for (let i = 0; i < this.attributes.length; i++) {
//             if (this.attributes[i].name === name) {
//                 this.attributes[i].value = value;
//                 return;
//             }
//         }

//         this.attributes.push({
//             name: name,
//             value: value
//         });
//     }

//     setStyle(name, value) {
//         for (let i = 0; i < this.styles.length; i++) {
//             if (this.styles[i].name === name) {
//                 this.styles[i].value = value;
//                 return;
//             }
//         }

//         this.styles.push({
//             name: name,
//             value: value
//         });
//     }

//     appendChild(element) {
//         this.children.push(element);
//     }

//     prependChild(element) {
//         this.children.unshift(element);
//     }

//     getHtml() {
//         let html = "<" + this.tagName;

//         // Додаємо атрибути.
//         for (let i = 0; i < this.attributes.length; i++) {
//             let attribute = this.attributes[i];

//             html += " " + attribute.name
//                 + '="' + attribute.value + '"';
//         }

      
//         if (this.styles.length > 0) {
//             html += ' style="';

//             for (let i = 0; i < this.styles.length; i++) {
//                 html += this.styles[i].name
//                     + ":" + this.styles[i].value + ";";
//             }

//             html += '"';
//         }

        
//         if (this.isSelfClosing) {
//             return html + " />";
//         }

//         html += ">" + this.text;

     
//         for (let i = 0; i < this.children.length; i++) {
//             html += this.children[i].getHtml();
//         }

//         html += "</" + this.tagName + ">";

//         return html;
//     }
// }

// let loremText =
//     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
//     + "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
//     + "when an unknown printer took a galley of type and scrambled it to make a type specimen book.";


// function createCard(useClasses) {
//     let card = new HtmlElement("div");

//     let heading = new HtmlElement(
//         "h3",
//         false,
//         "What is Lorem Ipsum?"
//     );

//     let image = new HtmlElement("img", true);
//     let paragraph = new HtmlElement("p", false, loremText + " ");
//     let link = new HtmlElement("a", false, "More...");

//     image.setAttribute("src", "lipsum.jpg");
//     image.setAttribute("alt", "Lorem Ipsum");

//     link.setAttribute("href", "https://www.lipsum.com/");
//     link.setAttribute("target", "_blank");

//     if (useClasses) {
//         card.setAttribute("class", "block");
//         image.setAttribute("class", "img");
//         paragraph.setAttribute("class", "text");
//     } else {
//         card.setStyle("width", "300px");
//         card.setStyle("margin", "10px");
//         image.setStyle("width", "100%");
//         paragraph.setStyle("text-align", "justify");
//     }

//     paragraph.appendChild(link);

//     card.appendChild(image);
//     card.appendChild(paragraph);

//     // Заголовок додаємо на початок картки.
//     card.prependChild(heading);

//     return card;
// }

// let wrapper = new HtmlElement("div");

// wrapper.setAttribute("id", "wrapper");
// wrapper.setStyle("display", "flex");

// for (let i = 0; i < 2; i++) {
//     wrapper.appendChild(createCard(false));
// }

// if (typeof document !== "undefined") {
//     document.write(wrapper.getHtml());
// }



// //Task 3: CSS CLASS
// class CssClass {
//     constructor(name) {
//         this.name = name;
//         this.styles = [];
//     }

//     setStyle(name, value) {
//         for (let i = 0; i < this.styles.length; i++) {
//             if (this.styles[i].name === name) {
//                 this.styles[i].value = value;
//                 return;
//             }
//         }

//         this.styles.push({
//             name: name,
//             value: value
//         });
//     }

//     removeStyle(name) {
//         for (let i = 0; i < this.styles.length; i++) {
//             if (this.styles[i].name === name) {
//                 this.styles.splice(i, 1);
//                 return true;
//             }
//         }

//         return false;
//     }

//     getCss() {
//         let css = "." + this.name + " {\n";

//         for (let i = 0; i < this.styles.length; i++) {
//             css += "    " + this.styles[i].name
//                 + ": " + this.styles[i].value + ";\n";
//         }

//         return css + "}\n";
//     }
// }

// let wrapClass = new CssClass("wrap");
// wrapClass.setStyle("display", "flex");

// let blockClass = new CssClass("block");
// blockClass.setStyle("width", "300px");
// blockClass.setStyle("margin", "10px");

// let imageClass = new CssClass("img");
// imageClass.setStyle("width", "100%");

// let textClass = new CssClass("text");
// textClass.setStyle("text-align", "justify");


// textClass.setStyle("color", "red");
// console.log(textClass.getCss());

// textClass.removeStyle("color");
// console.log(textClass.getCss());


// // Task 4: HTML BLOCK

// class HtmlBlock {
//     constructor(cssClasses, rootElement) {
//         this.cssClasses = cssClasses;
//         this.rootElement = rootElement;
//     }

//     getCode() {
//         let code = "<style>\n";

//         for (let i = 0; i < this.cssClasses.length; i++) {
//             code += this.cssClasses[i].getCss();
//         }

//         code += "</style>\n";
//         code += this.rootElement.getHtml();

//         return code;
//     }
// }

// let wrapperWithClasses = new HtmlElement("div");


// wrapperWithClasses.setAttribute("id", "wrapper-css");
// wrapperWithClasses.setAttribute("class", "wrap");

// for (let i = 0; i < 2; i++) {
//     wrapperWithClasses.appendChild(createCard(true));
// }

// let htmlBlock = new HtmlBlock(
//     [wrapClass, blockClass, imageClass, textClass],
//     wrapperWithClasses
// );

// if (typeof document !== "undefined") {
//     document.write(htmlBlock.getCode());
// }