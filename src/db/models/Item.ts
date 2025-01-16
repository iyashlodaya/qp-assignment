import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config"; // Import Sequelize instance

interface ItemAtrributes {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ItemCreationAttributes extends Optional<ItemAtrributes, "id"> {}

class Item
  extends Model<ItemAtrributes, ItemCreationAttributes>
  implements ItemAtrributes
{
  public id!: number;
  public name!: string;
  public category!: string;
  public price!: number;
  public stock!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "items",
    timestamps: true,
  }
);

export default Item;
