import { connection } from '../data/connection';
import { purchase } from '../types';

export default async function selectPurchases(userId: string): Promise<purchase[]> {

    const result = await connection.raw(`
       SELECT * FROM labecommerce_purchases 
       WHERE user_id = '${userId}';
    `)

    return result[0];
};