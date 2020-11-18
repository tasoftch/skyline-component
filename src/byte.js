
export default {
    useDecimal: false,

    formats: [
        "B",
        "kB",
        "MB",
        "GB",
        "TB",
        "AB"
    ],

    format: function (value, format) {
        const f = this.useDecimal ? 1000 : 1024;
        let idx = 0;

        while (value > f) {
            idx++;
            value/=f;
        }
        if(!format)
            format = "%.1f%s";

        let unit = this.formats[idx];
        if(!unit)
            unit = "??";
        return Skyline.String.format(format, value, unit);
    }
}
