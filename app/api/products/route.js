import { mongooseConnection } from "@/app/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";
// importing it to make sure that it get created before populating it
import { Category } from "@/models/Category";

export async function POST(request) {
  try {
    await mongooseConnection();
    const { title, description, price, stock, images, category, properties } =
      await request.json();

    const productDocument = await Product.create({
      title,
      description,
      price,
      stock,
      images,
      category,
      properties,
    });
    // returning product doc
    return new NextResponse("Product created successfully!", { status: 200 });
  } catch (err) {
    console.log(err);
    throw new Error("failed adding product");
  }
}

export async function GET(req) {
  await mongooseConnection();
  console.log("hi");
  if (req.nextUrl.searchParams.get("id")) {
    const id = req.nextUrl.searchParams.get("id");
    const product = await Product.findOne({ _id: id });
    return NextResponse.json({ message: "product is here", product });
  }
  const products = await Product.find().populate("category");
  return NextResponse.json({ message: "products is here", products });
}

export async function PUT(req) {
  await mongooseConnection();
  const {
    _id,
    title,
    description,
    stock,
    price,
    images,
    category,
    properties,
  } = await req.json();
  const productUpdated = await Product.updateOne(
    { _id },
    {
      stock,
      title,
      description,
      price,
      images,
      category,
      properties,
    }
  );
  return NextResponse.json({
    message: "product updated",
    productUpdated: productUpdated,
  });
}

export async function DELETE(req) {
  await mongooseConnection();
  const id = req.nextUrl.searchParams.get("id");
  if (id) {
    await Product.deleteOne({ _id: id });
    return NextResponse.json({ message: "Delete done successfully" });
  } else {
    return NextResponse.json({ message: "Delete failed" });
  }
}
