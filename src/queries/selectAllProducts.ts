import { connection } from '../data/connection'
import { product } from '../types'

export default async function selectAllProducts(order: string, search: string, sort: string): Promise<product[]> {
    let result;

    if (!sort) {
        result = await connection.raw(`
        SELECT * FROM labecommerce_products
        WHERE name LIKE "%${search}%";
     `)
    } else {
        result = await connection.raw(`
        SELECT * FROM labecommerce_products
        WHERE name LIKE "%${search}%"
        ORDER BY ${sort} ${order};
     `)
    }

    return result[0];
};