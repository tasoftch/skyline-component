
export class PropertyList {
    constructor(object) {
        this.list = [];
        for(const p in object) {
            if(object.hasOwnProperty(p)) {
                this.list.push(p);
            }
        }
    }

    remove(item) {
        this.list.splice(this.list.indexOf(item), 1);
    }

    contains(item) {
        return this.list.indexOf(item) !== -1;
    }

    each(callback) {
        this.list.forEach(i=>{callback.call(i, i)});
    }

    get length() {
        return this.list.length;
    }
}
