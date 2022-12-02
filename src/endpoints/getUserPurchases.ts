import { Request, Response } from "express"
import selectPurchases from "../queries/selectPurchases"
import { purchase } from "../types"

export const getUserPurchases = async (req: Request, res: Response): Promise<void> => {
   try {

      const userId = req.params.user_id as string

      if (!userId) {
         res.status(422).send("O id do usuário deve ser informado!")
      }

      const purchases: purchase[] = await selectPurchases(userId)

      res.status(200).send(purchases)
   } catch (error: any) {
      console.log(error)
      res.status(500).send(error.message || error.sqlMessage)
   }
}