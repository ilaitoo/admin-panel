import mongoose, { Schema, models, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: "Category" },
    properties: [{ type: Object }],
  },
  {
    timestamps: true,
  }
);

const Category = models?.Category || model("Category", categorySchema);

export { Category };
