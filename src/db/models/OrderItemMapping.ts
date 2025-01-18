import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config"; // Import Sequelize instance

interface OrderItemMappingAtrributes {
  id: number;
  order_id: number;
  item_id: number;
  quantity: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderItemMappingCreationAttributes
  extends Optional<OrderItemMappingAtrributes, "id"> {}

class OrderItemMapping
  extends Model<OrderItemMappingAtrributes, OrderItemMappingCreationAttributes>
  implements OrderItemMappingAtrributes
{
  id!: number;
  order_id!: number;
  item_id!: number;
  quantity!: number;
  price!: number;
  createdAt!: Date;
  updatedAt!: Date;
}

OrderItemMapping.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "order_item_mapping",
    timestamps: true,
  }
);

export default OrderItemMapping;
