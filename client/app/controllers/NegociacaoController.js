System.register(['../domain/negociacao/Negociacoes.js', '../ui/views/NegociacoesView.js', '../ui/models/Mensagem.js', '../ui/views/MensagemView.js', '../domain/negociacao/NegociacaoService.js', '../util/DaoFactory.js', '../ui/converters/DataInvalidaException.js', '../domain/negociacao/Negociacao.js', '../util/Bind.js', '../ui/converters/DateConverter.js'], function (_export, _context) {
    "use strict";

    var Negociacoes, NegociacoesView, Mensagem, MensagemView, NegociacaoService, getNegociacaoDao, DataInvalidaException, Negociacao, Bind, DateConverter;
    return {
        setters: [function (_domainNegociacaoNegociacoesJs) {
            Negociacoes = _domainNegociacaoNegociacoesJs.Negociacoes;
        }, function (_uiViewsNegociacoesViewJs) {
            NegociacoesView = _uiViewsNegociacoesViewJs.NegociacoesView;
        }, function (_uiModelsMensagemJs) {
            Mensagem = _uiModelsMensagemJs.Mensagem;
        }, function (_uiViewsMensagemViewJs) {
            MensagemView = _uiViewsMensagemViewJs.MensagemView;
        }, function (_domainNegociacaoNegociacaoServiceJs) {
            NegociacaoService = _domainNegociacaoNegociacaoServiceJs.NegociacaoService;
        }, function (_utilDaoFactoryJs) {
            getNegociacaoDao = _utilDaoFactoryJs.getNegociacaoDao;
        }, function (_uiConvertersDataInvalidaExceptionJs) {
            DataInvalidaException = _uiConvertersDataInvalidaExceptionJs.DataInvalidaException;
        }, function (_domainNegociacaoNegociacaoJs) {
            Negociacao = _domainNegociacaoNegociacaoJs.Negociacao;
        }, function (_utilBindJs) {
            Bind = _utilBindJs.Bind;
        }, function (_uiConvertersDateConverterJs) {
            DateConverter = _uiConvertersDateConverterJs.DateConverter;
        }],
        execute: function () {
            class NegociacaoController {

                constructor() {

                    const $ = document.querySelector.bind(document);
                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');

                    this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView('#negociacoes'), 'adiciona', 'esvazia');

                    this._negociacoesView = new NegociacoesView('#negociacoes');

                    this._mensagem = new Bind(new Mensagem(), new MensagemView('#mensagemView'), 'texto');

                    this._mensagemView = new MensagemView('#mensagemView');

                    this._service = new NegociacaoService();

                    this._init();
                }

                _init() {

                    getNegociacaoDao().then(dao => dao.listaTodos()).then(negociacoes => negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))).catch(err => this._mensagem.texto = err);
                }

                adiciona(event) {

                    try {
                        event.preventDefault();

                        const negociacao = this._criaNegociacao();

                        getNegociacaoDao().then(dao => dao.adiciona(negociacao)).then(() => {

                            this._negociacoes.adiciona(negociacao);
                            this._mensagem.texto = 'Negociação adicionada com sucesso';
                            this._limpaFormulario();
                        }).catch(err => this._mensagem.texto = err);
                    } catch (err) {

                        console.log(err);
                        console.log(err.stack);

                        if (err instanceof DataInvalidaException) {

                            this._mensagem.texto = err.message;
                        } else {

                            this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte';
                        }
                    }
                }

                apaga() {

                    getNegociacaoDao().then(dao => dao.apagaTodos()).then(() => {

                        this._negociacoes.esvazia();
                        this._mensagem.texto = 'Negociações apagadas com sucesso';
                    }).catch(err => this._mensagem.texto = err);

                    this._mensagem.texto = 'Negociações apagadas com sucesso';
                }

                importarNegociacoes() {

                    this._service.obtemNegociacoesDoPeriodo().then(negociacoes => {

                        negociacoes.filter(novaNegociacao => !this._negociacoes.paraArray().some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente))).forEach(negociacao => this._negociacoes.adiciona(negociacao));

                        this._mensagem.texto = 'Negociações do período importadas com sucesso';
                    }).catch(err => this._mensagem.texto = err);
                }

                _limpaFormulario() {

                    this._inputData.value = '';
                    this._inputQuantidade.value = 1;
                    this._inputValor.value = 0.0;
                    this._inputData.focus();
                }

                _criaNegociacao() {

                    console.log('para data', DateConverter.paraData(this._inputData.value));

                    return new Negociacao(DateConverter.paraData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                }
            }

            _export('NegociacaoController', NegociacaoController);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map