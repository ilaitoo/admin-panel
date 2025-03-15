"use client";
import React, { useEffect, useState } from "react";
import ImagesContainer from "./ImagesContainer";
import { ReactSortable } from "react-sortablejs";
import { useRouter } from "next/navigation";
import ImagesInput from "../ImagesInput";
import axios from "axios";

function EditForm({ product, categories }) {
  const [title, setTitle] = useState(product.title || "");
  const [price, setPrice] = useState(product.price || "");
  const [stock, setStock] = useState(product.stock || "");
  const [description, setDescription] = useState(product.description || "");
  const [category, setCategory] = useState(product.category || "");
  const [productProperties, setProductProperties] = useState(
    product.properties || {}
  );
  const [images, setImages] = useState(product.images || []);

  const [propertiesErr, setPropertiesErr] = useState(false);
  const [imagesErr, setImagesErr] = useState(false);

  const [shownImg, setShownImg] = useState(product.images[0] || "");
  const [disabled, setDisabled] = useState(true);
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (goToProducts) {
      router.push("/products");
    }
  }, [goToProducts, router]);
  const propertiesToFill = [];
  if (categories?.length > 0 && category) {
    let selCatInfo = categories.find(({ _id }) => _id === category);
    if (selCatInfo?.properties?.length > 0) {
      propertiesToFill.push(...selCatInfo.properties);
      while (selCatInfo?.parent?._id) {
        const parentCat = categories.find(
          ({ _id }) => _id === selCatInfo.parent._id
        );
        propertiesToFill.push(...parentCat?.properties);
        selCatInfo = parentCat;
      }
    }
  }
  function handlePropsSelecting(ev, propName) {
    const value = ev.target.value;
    const IsChecked = ev.target.checked;
    setProductProperties((prev) => {
      const prevProps = { ...prev };
      if (IsChecked) {
        if (prevProps[propName]?.length > 0)
          prevProps[propName] = [...(prevProps[propName] || []), value];
        else prevProps[propName] = [value];
        return prevProps;
      } else {
        prevProps[propName] = prevProps[propName].filter(
          (prop) => prop !== value
        );
        if (!(prevProps[propName].length > 0)) {
          delete prevProps[propName];
        }
        console.log(prevProps);
        return prevProps;
      }
    });
  }
  async function saveProduct(ev) {
    ev.preventDefault();
    if (!(Object.keys(productProperties).length > 0)) {
      setPropertiesErr(true);
    } else {
      setPropertiesErr(false);
    }
    if (!(images.length > 0)) {
      setImagesErr(true);
    } else {
      setImagesErr(false);
    }
    const data = {
      _id: product._id,
      title,
      price,
      stock,
      description,
      category: category ? category : null,
      properties: category ? productProperties : null,
      images,
    };
    await axios.put("/api/products", data);
    setGoToProducts(true);
    // console.log(data);
  }
  return (
    <div className="flex gap-[50px] mt-5">
      <div className="flex-1 h-max">
        <div className=" bg-[--bgSoft] p-5 rounded-[10px] font-bold text-[--textSoft] ">
          <div className="w-full h-[300px] flex items-center rounded-[10px] mb-5 overflow-hidden">
            <img src={shownImg || "/noproduct.jpg"} alt="Product image" />
          </div>
          {product.title}
        </div>
        {imagesErr && (
          <div className="my-5  bg-[#b83a53] p-4">
            Pleas upload products images!
          </div>
        )}

        <ImagesInput
          disabled={disabled}
          images={images}
          setImages={setImages}
          className={"flex flex-wrap gap-2 mt-10"}
        />
      </div>
      <div className="flex-[3] bg-[--bgSoft] p-5 rounded-[10px]">
        <form
          onSubmit={saveProduct}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          className="view_product_form"
        >
          <label>Title</label>
          <input
            required
            disabled={disabled}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <label>Stock</label>
          <input
            required
            disabled={disabled}
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(ev) => setStock(ev.target.value)}
          />
          <label>Price</label>
          <input
            required
            disabled={disabled}
            type="number"
            placeholder="Price"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
          />
          <label>Category</label>
          <select
            required
            disabled={disabled}
            value={category || undefined}
            id="cat"
            onChange={(ev) => {
              setCategory(ev.target.value);
              setProductProperties(
                product.category === ev.target.value ? product.properties : {}
              );
            }}
          >
            <option value="">Chose product category</option>
            {categories?.length > 0 &&
              categories.map((categ, index) => (
                <option
                  key={categ._id}
                  value={categ._id}
                  defaultValue={category === categ._id}
                >
                  {categ.name}
                </option>
              ))}
          </select>
          {category && (
            <div>
              {propertiesToFill.length > 0 &&
                propertiesToFill.map((prop, index) => (
                  <div
                    key={index}
                    className="flex mb-5 justify-between items-center"
                  >
                    <label>
                      {prop.name[0].toUpperCase() + prop.name.slice(1)}
                    </label>
                    <div className="flex gap-24">
                      {prop.values.map((val) => (
                        <div key={val} className="flex items-center">
                          <input
                            disabled={disabled}
                            checked={
                              productProperties?.[prop?.name]?.includes(val) ??
                              false
                            }
                            onChange={(ev) =>
                              handlePropsSelecting(ev, prop.name)
                            }
                            value={val}
                            type="checkbox"
                            id=""
                            className="w-10 h-8"
                          />
                          <label htmlFor="" className=" ml-3">
                            {val}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              {propertiesErr && (
                <div className="my-5  bg-[#b83a53] p-4">
                  Pleas chose properties!
                </div>
              )}
            </div>
          )}
          <label>Description</label>
          <textarea
            required
            disabled={disabled}
            type="text"
            placeholder="Description"
            value={product.description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <div className="w-full flex gap-5 justify-center">
            <button
              type="submit"
              disabled={disabled}
              className="flex-[3] disabled:bg-[#222e46] disabled:cursor-default"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() =>
                setDisabled((prev) => {
                  if (!prev) {
                    setTitle(product.title || "");
                    setPrice(product.price || "");
                    setStock(product.stock || "");
                    setDescription(product.description || "");
                    setCategory(product.category || "");
                    setProductProperties(product.properties || {});
                    setImages(product.images || []);
                    return true;
                  }
                  return false;
                })
              }
              className=" disabled:bg-[#222e46] disabled:cursor-default"
            >
              {disabled ? "Update" : "Cancel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
