/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, TASoft Applications
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */


export default {
    i18n: {
        months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        monthsShort: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        weekdaysAbbrev: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    },
    formats: {
        d: (date) => {
            return date.getDate();
        },
        dd: (date) => {
            let d = date.getDate();
            return (d < 10 ? '0' : '') + d;
        },
        ddd: function(date) {
            return this.i18n.weekdaysShort[date.getDay()];
        },
        dddd: function(date)  {
            return this.i18n.weekdays[date.getDay()];
        },
        m: (date) => {
            return date.getMonth() + 1;
        },
        mm: (date) => {
            let m = date.getMonth() + 1;
            return (m < 10 ? '0' : '') + m;
        },
        mmm: function(date) {
            return this.i18n.monthsShort[date.getMonth()];
        },
        mmmm: function(date) {
            return this.i18n.months[date.getMonth()];
        },
        yy: (date) => {
            return ('' + date.getFullYear()).slice(2);
        },
        yyyy: (date) => {
            return date.getFullYear();
        },
        g: (date) => {
            return date.getHours();
        },
        h: (date) => {
            let d = date.getHours() % 12;
            return d === 0 ? 12 : d;
        },
        H: (date) => {
            let d = date.getHours() % 12;
            d = d === 0 ? 12 : d;
            return (d < 10 ? '0' : '') + d;
        },
        G: (date) => {
            let d = date.getHours()
            return (d < 10 ? '0' : '') + d;
        },
        i: (date) => {
            let d = date.getMinutes();
            return (d < 10 ? '0' : '') + d;
        },
        s: (date) => {
            let d = date.getSeconds();
            return (d < 10 ? '0' : '') + d;
        },
        a: (date) => {
            let d = date.getHours();
            return d > 11 ? 'pm' : 'am';
        },
        A: (date) => {
            let d = date.getHours();
            return d > 11 ? 'PM' : 'AM';
        }
    },

    format: function (format, date) {
        let formatArray = format.split(/(d{1,4}|m{1,4}|y{4}|yy|A|a|G|g|H|h|i|s|!.)/g);
        if(date === undefined)
            date = new Date();

        return formatArray
            .map((label) => {
                if (this.formats[label]) {
                    return this.formats[label].call(this, date);
                }

                return label;
            })
            .join('');
    },

    isDate: (obj) => {
        return /Date/.test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
    },

    isWeekend: (date) => {
        let day = date.getDay();
        return day === 0 || day === 6;
    },

    setToDayBegin: function(date) {
        if (this.isDate(date)) date.setHours(0, 0, 0, 0);
    },

    setToDayEnd: function(date) {
        if (this.isDate(date)) date.setHours(23, 59, 59, 9999);
    },

    getDaysInMonth: function(year, month) {
        return [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][
            month
            ];
    },

    isLeapYear: (year) => {
        // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    },

    compareDates: function(a, b, byDay) {
        if(this.isDate(a) && this.isDate(b)) {
            if(byDay) {
                this.setToDayBegin(a);
                this.setToDayBegin(b);
            }

            let va = a.getTime();
            let vb = b.getTime();
            if(va < vb)
                return -1;
            if(va > vb)
                return 1;
            return 0;
        }
        return false;
    }
};