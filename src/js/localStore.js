/* LocalStorage object and methods for work with it */
export default {
    ls: window.localStorage ? window.localStorage : null,
    setItem(key, val) {
        if(this.ls) {
            let value = [];
            let found = false;
            if(this.getItem(key)) {
                value = JSON.parse(this.getItem(key));

                value = value.map(el => {
                    if(el.name == val.name) {
                        el = val;
                        found = true;
                    }
                    return el;
                })
                if(found) {
                    this.ls.setItem(key, JSON.stringify(value));
                    return false;
                } else {
                    value.push(val);
                    this.ls.setItem(key, JSON.stringify(value));
                    return true;
                }

            } else {
                value.push(val);
                this.ls.setItem(key, JSON.stringify(value));
                return true;
            }
        }
    },
    getItem(key) {
        if(this.ls) {
            return this.ls.getItem(key);
        }
    },
    clearAll() {
        if(this.ls) {
            return this.ls.clear();
        }
    }
};
