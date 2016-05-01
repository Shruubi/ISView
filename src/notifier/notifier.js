/*
 * Event dispatch specific functions
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
    _registeredListeners: {},
    register: function(key, ctx, func) {
        //if key not in listeners, create an array
        if(!(key in this._registeredListeners)) {
            this._registeredListeners[key] = [];
        }

        //add item to listeners list
        this._registeredListeners[key].push({ callback: func, ctx: ctx });
    },
    notify: function(key, paramsArray) {
        let returnVal = true;

        if(!(key in this._registeredListeners)) {
            return false;
        }

        let collection = this._registeredListeners[key];
        collection.forEach((obj) => {
            obj.callback.call(obj.ctx, ...paramsArray);
        });

        return returnVal;
    }
};