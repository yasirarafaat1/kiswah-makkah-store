import { connection, DataTypes } from "../config/db.js";
import { v4 as uuidv4 } from 'uuid';

export const User = connection.define('User', {
   id: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv4(),
      unique: true,
      allowNull: false,
      primaryKey: true
   },
   email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
   },
   refreshToken: {
      type: DataTypes.STRING,
      allowNull: true
   }

});

export default User;