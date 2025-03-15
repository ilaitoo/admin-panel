import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
export const config = {
  api: {
    bodyParser: false,
  },
};
const bucketName = "nextjs15-ecommerce";
export async function POST(request) {
  const req = new Request(request);
  const formData = await req.formData();
  const file = formData.get("file");
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  // extracting the extension from the file name
  const ext = file.name.split(".").pop();
  //   generate new file name
  const newFileName = Date.now() + "." + ext;
  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: newFileName,
      Body: await file.arrayBuffer(),
      ACL: "public-read",
      ContentType: file.type,
    })
  );
  const link = `http://${bucketName}.s3.amazonaws.com/${newFileName}`;
  return NextResponse.json({ message: "received the uploaded files", link });
}
