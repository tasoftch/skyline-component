import {PropertyList} from "./property-list";

export class Observer {
    constructor() {
        this.observers = [];
    }

    addObserver(observer, object, properties) {
        if(!properties)
            properties = this.getPropertyList(object);

        const trigger = (o, v, k) => {
            if(typeof observer === 'function')
                observer({old:o,new:v,key:k});
            else if(typeof observer === 'object') {
                if(typeof observer.changed === 'function')
                    observer.changed({old:o,new:v,key:k});
                else if(typeof observer[k] === 'function')
                    observer[k]({old:o,new:v});
            }
        };

        if(properties instanceof PropertyList) {
            properties.each(c=>{
                let setting = 0;
                object.__defineSetter__(c, (v) => {
                    let o = object["_"+c];
                    object["_"+c] = v;
                    trigger(o, v, c);
                });
                object.__defineGetter__(c, () => {
                    return object["_"+c];
                })
            });
        }
    }

    getPropertyList(object) {
        return new PropertyList(object);
    }

    eachProperty(object, fn) {
        const p = this.getPropertyList(object);
        p.each((c)=>{
            fn(object[c], c);
        })
    }
}
