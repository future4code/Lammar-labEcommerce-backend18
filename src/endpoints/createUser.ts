import { Request, Response } from "express"
import insertUser from "../queries/insertUser"

export const createUser = async (req: Request, res: Response) => {

    let errorCode = 500

    try {

        const { name, email, password } = req.body

        if (!name && !email && !password) {
            errorCode = 422
            throw new Error("O nome, email e senha não foram informados!");
        }
        if (!name) {
            errorCode = 422
            throw new Error("O nome do usuário não foi informado!");
        }
        if (!email) {
            errorCode = 422
            throw new Error("O email do usuário não foi informado!");
        }
        if (!password) {
            errorCode = 422
            throw new Error("A senha não foi informada!");
        }
        if (typeof name !== "string") {
            errorCode = 422
            throw new Error("O nome do usuário deve ser do tipo string!");
        }
        if (typeof email !== "string") {
            errorCode = 422
            throw new Error("O email do usuário deve ser do tipo string!");
        }
        if (typeof password !== "string") {
            errorCode = 422
            throw new Error("A senha deve ser do tipo string!");
        }

        const id = Date.now().toString();

        await insertUser (id, name, email, password);

        res.status(201).end();
    } catch (error: any) {
        console.log(error)
        res.status(errorCode).send(error.message || error.sqlMessage);
    }
}