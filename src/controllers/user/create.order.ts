import { Request, Response } from "express";

import sequelize from "../../db/config";
import { Item, Order, OrderItemMapping } from "../../db/models";

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  if (req.user && req.user.role !== "user") {
    res.status(403).json({ message: "Unautorized access!" });
    return;
  }

  const user_id = req.user?.user_id;

  if (typeof user_id !== "number") {
    res.status(400).json({ message: "User ID is required to place an order" });
    return;
  }

  const { items } = req.body;

  try {
    //validations.
    if (!items || !Array.isArray(items) || items.length === 0) {
      res
        .status(400)
        .json({ message: "Items are required to place an order" });
        return;
    }

    const transaction = await sequelize.transaction();

    try {
      let totalPrice = 0;

      // Check stock and calculate total price
      const updatedItems = await Promise.all(
        items.map(async (item: { id: number; quantity: number }) => {
          const groceryItem = await Item.findByPk(item.id);

          if (!groceryItem) {
            throw new Error(`Item with ID ${item.id} not found`);
          }

          if (groceryItem.stock < item.quantity) {
            throw new Error(`Insufficient stock for item ${groceryItem.name}`);
          }

          // Reduce stock
          await groceryItem.update(
            { stock: groceryItem.stock - item.quantity },
            { transaction }
          );

          // Calculate price
          totalPrice += groceryItem.price * item.quantity;

          return {
            item_id: item.id,
            quantity: item.quantity,
            price: groceryItem.price,
          };
        })
      );

      // Create order
      const order = await Order.create(
        {
          user_id: user_id,
          total_price: totalPrice,
          status: "Pending",
        },
        { transaction }
      );

      // Create order items
      await OrderItemMapping.bulkCreate(
        updatedItems.map((item) => ({
          order_id: order.id,
          item_id: item.item_id,
          quantity: item.quantity,
          price: item.price,
        })),
        { transaction }
      );

      // Commit transaction
      await transaction.commit();

      res.status(201).json({
        message: "Order placed successfully",
        order: {
          id: order.id,
          userId: order.user_id,
          items: updatedItems,
          totalPrice: order.total_price,
          status: order.status,
        },
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.log('Error -->', error);
    res.status(500).json({ message: "Failed to place order", error: error });
  }
};
