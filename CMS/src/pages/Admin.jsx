import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Toastify from "toastify-js";
import TabelCuisines from "../components/TabelCuisines";
import TabelCategories from "../components/TabelCategories";

const Admin = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const cuisinesPagination = handlePagination(totalPage);

  const [categoriesPage, setCategoriesPage] = useState(1);
  const [categoriesTotalPage, setCategoriesTotalPage] = useState(0);
  const categoriesPagination = handlePagination(categoriesTotalPage);

  const isError = (error) => {
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
  };

  const [categoriesOrCuisines, setCategoriesOrCuisines] = useState("cuisines");

  // Get Cuisines
  const [getCuisines, setCuisines] = useState([]);

  const fetchCuisines = async () => {
    try {
      const { data } = await axios.get(
        `https://andylie.web.id/cuisines?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      );
      setCuisines(data?.data);
      setCurrentPage(data?.currentPage);
      setTotalPage(data?.totalPage);
    } catch (error) {
      isError(error);

      if (
        error.response.data.error.message === "Token expired" ||
        error.response.data.error.message === "Your token is invalid"
      ) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get Categories
  const [getCategories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `https://andylie.web.id/categories?page=${categoriesPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      );

      setCategories(data.data);
      setCategoriesPage(data?.currentPage);
      setCategoriesTotalPage(data?.totalPage);
    } catch (error) {
      isError(error);
    }
  };

  // Delete
  const deleteButton = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://andylie.web.id/cuisines/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      );

      fetchCuisines();
      Toastify({
        text: data.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className: "custom-toast",
        style: {
          background: "#34D399",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
          paddingRight: "2.5rem",
        },
      }).showToast();
    } catch (error) {
      isError(error);
    }
  };

  function handlePagination(pageCount) {
    let arr = [];
    for (let i = 1; i <= pageCount; i++) {
      arr.push(i);
    }
    return arr;
  }

  useEffect(() => {
    if (categoriesOrCuisines === "cuisines") {
      fetchCuisines();
    } else {
      fetchCategories();
    }
  }, [currentPage, categoriesPage, categoriesOrCuisines]);

  useEffect(() => {
    setCurrentPage(1);
    setCategoriesPage(1);
  }, [categoriesOrCuisines]);

  return (
    <>
      <div className="md:p-6 p-4 pb-24">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Entity List</h2>
          <p className="font-semibold text-gray-600">
            All the data of{" "}
            {categoriesOrCuisines === "cuisines" ? "Cuisines" : "Categories"}
          </p>
        </div>

        {categoriesOrCuisines === "cuisines" && (
          <>
            <button
              className="border bg-gray-900 text-white rounded-xl px-2 py-2 mb-4 hover:bg-gray-800/90"
              onClick={() => setCategoriesOrCuisines("categories")}
            >
              <span>Categories Tabel</span>
            </button>
            <TabelCuisines
              getCuisines={getCuisines}
              deleteButton={deleteButton}
            />

            {/* <!-- Pagination --> */}
            <div className="flex justify-center items-center gap-2 pt-4">
              <div className="flex gap-2">
                {cuisinesPagination?.map((page) => (
                  <button
                    type="button"
                    className={
                      page === currentPage
                        ? "px-4 py-2 rounded-lg bg-gray-900 text-white"
                        : "px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-700 text-gray-300 transition duration-200"
                    }
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {categoriesOrCuisines === "categories" && (
          <>
            <button
              className="border bg-gray-900 text-white rounded-xl px-2 py-2 mb-4 hover:bg-gray-800/90"
              onClick={() => setCategoriesOrCuisines("cuisines")}
            >
              <span>Cuisines Tabel</span>
            </button>
            <TabelCategories getCategories={getCategories} />

            {/* <!-- Pagination --> */}
            <div className="flex justify-center items-center gap-2 pt-4">
              <div className="flex gap-2">
                {categoriesPagination?.map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={
                      page === categoriesPage
                        ? "px-4 py-2 rounded-lg bg-gray-900 text-white"
                        : "px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-700 text-gray-300 transition duration-200"
                    }
                    onClick={() => setCategoriesPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Admin;
