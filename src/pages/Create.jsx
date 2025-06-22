import axios from "axios";
import { useNavigate } from "react-router";
import Form from "../components/Form";
import Toastify from "toastify-js";
const Create = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e, form) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://www.andylie.web.id/cuisines",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      );

      navigate("/");
      Toastify({
        text: `Success add ${data.data.name} to entity`,
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

  return (
    <>
      <div className=" min-h-screen pb-24 md:pb-0 md:p-6 p-4">
        <div className="bg-white col-span-3">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Entity
            </h2>
            <p className="text-gray-600">Add a new entity to the Database</p>
          </div>

          <Form
            propName="Create Entity"
            handleSubmit={handleSubmit}
            isEdit={false}
          />
        </div>
      </div>
    </>
  );
};

export default Create;
