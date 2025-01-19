/// <reference path="../../types/types.d.ts" />
import { Request, Response } from "express";
import { Item } from "../../db/models";

// Add an Item (Add Grocery Item API)
export const addItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (req.user && req.user.role !== "admin") {
      res.status(403).json({ message: "Unautorized access!" });
      return;
    }
    
    const { name, price, category, stock } = req.body;

    // Validate the input
    if (!name || !price || !category || !stock) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    // Create the item
    const newItem = await Item.create({
      name,
      price,
      category,
      stock,
    });

    res.status(201).json({
      message: "Grocery item Added Succesfully.",
      item: {
        id: newItem.id,
        name: newItem.name,
        price: newItem.price,
        category: newItem.category,
        stock: newItem.stock,
      },
    });
    return;
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
  }
};
