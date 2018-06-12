function clearStyleAttribute(element, properties) {
    "use strict";
    var counter = 0;
    var pattern = /.?/;
    if (element.hasAttribute("style")) {
        for (counter = 0; counter < properties.length; counter++) {
            switch (properties[counter]) {
                case "position":
                    pattern = /\s*position:\s*[a-z\-]+;\s*/ig;
                    break;
                case "width":
                case "height":
                case "top":
                case "left":
                    pattern = "\\s*" + properties[counter] + ":\\s*\\-{0,1}[0-9]+(\\.[0-9]+)*(px|%);\\s*";
                    break;
                case "opacity":
                    pattern = /\s*opacity:\s*[0-9]+(\.[0-9]+)*;\s*/ig;
                    break;
                case "display":
                    pattern = /\s*display:\s*(block|none);\s*/ig;
                    break;
                case "margin":
                    pattern = /\s*margin(-top|-left|-right|-bottom):\s*(-)?[0-9]+(\.[0-9]+)*(px|%);\s*/ig;
                    break;
                case "z-index":
                    pattern = /\s*z-index:\s*[0-9]+;\s*/ig;
                    break;
                case "padding":
                    pattern = /\s*padding(-top|-left|-right|-bottom):\s*(-)?[0-9]+(\.[0-9]+)*(px|%);\s*/ig;
                    break;
                default:
                    break;
            }
            if (new RegExp(pattern).test(element.getAttribute("style")))
                element.setAttribute("style", element.getAttribute("style").replace(new RegExp(pattern), ""));
        }
        if (!element.getAttribute("style").length) element.removeAttribute("style");
    }
}
function addClassName(element, className) {
    "use strict";
    if (element.className.length) element.className = element.className + " ";
    if (!new RegExp(className).test(element.className)) element.className = element.className + className;
}
function clearClassName(element, className) {
    "use strict";
    element.className = element.className.replace(new RegExp(className), "");
    element.className = element.className.replace(/\s+$/ig, "");
    if (!element.className.length) element.removeAttribute("class");
}
function testClassName(element, className) {
    "use strict";
    if (new RegExp("\\b" + className + "\\b(?!-)").test(element.className)) return true;
    else return false;
}
/**
* Функция используется для определения позиции DOM-элемента относительно начала страницы;
* @param {HTMLElement} element DOM-элемент, для которого необходимо определить вертикальный и горизонтальный отступ
* относительно начала документа;
* @author Илья Кантор;
*/
function calculateOffset(element) {
    "use strict";
    //Получение ограничивающего прямоугольника элемента;
    var rectangle = element.getBoundingClientRect();
    //В переменных содержатся ссылки на DOM-элементы "body" и "html";
    var body = document.body;
    var HTML = document.documentElement;
    //Определение текущей горизонтальной и вертикальной прокрутки документа;
    var scrollTop = window.pageYOffset || HTML.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || HTML.scrollLeft || body.scrollLeft;
    //Получение сдвига DOM-элементов "body" и "html" относительно окна браузера;
    var clientTop = HTML.clientTop || body.clientTop || 0;
    var clientLeft = HTML.clientLeft || body.clientLeft || 0;
    //Получение координат элемента относительно начала страницы;
    var top  = rectangle.top +  scrollTop - clientTop;
    var left = rectangle.left + scrollLeft - clientLeft;
    return { "top": Math.round(top), "left": Math.round(left) };
}
function checkObject(value) {
    for (var key in value) {
        if (value.hasOwnProperty(key)) return true;
    }
    return false;
}
function selectElementByClassName(className, container, indicator) {
    "use strict";
    var counter = 1;
    var additoryObject = new Object();
    var result = new Object();
    //Если пользователь явно не указал контейнер, поиск будет проводиться по всему документу;
    if (!container) container = document;
    additoryObject = container.getElementsByClassName(className);
    //Удаление лишних DOM-элементов;
    if (indicator && additoryObject.length > 1) {
        for (counter; counter < additoryObject.length; counter++)
            additoryObject[counter].parentNode.removeChild(additoryObject[counter]);
    }
    //Формирование ответа;
    if (!additoryObject.length) result = {"status": false};
    else result = {"status": true, "element": additoryObject[0]};
    return result;
}
function searchContainer(element, attributeTitle, attributeValue) {
    "use strict";
    var indicator = false;
    while (!indicator && element.nodeName !== "BODY") {
        switch (attributeTitle) {
            case "class":
                if (testClassName(element, attributeValue)) indicator = true;
                break;
            case "id":
                if (element.id === attributeValue) indicator = true;
                break;
            case "nodeName":
                if (element.nodeName === attributeValue) indicator = true;
                break;
            default: break;
        }
        if (!indicator) element = element.parentNode;
    }
    return {"status": indicator, "element": element};
}
/**
 * Функция для уведомления об возникновении ошибки;
 * @param {string} value Название класса или идентификатора;
 * @param {number} type Вид уведомления (1 - отсутствие класса у элемента,
 * 2 - не найдены элементы искомого класса, 3 - не найден элемент с идентификатором);
 */
function notify(value, type) {
    "use strict";
    if (type) {
        switch (parseInt(type)) {
            //Для сообщений об неудачном поиске DOM-элементов с указанным классом;
            case 1:
                console.error("DOM-элемент должен иметь класс '" + value + "';");
                break;
            case 2:
                console.error("Не найдено ни одного DOM-элемента с классом '" + value + "';");
                break;
            //Для сообщений об неудачном поиске DOM-элементов с указанным идентификатором;
            case 3:
                console.error("Не найден DOM-элемент с идентификатором '" + value + "';");
                break;
            default:
                console.error("Возникла ошибка;");
                break;
        }
    } else console.error(value);
}