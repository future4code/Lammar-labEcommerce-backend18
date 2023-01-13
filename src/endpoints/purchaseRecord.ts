import { Request, Response } from "express"
import { connection } from "../data/connection"
import insertPurchase from "../queries/insertPurchase"

export const purchaseRecord = async (req: Request, res: Response) => {

    let errorCode = 500

    try {

        const { userId, productId, quantity } = req.body

        if (!userId && !productId && !quantity) {
            errorCode = 422
            throw new Error("O id do usuário, a quantidade e o id do produto não foram informados!");
        }
        if (!userId) {
            errorCode = 422
            throw new Error("O id do usuário não foi informado!");
        }
        if (!productId) {
            errorCode = 422
            throw new Error("O id do produto não foi informado!");
        }
        if (!quantity) {
            errorCode = 422
            throw new Error("A quantidade não foi informada!");
        }
        if (typeof userId !== "string") {
            errorCode = 422
            throw new Error("O id do usuário deve ser do tipo string!");
        }
        if (typeof productId !== "string") {
            errorCode = 422
            throw new Error("O id do produto deve ser do tipo string!");
        }
        if (typeof quantity !== "number") {
            errorCode = 422
            throw new Error("A quantidade deve ser do tipo number!");
        }

        const id = Date.now().toString();

        const productPrice = await connection("labecommerce_products")
            .select("price")
            .where({ id: productId })

        const totalPrice = productPrice[0].price * quantity

        await insertPurchase(id, userId, productId, quantity, totalPrice);

        res.status(201).end();
    } catch (error: any) {
        console.log(error)
        res.status(errorCode).send(error.message || error.sqlMessage);
    }
}