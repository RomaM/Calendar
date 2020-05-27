import localStore from "./localStore";

export default class Calendar {
    constructor(wrap, tooltipInst) {
        this.wrapEl = ((typeof wrap) === 'string') ? document.querySelector(wrap) : wrap;
        this.tooltipInst = tooltipInst;
        this.calendarEl = this.wrapEl.querySelector('.calendar');
        this.today = new Date();
        this.currMonth = this.today.getMonth();
        this.currYear = this.today.getFullYear();
        this.switchInfoEl = document.querySelector('.switch__info');
        this.weekDays =
            ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
        this.weekDaysShort = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    }

    /* Static Method: Create Month frame */
    static getDateInfo(data) {
        const day = new Date(data.year, data.month, 0);
        switch (data.type) {
            case 'firstDay':
                return (new Date(data.year, data.month)).getDay();
                break;
            case 'daysAmount':
                return new Date(data.year, data.month, 0).getDate();
                break;
            case 'localMonth':
                return day.toLocaleString('default', { month: 'long' });
                break;
            default:
                console.log(`There is no case for this type - ${data.type}`);
                break;
        }
    }

    /* Method: Create Month frame */
    generateFrame(data = null) {
        // Get local month name
        const monthLLocal = Calendar.getDateInfo(
            {type: 'localMonth', year: this.currYear, month: +this.currMonth + 1}
        );

        // Set switch info - Month Year
        this.switchInfoEl.innerHTML = '';
        this.switchInfoEl.append(`${monthLLocal} ${this.currYear}`);

        this.calendarEl.innerHTML = '';
        let fragment = new DocumentFragment();
        const firstDay = +Calendar.getDateInfo(
            {type: 'firstDay', year: this.currYear, month: this.currMonth}
        );

        const daysAmount = Calendar.getDateInfo(
            {type: 'daysAmount', year: this.currYear, month: this.currMonth}
            );

        // Mobile day names
        for(let i = 0; i < 7; i++) {
            let item = document.createElement('div');
            item.classList.add('calendar-day', 'calendar-day--mobile');
            item.append(this.weekDaysShort[i % 7])
            fragment.append(item);
        }

        // Desktop day names
        for(let i = 0; i < 35; i++) {
            // Day cell creation for calendar
            let item = document.createElement('div');
            item.classList.add('calendar-day');

            let itemTitle = document.createElement('div');
            itemTitle.classList.add('calendar-title');

            let itemName = document.createElement('span');
            itemName.classList.add('calendar-title__name');
            itemName.append(this.weekDays[i % 7]);
            let itemNumber = document.createElement('span');
            itemNumber.classList.add('calendar-title__number');

            if(i + 1 >= firstDay && i < +daysAmount + firstDay) {
                let day = i + 2 - firstDay;
                itemName.append(', ')
                itemNumber.append(day.toString());
                item.dataset.date = `${this.currYear}/${this.currMonth}/${day}`;

                this.generateEvents(item);
                this.addShowListeners(item);
            } else {}

            itemTitle.append(itemName);
            itemTitle.append(itemNumber);
            item.append(itemTitle);
            fragment.append(item);
        }

        this.calendarEl.append(fragment);
    }

    /* Method: Fill events for the cell */
    generateEvents(cellEl) {
        const cellDate = cellEl.dataset.date;

        let events = localStore.getItem(cellDate.toString());
        events = events ? JSON.parse(events) : null;
        let fragment;
        if(events) {
            fragment = new DocumentFragment();
            events.map(ev => {
                let eventName = document.createElement('span');
                eventName.classList.add('calendar-day__event');
                eventName.append(ev.name);
                eventName.dataset.name = ev.name;
                fragment.append(eventName);
            });
            cellEl.append(fragment);
        }

    }

    /* Method: Add events for the cell */
    addShowListeners(cellEl) {
        const cellDate = cellEl.dataset.date;
        cellEl.addEventListener('click', (ev) => {
            let position = ev.target.getBoundingClientRect();

            if(ev.target.closest('.calendar-day__event')) {
                let eventsByDate = JSON.parse(localStore.getItem(cellEl.dataset.date));
                let evData = eventsByDate.find(el => el.name == ev.target.dataset.name);

                this.tooltipInst.showEv(evData, cellDate);
            } else if(ev.target.closest('.calendar-day')) {
                this.tooltipInst.showEv(null, cellDate);
            }

            this.tooltipInst.setPosition(position);
        });
    }

    /* Method: Recreate Month frame action */
    nextMonth() {
        this.currYear = (this.currMonth === 11) ? this.currYear + 1 : this.currYear;
        this.currMonth = (this.currMonth + 1) % 12;
        this.generateFrame({year: this.currYear, month: this.currMonth});
    }

    /* Method: Recreate Month frame action */
    prevMonth() {
        this.currYear = (this.currMonth === 0) ? this.currYear - 1 : this.currYear;
        this.currMonth = (this.currMonth === 0) ? 11 : this.currMonth - 1;
        this.generateFrame({year: this.currYear, month: this.currMonth});
    }

    /* Main Initialization Method */
    init() {
        this.generateFrame();

        const switchWrap = this.wrapEl.querySelector('.switch');

        switchWrap.addEventListener('click', (ev) => {
            this.tooltipInst.hideTt();
            ev.preventDefault();
            if(!ev.target.closest('button')) {
                return
            }
            switch(ev.target.closest('button').className) {
                case 'switch__today-btn':
                    this.currMonth = this.today.getMonth();
                    this.currYear = this.today.getFullYear();
                    this.generateFrame();
                    break;
                case 'switch__prev-btn':
                    this.prevMonth();
                    break;
                case 'switch__next-btn':
                    this.nextMonth();
                    break;
                default:
                    break;
            }
        });
    }
}