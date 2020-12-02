/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2019, TASoft Applications
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

import String from "./String";
import Date from "./Date";
import Byte from "./byte";
import {Observer} from "./observer";
import Cookie from "./cookie"

(function($) {
    if(!window.Skyline) {
        window.Skyline = {
            guid : (function() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return function() {
                    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
                };
            })(),
            version: "0.8.1",
            keys: {
                TAB: 9,
                ENTER: 13,
                ESC: 27,
                ARROW_UP: 38,
                ARROW_DOWN: 40
            },
            tabPressed:false,
            keyDown:false,
            String,
            Date,
            Byte,
            Observer: new Observer(),
            Cookie
        };
    }
    document.addEventListener('keydown', function(e) {
        Skyline.keyDown = true;
        if (e.which === Skyline.keys.TAB || e.which === Skyline.keys.ARROW_DOWN || e.which === Skyline.keys.ARROW_UP) {
            Skyline.tabPressed = true;
        }
    }, true);
    document.addEventListener('keyup', function(e) {
        Skyline.keyDown = false;
        if (e.which === Skyline.keys.TAB || e.which === Skyline.keys.ARROW_DOWN || e.which === Skyline.keys.ARROW_UP) {
            Skyline.tabPressed = false;
        }
    }, true);
    document.addEventListener('focus', function(e) {
        if (Skyline.keyDown) {
            document.body.classList.add('keyboard-focused');
        }
    }, true);
    document.addEventListener('blur', function(e) {
        document.body.classList.remove('keyboard-focused');
    }, true);
})(window.jQuery);