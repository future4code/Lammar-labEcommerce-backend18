import { Request, Response } from "express"
import { connection } from "../data/connection"
import selectAllUsers from "../queries/selectAllUsers"
import { purchase, user } from "../types"

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
   try {
      const users: user[] = await selectAllUsers()

      const purchases: purchase[] = await connection("labecommerce_purchases")


      users.forEach(user => {
         let userPurchase: purchase[] = []
         purchases.forEach(purchase => {            
            if (user.id === purchase.user_id) {
               userPurchase.push(purchase)               
            }     
            user.purchases = userPurchase       
         })
      })

      res.status(200).send(users)

   } catch (error: any) {
      console.log(error)
      res.status(500).send(error.message || error.sqlMessage)
   }
}