import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config"; // Import Sequelize instance

interface OrderAtrributes {
  id: number;
  user_id: number;
  total_price: number;
  status: "Pending" | "Completed" | "Cancelled"
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderCreationAttributes extends Optional<OrderAtrributes, "id"> {}

class Order
  extends Model<OrderAtrributes, OrderCreationAttributes>
  implements OrderAtrributes
{
  public id!: number;
  public user_id!: number;
  public total_price!: number;
  public status!: "Pending" | "Completed" | "Cancelled";
  public createdAt!: Date;
  public updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Completed", "Cancelled"),
      defaultValue: "Pending",
    },
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: true,
  }
);

export default Order;
