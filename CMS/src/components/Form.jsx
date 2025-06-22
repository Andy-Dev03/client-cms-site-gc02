import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import Button from "./Button";
import Toastify from "toastify-js";

const Form = ({ propName, handleSubmit, getDetailCuisine, isEdit }) => {
  const [getCategories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    categoryId: "",
  });

  const handleInput = (fieldName, e) => {
    let value = e.target.value;
    if (fieldName === "price") {
      value = +e.target.value;
    }

    setForm((prevValue) => {
      return {
        ...prevValue,
        [fieldName]: value,
      };
    });
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("https://andylie.web.id/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      });

      setCategories(data?.data);
    } catch (error) {
      Toastify({
        text: error.response.data.error.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className: "custom-toast",
        style: {
          background: "#F87171",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
          paddingRight: "2.5rem",
        },
      }).showToast();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (getDetailCuisine) {
      delete getDetailCuisine?.authorId;
      delete getDetailCuisine?.createdAt;
      delete getDetailCuisine?.updatedAt;
      delete getDetailCuisine?.id;
      delete getDetailCuisine?.Category;
      delete getDetailCuisine?.User;

      setForm((oldValue) => {
        return {
          ...oldValue,
          ...getDetailCuisine,
        };
      });
    }
  }, [getDetailCuisine]);

  return (
    <>
      <form className="space-y-6" onSubmit={(e) => handleSubmit(e, form)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter entity name"
              onChange={(e) => {
                handleInput("name", e);
              }}
              value={form?.name}
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price (Rp)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              onChange={(e) => {
                handleInput("price", e);
              }}
              value={form?.price}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="imgUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image URL
            </label>
            <input
              type="text"
              id="imgUrl"
              name="imgUrl"
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="https://example.com/image.jpg"
              onChange={(e) => {
                handleInput("imgUrl", e);
              }}
              value={form?.imgUrl}
            />
          </div>

          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              onChange={(e) => {
                handleInput("categoryId", e);
              }}
              value={form?.categoryId}
            >
              <option value="" disabled>
                Choose your category
              </option>
              {getCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="6"
            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            placeholder="Enter your description here..."
            onChange={(e) => {
              handleInput("description", e);
            }}
            value={form?.description}
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          {isEdit && (
            <Link to={"/"}>
              <button
                type="button"
                className="px-4 py-2 border border-black text-black font-semibold rounded-md hover:bg-red-600/70 hover:text-white"
              >
                Cancel
              </button>
            </Link>
          )}

          <Button nameProp={propName} />
        </div>
      </form>
    </>
  );
};

export default Form;
