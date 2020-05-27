/** Style imports **/
import '../styles/main.scss';

/*** Polyfills ***/
/** Append **/
(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('append')) {
            return;
        }
        Object.defineProperty(item, 'append', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function append() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function (argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });

                this.appendChild(docFrag);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

/** Closest **/
(function(ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {return null}
        else return this.parentElement.closest(selector)
    };
}(Element.prototype));

/* Component imports */
import Calendar from "./calendar";
import Tooltip from "./tooltip";

const tooltip = new Tooltip('.tooltip');
tooltip.init();

const calendar = new Calendar('.main-calendar', tooltip);
calendar.init();

// Header button actions
const tooltipEl = document.querySelector('.tooltip');
const headerBtnEls = document.querySelector('.action-buttons');
const headerAddBtnEl = headerBtnEls.querySelector('.action-buttons__add');

headerAddBtnEl.addEventListener('click', (ev) => {
    tooltipEl.querySelector('.tooltip-fields__date').setAttribute('type', 'text');
    tooltip.showEv(null, '');
    let position = ev.target.getBoundingClientRect();
    tooltip.setPosition(position);
});
