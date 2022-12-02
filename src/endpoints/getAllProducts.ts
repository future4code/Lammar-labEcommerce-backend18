import { Request, Response } from "express"
import selectAllProducts from "../queries/selectAllProducts"
import { product } from "../types"

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
   try {

      let order = req.query.order as string
      let sort = req.query.sort as string
      let search = req.query.search as string

      if (!order) {
         order = ""
      }

      if (!search) {
         search = "%"
      }

      const products: product[] = await selectAllProducts(order, search, sort)

      res.status(200).send(products)

   } catch (error: any) {
      console.log(error)
      res.status(500).send(error.message || error.sqlMessage)
   }
}