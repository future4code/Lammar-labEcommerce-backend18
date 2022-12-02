import { app } from "./app";
import { createProduct } from "./endpoints/createProduct";
import { createUser } from "./endpoints/createUser";
import { getAllProducts } from "./endpoints/getAllProducts";
import { getAllUsers } from "./endpoints/getAllUsers";
import { getUserPurchases } from "./endpoints/getUserPurchases";
import { purchaseRecord } from "./endpoints/purchaseRecord";

app.post("/users", createUser);

app.get("/users", getAllUsers);

app.post("/products", createProduct);

app.get("/products", getAllProducts);

app.post("/purchases", purchaseRecord);

app.get("/users/:user_id/purchases", getUserPurchases)