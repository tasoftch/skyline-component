
const _config = {
    raw:false,
    json:false,
    defaults: {}
};

const _encode = (s) => { return _config.raw ? s : encodeURIComponent(s) }
const _decode = (s) => { return _config.raw ? s : decodeURIComponent(s) }
const _strfyVal = (value) => { return _encode( _config.json ? JSON.stringify(value) : String(value) ) }
const _parseVal = (s) => {
    if(s.indexOf('"') === 0)
        s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    try{
        s = decodeURIComponent(s.replace(/\+/i, ' '));
        return _config.json ? JSON.parse(s) : s;
    }catch (e){}
}
const _read = (s, conv) => {s = _parseVal(s); return (typeof conv === 'function') ? conv(s) : s;}

export default {
    get config() { return _config; },

    set(name, value, options) {
        options = Object.assign({}, _config.defaults, options);
        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
        }
        return (document.cookie = [
            _encode(name), '=', _strfyVal(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path    ? '; path=' + options.path : '',
            options.domain  ? '; domain=' + options.domain : '',
            options.secure  ? '; secure' : ''
        ].join(''));
    },

    get(name, converter) {
        const cookies = document.cookie ? document.cookie.split("; ") : [];
        const result = name ? undefined : {};
        for(let e=0;e<cookies.length;e++) {
            let parts = cookies[e].split("="),
                nm = _decode(parts.shift()),
                cookie = parts.join("=");
            if(name === nm)
                return _read(cookie, converter);

            if(!name && (cookie = _read(cookie, converter)) !== undefined)
                result[nm] = cookie;
        }
        return result;
    },

    clear(name, options) {
        this.set(name, '', Object.assign({}, _config.defaults, options, {expires:-1}));
        return !this.get(name);
    }
}
