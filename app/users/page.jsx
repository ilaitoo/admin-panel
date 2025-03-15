import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Layout from "@/components/layout";
import { fetchUsers } from "@/app/lib/data";
import { mongooseConnection } from "@/app/lib/mongoose";
import { User } from "@/models/User";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";

export default async function UsersPage({ searchParams }) {
  const page = (await searchParams)?.page || 1;
  const query = (await searchParams)?.query || "";
  const { count, users } = await fetchUsers(page, query);
  const USER_PER_PAGE = process.env.ITEMS_PER_PAGE;

  return (
    <Layout>
      <div className="bg-[--bgSoft] p-5 mt-5 rounded-[10px]">
        <div className="flex items-center justify-between">
          <Search placeholder={"Search for a user..."} />
          <Link
            href="/users/add-user"
            className="p-[10px] bg-[#5d57c9] text-[--text] rounded-[5px] cursor-pointer"
          >
            Add New
          </Link>
        </div>
        <table className="basic_table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="object_td">
                    <Image
                      src={user.img || "/noavatar.png"}
                      alt=""
                      width={40}
                      height={40}
                      className="object_img"
                    />
                    {user.name}
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Admin" : "Not Admin"}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  <div className="btns_td">
                    <Link
                      href={`/users/edit-user?id=${user._id}`}
                      className="btn bg-teal-500"
                    >
                      View
                    </Link>
                    <button
                      className="btn bg-[#B22222]"
                      onClick={async () => {
                        "use server";
                        try {
                          await mongooseConnection();
                          if (!user._id) return;
                          await User.findByIdAndDelete(user._id);
                          revalidatePath("/users");
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination count={count} ITEMS_PER_PAGE={USER_PER_PAGE} />
      </div>
    </Layout>
  );
}
