import Form from "../components/Form";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import Toastify from "toastify-js";

const Edit = () => {
  const { id } = useParams();
  const [getDetailCuisine, setDetailCuisine] = useState({});
  const navigate = useNavigate();

  const fetchDetail = async () => {
    try {
      const { data } = await axios.get(
        `https://www.andylie.web.id/cuisines/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      );
      setDetailCuisine(data.data);
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

  const handleSubmit = async (e, form) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://www.andylie.web.id/cuisines/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      );
      console.log(data);

      navigate("/");
      Toastify({
        text: `${data.data.name} Success Update`,
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
      const errorData = error.response?.data?.error?.message;
      let errorText;

      if (Array.isArray(errorData)) {
        errorText = errorData[0];
      } else if (typeof errorData === "string") {
        errorText = errorData;
      }

      Toastify({
        text: errorText,
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
    fetchDetail();
  }, []);
  return (
    <>
      <div className="md:p-6 pb-24 p-4 md:pb-0">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Entity</h2>
          <p className="text-gray-600">Update your data to the databased</p>
        </div>
        <Form
          getDetailCuisine={getDetailCuisine}
          handleSubmit={handleSubmit}
          isEdit={true}
          propName="Edit Entity"
        />
      </div>
    </>
  );
};

export default Edit;
