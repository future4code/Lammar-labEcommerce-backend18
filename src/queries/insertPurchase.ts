import { connection } from '../data/connection'

export default async function insertPurchase(id: string, userId: string, productId: string, quantity: number, totalPrice: number): Promise<void> {
    await connection.raw(`
       INSERT INTO labecommerce_purchases (id, user_id, product_id, quantity, total_price)
       VALUES ('${id}', '${userId}', ${productId}, ${quantity}, ${totalPrice});
    `);
};