export class Negociacoes {

    constructor(armadilha) {

        this._negociacoes = [];
        Object.freeze(this);
    }

    get volumeTotal() {

        return this._negociacoes
            .reduce((total, negociacao) => 
                total + negociacao.volume, 0);
    }

    adiciona(negociacao) {

        this._negociacoes.push(negociacao);
    }

    paraArray() {
        
        return this._negociacoes;
    }

    esvazia() {

        this._negociacoes.length = 0;
    }
}