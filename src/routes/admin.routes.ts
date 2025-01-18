import { Router } from "express";

import { addItem } from "../controllers/admin/add.item";
import { getAllItems } from "../controllers/admin/get.all.items";
import { deleteItem } from "../controllers/admin/delete.item";
import { updateItem } from "../controllers/admin/update.item";
import { updateStock } from "../controllers/admin/update.stock";

//middleware
import verifyJWT from "../middleware/verify.token";


const router: Router = Router();

// Admin routes
router.get("/test", () => {
  console.log("Admin Test API.");
});

router.post("/groceries", verifyJWT, addItem);
router.get("/groceries/:category?", verifyJWT, getAllItems);
router.delete("/groceries/:id?", verifyJWT, deleteItem);
router.put("/groceries/:id?", updateItem);
router.patch("/groceries/:id?/stock", updateStock);

export default router;
