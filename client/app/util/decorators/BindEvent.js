System.register(['../Obrigatorio.js'], function (_export, _context) {
    "use strict";

    var obrigatorio;
    function bindEvent(event = obrigatorio('event'), selector = obrigatorio('seletor'), prevent = true) {

        return function (target, propertyKey, descriptor) {

            Reflect.defineMetadata('bindEvent', { event, selector, prevent, propertyKey }, Object.getPrototypeOf(target), propertyKey);

            return descriptor;
        };
    }

    _export('bindEvent', bindEvent);

    return {
        setters: [function (_ObrigatorioJs) {
            obrigatorio = _ObrigatorioJs.obrigatorio;
        }],
        execute: function () {}
    };
});
//# sourceMappingURL=BindEvent.js.map