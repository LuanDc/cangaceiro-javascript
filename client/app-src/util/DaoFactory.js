import { ConnectionFactory } from './ConnectionFactory';
import { NegociacaoDao } from '../domain/negociacao/NegociacaoDao';

export async function getNegociacaoDao() {

    const conn = await ConnectionFactory.getConnection();
    return new NegociacaoDao(conn);
}
