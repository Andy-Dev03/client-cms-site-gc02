import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useEffect } from "react";
import Toastify from "toastify-js";

const Upload = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [getUploadDetail, setUploadDetail] = useState({});
  const [imageFile, setImageFile] = useState("");

  // Get detail
  const uploadDetail = async () => {
    const { data } = await axios.get(`https://andylie.web.id/cuisines/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
      },
    });

    setUploadDetail(data.data);
  };

  // Upload

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("imgUrl", imageFile);

      const { data } = await axios.patch(
        `https://andylie.web.id/cuisines/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      );

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

      navigate("/");
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    uploadDetail();
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="bg-white col-span-3">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upload Image</h2>
          <p className="text-gray-600">Upload image for entity</p>
        </div>

        <form className="space-y-6" onSubmit={handleUpload}>
          <div>
            <div className="block text-xl font-medium text-gray-700 mb-2">
              Entity Name
            </div>
            <p className="text-gray-500 text-lg">{getUploadDetail?.name}</p>
          </div>

          <div>
            <label
              htmlFor="imageFile"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Image File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center flex items-center">
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-700"
              />
              <i className="fa-solid fa-cloud-arrow-up text-gray-500 text-xl"></i>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Link to={"/"}>
              <button
                type="button"
                className="px-4 py-2 border border-black text-black font-semibold rounded-md hover:bg-red-600/70 hover:text-white"
                hidden={loading}
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-3"></i>
                  Uploading...
                </>
              ) : (
                <>
                  <i className="fas fa-upload mr-2"></i>
                  Upload Image
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
