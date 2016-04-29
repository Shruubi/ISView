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
                Object.keys(arg).forEach((key) => elem.setAttribute(key, arg[key]));
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
     * map data to element of type el and mount results into container
     *
     * i.e. bind('li', [1, 2, 3, 4]) => <li>1</li><li>2</li><li>3</li><li>4</li>
     *
     * @param {Element} container
     * @param {string} el
     * @param {...string|object} data
     */
    bind: function(container, el, data) {
        let self = this;
        let mountPoint = self.el(container);

        data.forEach((val) => {
            let param = null;
            let elem = null;

            if(Array.isArray(val)) {
                param = [el, ...val];
                elem = self.el.call(null, ...param);
            } else {
                param = [el, val];
                elem = self.el.call(null, ...param);
            }

            self.mount(mountPoint, elem);
        });

        return mountPoint;
    }
};