import { Request, Response } from "express"
import insertProduct from "../queries/insertProduct"

export const createProduct = async (req: Request, res: Response) => {

    let errorCode = 500

    try {

        const { name, price, imageUrl } = req.body

        if (!name && !price && !imageUrl) {
            errorCode = 422
            throw new Error("O nome, preço e url não foram informados!");
        }
        if (!name) {
            errorCode = 422
            throw new Error("O nome do produto não foi informado!");
        }
        if (!price) {
            errorCode = 422
            throw new Error("O preço do produto não foi informado!");
        }
        if (!imageUrl) {
            errorCode = 422
            throw new Error("A url não foi informada!");
        }
        if (typeof name !== "string") {
            errorCode = 422
            throw new Error("O nome do produto deve ser do tipo string!");
        }
        if (typeof price !== "number") {
            errorCode = 422
            throw new Error("O preço do produto deve ser do tipo number!");
        }
        if (typeof imageUrl !== "string") {
            errorCode = 422
            throw new Error("A url deve ser do tipo string!");
        }

        const id = Date.now().toString();

        await insertProduct (id, name, price, imageUrl);

        res.status(201).end();
    } catch (error: any) {
        console.log(error)
        res.status(errorCode).send(error.message || error.sqlMessage);
    }
}