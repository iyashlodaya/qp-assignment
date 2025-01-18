import { Request, Response } from "express";
import { Item } from "../../db/models";
import { Op } from "sequelize";

// Get Grocery Item List (Get All Grocery Items List - User)
export const getGroceryItemList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { category, min_price, max_price } = req.body.filter_options || {};

    if (req.user && req.user.role !== "user") {
      res.status(403).json({ message: "Unautorized access!" });
      return;
    }

    const whereConditions: any = {
      stock: { [Op.gt]: 0 }, // Excluding items with stock 0
    };

    if (category) {
      whereConditions.category = category as string;
    }
    if (min_price) {
      whereConditions.price = {
        ...whereConditions.price,
        [Op.gte]: +min_price,
      };
    }
    if (max_price) {
      whereConditions.price = {
        ...whereConditions.price,
        [Op.lte]: +max_price,
      };
    }

    const items = await Item.findAll({ where: whereConditions });

    if (!items) {
      res.status(400).json({ message: "No Items Found!" });
      return;
    }

    res.status(201).json({
      message: "Items found!",
      data: items,
    });
    return;
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
  }
};
