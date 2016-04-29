module.exports = {
    _registeredListeners: {},
    register: function(key, ctx, func, paramArr) {
        //if key not in listeners, create an array
        if(!(key in this._registeredListeners)) {
            this._registeredListeners[key] = [];
        }

        //add item to listeners list
        this._registeredListeners[key].push({ callback: func, params: paramArr, ctx: ctx });
    },
    notify: function(key) {
        let returnVal = true;

        if(!(key in this._registeredListeners)) {
            return false;
        }

        let collection = this._registeredListeners[key];
        collection.forEach((obj) => {
            obj.callback.call(obj.ctx, ...obj.params);
        });

        return returnVal;
    }
};