import { Request, Response } from "express";
import { Item, Order, OrderItemMapping } from "../../db/models";

// Controller to fetch orders for a logged-in user
export const viewUserOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (req.user && req.user.role !== "user") {
    res.status(403).json({ message: "Unautorized access!" });
    return;
  }
  const userId = req.user.user_id;

  try {
    // Fetch all orders associated with the logged-in user
    const orders = await Order.findAll({
      where: {
        user_id: userId, // Filter by the user's ID
      },
      include: [
        {
          model: OrderItemMapping,
          include: [
            {
              model: Item,
              attributes: ["id", "name", "price"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]], // Optional: Order by creation date (newest first)
    });

    if (!orders || orders.length === 0) {
      res.status(404).json({ message: "No orders found for this user." });
      return;
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });

    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error });
  }
  return;
};
