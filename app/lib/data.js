import { Category } from "@/models/Category";
import { mongooseConnection } from "./mongoose";
import { Product } from "@/models/Product";
import { User } from "@/models/User";

export async function fetchCategories() {
  try {
    await mongooseConnection();
    const categories = await Category.find()
      .populate("parent")
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(categories));
  } catch (err) {
    console.log({ message: "error fetching categories", err: err });
    return [];
  }
}

export async function fetchProducts(query, page) {
  const regex = new RegExp(query, "i");
  const PRODUCT_PER_PAGE = process.env.ITEMS_PER_PAGE;
  try {
    await mongooseConnection();
    const count = await Product.countDocuments({ title: { $regex: regex } });
    const products = await Product.find({ title: { $regex: regex } })
      .skip(PRODUCT_PER_PAGE * (page - 1))
      .limit(PRODUCT_PER_PAGE)
      .sort({ createdAt: -1 })
      .lean();
    return { products: JSON.parse(JSON.stringify(products)), count };
  } catch (err) {
    console.log({ message: "error fetching products", err: err });
    return { products: [], count: 0 };
  }
}

export async function fetchProduct(id) {
  try {
    await mongooseConnection();
    const product = await Product.findOne({ _id: id }).lean();
    return JSON.parse(JSON.stringify(product));
  } catch (err) {
    console.log(err);
    return {};
  }
}

export async function fetchUsers(page, query) {
  const regex = new RegExp(query, "i");
  const USER_PER_PAGE = process.env.ITEMS_PER_PAGE;
  try {
    await mongooseConnection();
    const count = await User.countDocuments({ name: { $regex: regex } });
    const users = await User.find({ name: { $regex: regex } })
      .skip(USER_PER_PAGE * (page - 1))
      .limit(USER_PER_PAGE)
      .sort({ createdAt: -1 })
      .lean();
    return { users: JSON.parse(JSON.stringify(users)), count };
  } catch (err) {
    console.log(err);
  }
}

export async function fetchUser(id) {
  try {
    await mongooseConnection();
    const user = await User.findById(id);
    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    console.log(err);
    return {};
  }
}
