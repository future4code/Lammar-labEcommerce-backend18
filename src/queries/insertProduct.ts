import { connection } from '../data/connection'

export default async function insertProduct(id: string, name: string, price: number, imageUrl: string): Promise<void> {
    await connection.raw(`
       INSERT INTO labecommerce_products (id, name, price, image_url)
       VALUES ('${id}', '${name}', ${price}, '${imageUrl}');
    `);
};