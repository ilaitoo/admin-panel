"use client";
import React, { useEffect, useState } from "react";
import ImagesInput from "../ImagesInput";
import { useRouter } from "next/navigation";
import axios from "axios";

function ProductForm({ categories }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [productProperties, setProductProperties] = useState({});

  const [propertiesErr, setPropertiesErr] = useState(false);
  const [imagesErr, setImagesErr] = useState(false);

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
          prevProps[propName] = [...prevProps[propName], value];
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
    console.log(propertiesToFill.length);
    if (
      !(Object.keys(productProperties).length > 0) &&
      propertiesToFill.length > 0
    ) {
      setPropertiesErr(true);
      return;
    } else {
      setPropertiesErr(false);
    }

    if (!(images.length > 0)) {
      setImagesErr(true);
      return;
    } else {
      setImagesErr(false);
    }

    const data = {
      title,
      price,
      stock,
      description,
      category: category ? category : null,
      properties: category ? productProperties : null,
      images,
    };
    // create
    await axios.post("/api/products", data);
    setGoToProducts(true);
  }
  return (
    <div className="bg-[--bgSoft] p-5 mt-5 rounded-[10px]">
      <form onSubmit={saveProduct} className="basic_form">
        <input
          onChange={(ev) => setTitle(ev.target.value)}
          type="text"
          placeholder="title"
          value={title}
          required
        />
        <input
          onChange={(ev) => setPrice(ev.target.value)}
          type="number"
          placeholder="price"
          value={price}
          required
        />
        <input
          onChange={(ev) => setStock(ev.target.value)}
          type="number"
          placeholder="stock"
          value={stock}
          required
        />
        <textarea
          onChange={(ev) => setDescription(ev.target.value)}
          required
          value={description}
          placeholder="Description"
        ></textarea>
        <select
          required
          value={category}
          id="cat"
          onChange={(ev) => setCategory(ev.target.value)}
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
                <div key={index} className="flex mb-5 justify-between ">
                  <label>
                    {prop.name[0].toUpperCase() + prop.name.slice(1)}
                  </label>
                  {/* <select
                    className="w-2/3"
                    value={productProperties[prop.name]}
                    onChange={(ev) => handlePropsSelecting(ev, prop.name)}
                  >
                    <option value={""}>No value</option>
                    {prop.values.map((val, index) => (
                      <option key={index} value={val}>
                        {val}
                      </option>
                    ))}
                  </select> */}
                  <div className="flex gap-24">
                    {prop.values.map((val) => (
                      <div key={val} className="flex">
                        <label htmlFor="" className="mb-[27px] mr-10">
                          {val}
                        </label>
                        <input
                          onChange={(ev) => handlePropsSelecting(ev, prop.name)}
                          value={val}
                          type="checkbox"
                          id=""
                          className="w-5 "
                        />
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
        <div className="flex mb-2 flex-wrap gap-2 items-center">
          <ImagesInput
            images={images}
            setImages={setImages}
            className={"flex gap-2 flex-wrap"}
          />
        </div>
        {imagesErr && (
          <div className="my-5  bg-[#b83a53] p-4">
            Pleas upload product images
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProductForm;
