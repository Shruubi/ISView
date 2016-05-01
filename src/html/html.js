/*
 * HTML specific functions
 * Copyright (C) 2016 Damon Swayn <me@shruubi.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

module.exports = {
    /**
     * @param {...string|object} args
     * @returns {Element}
     */
    el: function (args) {
        let elem = document.createElement(args);
        for(let i = 1; i < arguments.length; i++) {
            let arg = arguments[i];
            if(arg !== null && typeof arg === 'object') {
                if(arg instanceof Element) {
                    this.mount(elem, arg);
                } else {
                    Object.keys(arg).forEach((key) => elem.setAttribute(key, arg[key]));
                }
            } else {
                elem.textContent = arg;
            }
        }

        return elem;
    },
    /**
     * @param {string|Element} coreMount
     * @param {Element} el
     */
    mount: function (coreMount, el) {
        let core = null;

        if(coreMount !== null && typeof coreMount === 'string') {
            //coreMount is a selector string
            core = document.querySelector(coreMount);
        } else {
            //coreMount is an element object
            core = coreMount;
        }

        core.appendChild(el);
    },
    /**
     * ISView.html.bind(mount, 'li', [...], (val, index) => { ... }, (val, index) => { ... })
     */
    bind: function(parameters) {
        var mountPoint = parameters.mountPoint;
        var elemType = parameters.elemType;
        var data = parameters.data;
        var renderCallback =  parameters.renderCallback !== undefined && parameters.renderCallback !== null ? parameters.renderCallback : (val) => { return val; };
        var attrsCallback = parameters.attrsCallback !== undefined && parameters.attrsCallback !== null ? parameters.attrsCallback : () => { return {}; };
        var self = this;

        data.forEach((val, index) => {
            let elem = self.el(elemType, attrsCallback(val, index), renderCallback(val, index));
            self.mount(mountPoint, elem);
        });

        return mountPoint;
    }
};