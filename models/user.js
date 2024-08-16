const { model, Schema } = require("mongoose");

const { reqString, email, preSaveHashPassword } = require("./schemaFields");

const UserSchema = Schema(
  {
    name:{ type: String },
    email: email,
    mobile: { type: String },
    password: reqString,
  },
  { timestamps: true }
);

UserSchema.pre("save", preSaveHashPassword);

const User = model("user", UserSchema, "users");
module.exports = User;
