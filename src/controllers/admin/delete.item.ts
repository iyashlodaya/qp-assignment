import { Request, Response } from "express";
import { Item } from "../../db/models";

// Delete an Item (Delete Grocery Item API)
export const deleteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (req.user && req.user.role !== "admin") {
      res.status(403).json({ message: "Unautorized access!" });
      return;
    }

    const { id } = req.query;

    // Validate the input
    if (!id) {
      res.status(400).json({ message: "ID is required in query!" });
      return;
    }

    const item = await Item.findOne({ where: { id: id as string } });

    if (!item) {
      res.status(404).json({ message: "No item found to delete!" });
    }

    if (item) {
      item.destroy();
    }

    res.status(201).json({
      message: "Grocery item Deleted Succesfully.",
    });
    return;
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
  }
};
