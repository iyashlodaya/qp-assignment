import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config";

// Define model interface
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user"; // Enum for role
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Define the User model
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: "admin" | "user"; // Enum for role
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize the model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "user"), // Enum for role
      allowNull: false,
      defaultValue: "user", // Default role is 'user'
    },
  },
  {
    sequelize,
    tableName: "users", // Table name in database
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default User;
