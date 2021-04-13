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

let readChar = (aString, defaultChar) => {
    let r={c:defaultChar,r:0};
    if(typeof aString === 'string' && aString.length > 0) {
        if(aString.length === 1)
            r.r = aString * 1;
        else {
            r.c = aString.substr(0, 1);
            r.r = aString.substr(1) * 1;
        }
    }
    return r;
};

let applyPadding = (subject, charInfo) => {
    subject = `${subject}`;
    let r = Math.max(0, charInfo.r - subject.length);
    if(typeof charInfo.c === 'string')
        return charInfo.c.repeat(r);
    return "";
}


export default {
    formats: {
        s: (subject, options) => {
            let {modifier, flag} = options;
            let character = readChar("", ' ');
            let rev = false;

            if (modifier === "'") {
                character = readChar(flag, ' ');
            } else if (modifier === "-'") {
                character = readChar(flag, ' ');
                rev = true;
            } else if (modifier === '-') {
                character.r = flag * 1;
                rev = true;
            } else if (flag !== undefined)
                character.r = flag * 1;

            let padding = applyPadding(subject, character);

            if (rev)
                return `${padding}${subject}`;
            else
                return `${subject}${padding}`;
        },
        d: (subject, options) => {
            subject=Math.round(subject);
            subject = `${subject}`;

            let {flag} = options;
            let character = readChar(flag, "0");
            let padding = applyPadding(subject, character);
            return `${padding}${subject}`
        },
        x: (subject, options) => {
            let {flag} = options;
            let character = readChar(flag, "0");
            let padding = applyPadding(subject, character);
            let hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
            if (/^\d+$/.test(subject)) {
                let text = "";
                subject *= 1;
                while (subject) {
                    text = `${hex[subject % 0x10]}${text}`;
                    subject >>= 4;
                }
                return `${padding}${text}`;
            }
            return "";
        },
        X: (subject, options) => {
            let {flag} = options;
            let character = readChar(flag, "0");
            let padding = applyPadding(subject, character);
            let hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
            if (/^\d+$/.test(subject)) {
                let text = "";
                subject *= 1;
                while (subject) {
                    text = `${hex[subject % 0x10]}${text}`;
                    subject >>= 4;
                }
                return `${padding}${text}`;
            }
            return "";
        },
        f: (subject, options) => {
            let {modifier, flag} = options;
            if(modifier === '.') {
                flag = Math.min (16, flag);
                let fraction = Math.pow(10, flag);
                subject = ""+Math.round(subject*fraction)+"";
                let position = subject.length - flag;
                return [position<1?'0':subject.slice(0, position), ".", subject.slice(position)].join('');
            }
            return Math.round(subject*1e8)/1e8;
        },
        c: (subject) => {
            return String.fromCharCode(subject % 256);
        },
        C: (subject) => {
            return String.fromCharCode(subject * 1);
        }
    },

    format: function (format, ...args) {
        let fmtArray = format.split(/(%(?:[\-.]?\d+|-?'.\d+|)[a-z])/ig);
        let argCount = 0;

        return fmtArray.map((label) => {
            let pc = /^%(?:([\-.]?)(\d+)|(-?')(.\d+)|)([a-z])$/i.exec(label);
            if (pc) {
                let [, mod1, flag1, mod2, flag2, lb] = pc;
                let arg = args[argCount++];
                if (this.formats[lb]) {
                    if (arg === undefined) {
                        console.warn(`format ${format} missing argument at index ${argCount - 1}`);
                        return "";
                    }
                    return this.formats[lb].call(this, arg, {modifier: mod1 || mod2, flag: flag1 || flag2}) || "##";
                }
            }
            return label;
        }).join("");
    }
}
