import Layout from "@/components/layout";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { fetchProducts } from "@/app/lib/data";
import { mongooseConnection } from "@/app/lib/mongoose";
import { Product } from "@/models/Product";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";

export default async function ProductsPage({ searchParams }) {
  const query = (await searchParams)?.query || "";
  const page = (await searchParams)?.page || 1;
  const ITEMS_PER_PAGE = process.env.ITEMS_PER_PAGE;
  const { products, count } = await fetchProducts(query, page);
  return (
    <Layout>
      <div className="bg-[--bgSoft] p-5 mt-5 rounded-[10px]">
        <div className="flex items-center justify-between">
          <Search placeholder={"Search for a product..."} />
          <Link
            href="/products/add-product"
            className="p-[10px] bg-[#5d57c9] text-[--text] rounded-[5px] cursor-pointer"
          >
            Add New
          </Link>
        </div>
        <table className="basic_table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Created At</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="object_td">
                      <Image
                        src={product.images[0] || "/noproduct.jpg"}
                        alt=""
                        width={40}
                        height={40}
                        style={{ width: "auto", height: "auto" }}
                      />
                      {product.title}
                    </div>
                  </td>
                  <td>
                    {product.description.length > 30
                      ? product.description.slice(0, 30) + "..."
                      : product.description}
                  </td>
                  <td>{product.price}</td>
                  <td>{new Date(product.createdAt).toLocaleString()}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className="btns_td">
                      <Link
                        href={`/products/edit-product?id=` + product._id}
                        className="btn bg-teal-500"
                      >
                        View
                      </Link>
                      <button
                        onClick={async () => {
                          "use server";
                          try {
                            await mongooseConnection();
                            await Product.deleteOne({ _id: product._id });
                            revalidatePath("/products");
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                        className="btn bg-[#B22222]"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination count={count} ITEMS_PER_PAGE={ITEMS_PER_PAGE} />
      </div>
    </Layout>
  );
}
