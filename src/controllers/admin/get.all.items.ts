import { Request, Response } from "express";
import { Item } from "../../db/models";

// Get all Items (Get All Grocery Items)
export const getAllItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { category } = req.query;

    if (req.user && req.user.role !== "admin") {
      res.status(403).json({ message: "Unautorized access!" });
      return;
    }

    let resultArr = [];

    if (!category) {
      resultArr = await Item.findAll();
    } else {
      resultArr = await Item.findAll({ where: { category: category as string } });
    }

    res.status(201).json({
      message: "Items found!",
      data: resultArr,
    });
    return;
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
  }
};
