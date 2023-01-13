import { connection } from '../data/connection'

export default async function insertUser(id: string, name: string, email: string, password: string): Promise<void> {
    await connection.raw(`
       INSERT INTO labecommerce_users (id, name, email, password)
       VALUES ('${id}', '${name}', '${email}', '${password}');
    `);
};