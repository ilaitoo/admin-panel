export default function CategoriesTable({ categories, edit, deleteCategory }) {
  return (
    <table className=" w-full">
      <thead>
        <tr className="bg-[#22344a] ">
          <th className="rounded-l-md">Name</th>
          <th>Parent</th>
          <th>Properties</th>
          <th colSpan={2} className="text-center rounded-r-md">
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
  );
}
