import { ConnectionFactory } from './ConnectionFactory.js';
import { NegociacaoDao } from '../domain/negociacao/NegociacaoDao.js';

export async function getNegociacaoDao() {

    const conn = await ConnectionFactory.getConnection();
    return new NegociacaoDao(conn);
}
