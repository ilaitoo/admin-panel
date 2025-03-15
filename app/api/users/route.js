import { mongooseConnection } from "@/app/lib/mongoose";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { username, email, password, isAdmin, phone, address, image } =
    await new NextRequest(req).json();
  if (!username || !email || !password) {
    return new NextResponse("Username, email, and password are required.", {
      status: 400,
    });
  }
  try {
    await mongooseConnection();
    const userExist = await User.findOne({
      $or: [{ name: username }, { email }],
    });

    if (userExist) {
      return new NextResponse("Username or email already exist.", {
        status: 400,
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        name: username,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false,
        phone: phone || "",
        address: address || "",
        img: image || "",
      });
      await newUser.save();
      return new NextResponse("Created user successfully.", { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return new NextResponse("Failed creating user!", { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { name, email, password, img, isAdmin, address, phone, _id } =
      await req.json();
    if (!_id) return new NextResponse("Missing user ID.", { status: 400 });

    await mongooseConnection();
    const user = await User.findById(_id);
    if (!user) return new NextResponse("User does'nt exist.", { status: 400 });

    const updatedData = { name, email, img, isAdmin, address, phone };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(_id, updatedData, {
      new: true,
      runValidators: true,
    });
    return new NextResponse(
      JSON.stringify({ message: "Updated user Successfully.", updatedUser }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse("Failed to update user.", { status: 500 });
  }

  //   const user =
  // try {
  //   if (password) {
  //     const salt = await bcrypt.genSalt(10);
  //     const hashedPassword = await bcrypt.hash(password, salt);
  //     const userDoc = await User.updateOne(
  //       { _id },
  //       {
  //         name,
  //         email,
  //         password: hashedPassword,
  //         img,
  //         isAdmin,
  //         address,
  //         phone,
  //       }
  //     );
  //   } else {
  //     const userDoc = await User.updateOne(
  //       { _id },
  //       {
  //         name,
  //         email,
  //         img,
  //         isAdmin,
  //         address,
  //         phone,
  //       }
  //     );
  //   }
  //   return new NextResponse("Updated user successfully.", { status: 200 });
  // } catch (err) {
  //   console.log(err);
  //   return new NextResponse("Failed updating user.", { status: 400 });
  // }
}
