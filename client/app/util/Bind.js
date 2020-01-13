class Bind {

    constructor(model, view, props) {

        const proxy = ProxyFactory.create(model, props, model => {
            
        });
    }
}