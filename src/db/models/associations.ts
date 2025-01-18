import Item from "./Item";
import Order from "./Order";
import OrderItemMapping from "./OrderItemMapping";

// Defining relationships
Order.hasMany(OrderItemMapping, { foreignKey: "order_id" });
OrderItemMapping.belongsTo(Order, { foreignKey: "order_id" });

OrderItemMapping.belongsTo(Item, { foreignKey: "item_id" });
Item.hasMany(OrderItemMapping, { foreignKey: "item_id" });
