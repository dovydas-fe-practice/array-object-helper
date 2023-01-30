;(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["exports"], factory)
    } else if (typeof exports === "object" && typeof exports.lib !== "string") {
        // CommonJS
        factory(exports)
    } else {
        // Browser globals
        factory((root.lib = {}))
    }
})(typeof self !== "undefined" ? self : this, function (exports) {
    "use strict"
    let chainValue = undefined
    let isChain = false

    // array
    function chain(array) {
        validateArrayArgument(array)

        chainValue = array
        isChain = true

        return this
    }

    function map(array, callback) {
        if (isChain) {
            callback = array
            array = chainValue
        } else {
            validateArrayArgument(array)
        }

        let mappedArray = []

        for (let i = 0; i < array.length; i++) {
            mappedArray[i] = callback(array[i], i)
        }

        if (isChain) {
            chainValue = mappedArray

            return this
        }

        return mappedArray
    }

    function reduce(array, callback, initialValue) {
        if (isChain) {
            initialValue = callback
            callback = array
            array = chainValue
        } else {
            validateArrayArgument(array)
        }

        validateArrayArgument(array)

        for (let i = 0; i < array.length; i++) {
            if (initialValue === undefined) {
                initialValue = array[0]

                continue
            }

            initialValue = callback(initialValue, array[i], i)
        }

        if (isChain) {
            chainValue = initialValue

            return this
        }

        return initialValue
    }

    function filter(array, callback) {
        if (isChain) {
            callback = array
            array = chainValue
        } else {
            validateArrayArgument(array)
        }

        let mappedArray = []

        for (let i = 0; i < array.length; i++) {
            if (!callback(array[i], i)) {
                continue
            }

            mappedArray[mappedArray.length] = array[i]
        }

        if (isChain) {
            chainValue = mappedArray

            return this
        }

        return mappedArray
    }

    function forEach(array, callback) {
        if (isChain) {
            callback = array
            array = chainValue
        } else {
            validateArrayArgument(array)
        }

        for (let i = 0; i < array.length; i++) {
            callback(array[i], i)
        }

        if (isChain) {
            return this
        }

        return array
    }

    function take(array, count) {
        if (isChain) {
            count = array
            array = chainValue
        } else {
            validateArrayArgument(array)
        }

        if (!Number.isInteger(count) || count <= 0) {
            if (isChain) {
                chainValue = []
                return this
            }

            return []
        }

        if (array.length < count) {
            return isChain ? this : array
        }

        const items = []

        for (let i = 0; i < count; i++) {
            items[i] = array[i]
        }

        if (isChain) {
            chainValue = items

            return this
        }

        return items
    }

    function skip(array, count) {
        if (isChain) {
            count = array
            array = chainValue
        }

        validateArrayArgument(array)

        if (!Number.isInteger(count) || count <= 0) {
            return isChain ? this : array
        }

        if (array.length < count) {
            if (isChain) {
                chainValue = []

                return this
            }

            return []
        }

        const items = []

        for (let i = 0; i < array.length; i++) {
            if (i < count) {
                continue
            }

            items[items.length] = array[i]
        }

        if (isChain) {
            chainValue = items

            return this
        }

        return items
    }

    function some(array, callback) {
        if (isChain) {
            callback = array
            array = chainValue
        } else {
            validateArrayArgument(array)
        }

        let returnValue = false

        for (let i = 0; i < array.length; i++) {
            if (callback(array[i], i)) {
                returnValue = true

                break
            }
        }

        if (isChain) {
            chainValue = returnValue

            return this
        }

        return returnValue
    }

    function every(array, callback) {
        if (isChain) {
            callback = array
            array = chainValue
        } else {
            validateArrayArgument(array)
        }

        let returnValue = true

        for (let i = 0; i < array.length; i++) {
            if (!callback(array[i], i)) {
                returnValue = false

                break
            }
        }

        if (isChain) {
            chainValue = returnValue

            return this
        }

        return returnValue
    }

    function max(array) {
        if (isChain) {
            array = chainValue
        } else {
            validateArrayArgument(array)
        }

        let max = array[0]

        for (let i = 1; i < array.length; i++) {
            if (!Number.isInteger(array[i])) {
                return NaN
            }

            max = array[i] > max ? array[i] : max
        }

        if (isChain) {
            chainValue = max

            return this
        }

        return max
    }

    function min(array) {
        if (isChain) {
            array = chainValue
        } else {
            validateArrayArgument(array)
        }

        let min = array[0]

        for (let i = 1; i < array.length; i++) {
            if (!Number.isInteger(array[i])) {
                return NaN
            }

            min = array[i] < min ? array[i] : min
        }

        if (isChain) {
            chainValue = min

            return this
        }

        return min
    }

    function value() {
        return chainValue
    }

    // object

    function keys(obj) {
        validateObjectArgument(obj)
        const keys = []

        for (const objKey in obj) {
            keys.push(objKey)
        }

        return keys
    }

    function values(obj) {
        validateObjectArgument(obj)
        const values = []

        for (const objKey in obj) {
            values.push(obj[objKey])
        }

        return values
    }

    function pairs(obj) {
        validateObjectArgument(obj)
        const values = []

        for (const objKey in obj) {
            values.push([objKey, obj[objKey]])
        }

        return values
    }

    function fromPairs(array) {
        validateArrayArgument(array)

        const values = {}

        for (let i = 0; i < array.length; i++) {
            values[array[i][0]] = array[i][1]
        }

        return values
    }

    // private
    function validateArrayArgument(array) {
        if (array.constructor === Array) {
            return array
        }

        console.error("Argument is not an array")
        throw new Error()
    }

    function validateObjectArgument(obj) {
        if (obj === Object(obj)) {
            return obj
        }

        console.error("Argument is not an object")
        throw new Error()
    }

    exports.map = map
    exports.reduce = reduce
    exports.filter = filter
    exports.forEach = forEach
    exports.take = take
    exports.skip = skip
    exports.some = some
    exports.every = every
    exports.max = max
    exports.min = min
    exports.chain = chain
    exports.value = value

    exports.keys = keys
    exports.values = values
    exports.pairs = pairs
    exports.fromPairs = fromPairs
})
