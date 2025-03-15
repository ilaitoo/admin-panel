import { Category } from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  const { name, parent, properties } = await req.json();
  try {
    const catDoc = await Category.create({ name, parent, properties });
    return new NextResponse("Created category successfully.", { status: 200 });
  } catch (err) {
    console.log(err);
    throw new Error("Failed creating category.");
  }
}
export async function PUT(req) {
  const { name, parent, properties } = await req.json();
  const id = req.nextUrl.searchParams.get("id");
  try {
    const catDoc = await Category.updateOne(
      { _id: id },
      { name, parent, properties }
    );
    return new NextResponse("Updated category successfully.", { status: 200 });
  } catch (err) {
    console.log(err);
    throw new Error("Failed Updating category.");
  }
}

export async function DELETE(req) {
  const id = new NextRequest(req).nextUrl.searchParams.get("id");
  console.log(id);
  try {
    await Category.deleteOne({ _id: id });
    return new NextResponse("Deleted category successfully.", { status: 200 });
  } catch (err) {
    console.log(err);
    throw new Error("Failed deleting category");
  }
}
