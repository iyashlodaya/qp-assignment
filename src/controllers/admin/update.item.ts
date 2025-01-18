import { Request, Response } from "express";
import { Item } from "../../db/models";

// Update an Item (Update Grocery Item API)
export const updateItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (req.user && req.user.role !== "admin") {
      res.status(403).json({ message: "Unautorized access!" });
      return;
    }

    const { id } = req.query;
    const { name, price, category, stock } = req.body;

    // Validate the input
    if (!id) {
      res.status(400).json({ message: "ID is required in query!" });
      return;
    }
    if (!name || !price || !category || !stock) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const item = await Item.findOne({
      where: { id: id as string, name: name },
    });

    if (!item) {
      res.status(404).json({ message: "No items found for updating!" });
    } else {
      const updatedItem = await item.update({ name, price, category, stock });
      res.status(201).json({
        message: "Grocery item updated succesfully.",
        item: {
          id: updatedItem.id,
          name: updatedItem.name,
          price: updatedItem.price,
          category: updatedItem.category,
          stock: updatedItem.stock,
        },
      });
      return;
    }
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
  }
};
