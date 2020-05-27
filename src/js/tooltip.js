import localStore from "./localStore";

export default class Tooltip {
    constructor(tooltip) {
        this.tooltipEl = ((typeof tooltip) === 'string') ? document.querySelector(tooltip) : tooltip;
        this.tooltipElDate = this.tooltipEl.querySelector('.tooltip-fields__date');
        this.tooltipElName = this.tooltipEl.querySelector('.tooltip-fields__name');
        this.tooltipElMembers = this.tooltipEl.querySelector('.tooltip-fields__members');
        this.tooltipElDesc = this.tooltipEl.querySelector('.tooltip-fields__desc');
        this.tooltipElClose = this.tooltipEl.querySelector('.tooltip__close');
        this.tooltipElSave = this.tooltipEl.querySelector('.tooltip-actions__save');
        this.tooltipElCancel = this.tooltipEl.querySelector('.tooltip-actions__cancel');
    }

    /* Method: Set tooltip element position */
    setPosition(position) {
        const centerPos = document.documentElement.clientWidth / 2;
        this.tooltipEl.style.top = `${position.bottom}px`;

        if(centerPos > position.right && centerPos > 500) {
            this.tooltipEl.style.left = `${position.left}px`;
            this.tooltipEl.classList.remove('tooltip__right-bottom');
            this.tooltipEl.classList.remove('tooltip__full');
        } else if (centerPos > 500) {
            let left = position.right - this.tooltipEl.clientWidth;
            this.tooltipEl.style.left = `${left}px`;
            this.tooltipEl.classList.remove('tooltip__full');
            this.tooltipEl.classList.add('tooltip__right-bottom');
        } else {
            this.tooltipEl.style.top = '0px';
            this.tooltipEl.style.left ='0px';
            this.tooltipEl.classList.remove('tooltip__right-bottom');
            this.tooltipEl.classList.add('tooltip__full');
        }
    }

    /* Method: Show Event Item with data if not empty */
    showEv(dataObj, date) {
        if (dataObj) {
            this.showTt();
            this.tooltipEl.dataset.date = date;
            this.tooltipElDate.value = date;
            this.tooltipElName.value = dataObj.name;
            this.tooltipElMembers.value = dataObj.members;
            this.tooltipElDesc.value = dataObj.desc;
        } else {
            this.showTt();
            this.tooltipEl.dataset.date = date;
            this.tooltipElDate.value = date;
            this.tooltipElName.value = '';
            this.tooltipElMembers.value = '';
            this.tooltipElDesc.value = '';
        }

    }

    /* Method: Save with external callback */
    saveTt(cb) {
        cb();
        this.hideTt();
    }

    /* Method: Hide Tooltip */
    hideTt() {
        this.tooltipEl.classList.add('hidden');
        this.tooltipElDate.setAttribute('type', 'hidden');
    }

    /* Method: Show Tooltip */
    showTt() {
        this.tooltipEl.classList.remove('hidden');
    }

    /* Main Initialization Method */
    init() {
        this.hideTt();
        this.tooltipElClose.addEventListener('click', (ev) => {
            this.hideTt();
        });

        this.tooltipElCancel.addEventListener('click', (ev) => {
            this.hideTt();
        });


        this.tooltipElSave.addEventListener('click', (ev) => {
            const inputField = this.tooltipEl.querySelector('.tooltip-fields__date');
            let keyDate = this.tooltipEl.dataset.date || inputField.value;
            let eventData = {
                name: this.tooltipElName.value,
                members: this.tooltipElMembers.value,
                desc: this.tooltipElDesc.value
            };
            let newAdded = localStore.setItem(keyDate, eventData);
            let elToRefresh = document.querySelector(`.calendar-day[data-date='${keyDate}']`);

            if(newAdded) {
                let eventName = document.createElement('span');
                eventName.classList.add('calendar-day__event');
                eventName.append(eventData.name);
                eventName.dataset.name = eventData.name;
                elToRefresh.append(eventName);
            }

            this.tooltipElDate.setAttribute('type', 'hidden');
            this.hideTt();
        });


    }
}