import FormUser from "../components/FormUser";
import Toastify from "toastify-js";
import axios from "axios";
const Add = () => {
  // Post new User
  const postNewUser = async (event, formAddUser) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "https://www.andylie.web.id/add-user",
        formAddUser,
        {
          headers: { Authorization: `Bearer ${localStorage.accessToken}` },
        }
      );

      Toastify({
        text: `Success add ${data.data.username} to the Staff`,
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
          fontSize: "14px",
          paddingRight: "2.5rem",
        },
      }).showToast();
    }
  };

  return (
    <>
      <div className="min-h-screen md:pb-0 md:p-6 p-4 pb-24">
        <div className="bg-white col-span-3">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Add New User</h2>
            <p className="text-gray-600">
              Register a new staff to the Database
            </p>
          </div>
          <FormUser postNewUser={postNewUser} />
        </div>
      </div>
    </>
  );
};

export default Add;
