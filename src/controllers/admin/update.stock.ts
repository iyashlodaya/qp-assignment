import { Request, Response } from "express";
import { Item } from "../../db/models";

// Update an Item (Update Grocery Item API)
export const updateStock = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (req.user && req.user.role !== "admin") {
      res.status(403).json({ message: "Unautorized access!" });
      return;
    }

    const { id } = req.query;
    const { stock } = req.body;

    // Validate the input
    if (!id) {
      res.status(400).json({ message: "ID is required in query!" });
      return;
    }

    if (!stock) {
      res.status(400).json({ message: "Stock field are required." });
      return;
    }

    const item = await Item.findOne({
      where: { id: id as string },
    });

    if (!item) {
      res.status(404).json({ message: "No items found for updating the inventory / stock!" });
    } else {
      const updatedStock = await item.update({ stock });
      res.status(201).json({
        message: "Stock updated succesfully for the Item.",
        item: {
          id: updatedStock.id,
          name: updatedStock.name,
          stock: updatedStock.stock,
        },
      });
      return;
    }
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
  }
};
