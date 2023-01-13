import { connection } from '../data/connection'
import { user } from '../types'

export default async function selectAllUsers(): Promise<user[]> {
    const result = await connection.raw(`
       SELECT * FROM labecommerce_users;
    `)

    return result[0];
};