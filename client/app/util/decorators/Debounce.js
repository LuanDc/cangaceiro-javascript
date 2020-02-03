System.register([], function (_export, _context) {
    "use strict";

    function debouce(milissegundos = 500) {

        return function (target, key, descriptor) {

            const metodoOriginal = descriptor.value;

            let timer = 0;
            descriptor.value = function (...args) {
                clearTimeout(timer);

                timer = setTimeout(() => metodoOriginal.apply(this, args), milissegundos);
            };

            return descriptor;
        };
    }

    _export("debouce", debouce);

    return {
        setters: [],
        execute: function () {}
    };
});
//# sourceMappingURL=Debounce.js.map