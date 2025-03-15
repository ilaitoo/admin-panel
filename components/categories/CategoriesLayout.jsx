"use client";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { v4 as uniqueId } from "uuid";

function CategoriesLayout({ categories }) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [properties, setProperties] = useState([]);
  const router = useRouter();

  function edit(category) {
    setEditingCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id || "");
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values,
      }))
    );
  }
  async function deleteCategory(id) {
    try {
      const res = await axios.delete("/api/categories?id=" + id);
      // setCategories((prev) => prev.filter((cat) => cat._id !== id));
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }
  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parent: parentCategory ? parentCategory : null,
      properties,
    };
    try {
      if (editingCategory) {
        await axios.put("/api/categories?id=" + editingCategory._id, data);
        setEditingCategory(null);
      } else {
        await axios.post("/api/categories", data);
      }
      setName("");
      setParentCategory("");
      setProperties([]);
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="my-6 ">
        <label htmlFor="">Create new category</label>
        <form onSubmit={saveCategory} className=" ">
          <div className="flex gap-2">
            <input
              required
              className="category_input flex-[2] p-5"
              placeholder="Category name "
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <select
              value={parentCategory}
              onChange={(ev) => setParentCategory(ev.target.value)}
              className="category_input flex-1 p-5"
            >
              <option value="">No parent category</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-7">
            <label htmlFor="" className="block mb-2">
              Properties
            </label>
            <button
              type="button"
              className="bg-[#2c3a55]  px-6 py-2 rounded-[5px]"
              onClick={() => {
                setProperties((prev) => [
                  ...prev,
                  { name: "", values: [], id: uniqueId() },
                ]);
              }}
            >
              Add new property
            </button>
            {properties.length > 0 &&
              properties.map((property, index) => (
                <div
                  className="flex gap-2 relative mt-5"
                  key={property.id || index}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 absolute right-2 -top-4 cursor-pointer"
                    onClick={() =>
                      setProperties((prev) =>
                        prev.filter((prop) => prop.id !== property.id)
                      )
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                  <input
                    required
                    type="text"
                    placeholder="Category name Example: color"
                    className="category_input flex-[2] p-3"
                    value={property.name}
                    onChange={(ev) =>
                      setProperties((prev) => {
                        const props = [...prev];
                        props[index].name = ev.target.value;
                        return props;
                      })
                    }
                  />
                  <input
                    required
                    type="text"
                    placeholder="Values, comma separated"
                    className="category_input flex-[4] p-3"
                    value={property.values?.join(",")}
                    onChange={(ev) =>
                      setProperties((prev) => {
                        const props = [...prev];
                        props[index].values = ev.target.value.split(",");
                        return props;
                      })
                    }
                  />
                </div>
              ))}
          </div>
          <button
            type="submit"
            className="bg-teal-500 px-10 py-3 text-[--text] rounded-[5px]"
          >
            Save
          </button>
          {editingCategory && (
            <button
              onClick={() => {
                setEditingCategory(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
              type="submit"
              className=" ml-3 px-10 py-3 text-[--text] rounded-[5px] border-[1px] border-solid border-white"
            >
              Cancel
            </button>
          )}
        </form>
      </div>
      <table className=" w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Parent</th>
            <th>Properties</th>
            <th>Created at</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  {category?.properties?.length > 0 &&
                    category?.properties.map((property) => (
                      <div key={property.id || property.name}>
                        {property.name}:{" "}
                        {property.values?.length > 0 &&
                          property.values.join(", ")}
                      </div>
                    ))}
                </td>
                <td>{category.createdAt?.toString().slice(0, 10)}</td>
                <td colSpan={2} className=" text-center">
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      edit(category);
                    }}
                    className="category_table_btn bg-teal-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="category_table_btn "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default CategoriesLayout;
