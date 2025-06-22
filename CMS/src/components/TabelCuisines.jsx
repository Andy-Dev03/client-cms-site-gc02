import { Link } from "react-router";

const TabelCuisines = ({ getCuisines, deleteButton }) => {
  return (
    <>
      <div className="hidden md:block rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full ">
            <thead className="bg-gray-900 border">
              <tr>
                <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  ImageUrl
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  createdAt
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  updatedAt
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  categoryId
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  authorId
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="text-center bg-white">
              {getCuisines.map((c) => (
                <tr key={c.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-200">
                    {c.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-40 border truncate border-gray-200">
                    {c.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-40 truncate border border-gray-200">
                    {c.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-200">
                    {c.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-40 truncate border border-gray-200">
                    {c.imgUrl}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-200">
                    {new Date(c.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-200">
                    {new Date(c.updatedAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-200">
                    {c.Category.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-200">
                    {c.User.username}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-200">
                    <div className="block ">
                      <Link to={`/${c.id}`}>
                        <button className="text-blue-600 hover:text-blue-900 mr-3 flex items-center">
                          <i className="fas fa-edit text-center mr-3"></i>
                          Edit
                        </button>
                      </Link>
                    </div>

                    <div className="block py-4">
                      <button
                        className="text-red-600 hover:text-red-900 flex items-center"
                        onClick={() => deleteButton(c.id)}
                      >
                        <i className="fas fa-trash mr-3"></i> Delete
                      </button>
                    </div>

                    <div className="block">
                      <Link to={`/upload/${c.id}`}>
                        <button className="text-yellow-500 hover:text-yellow-800 flex items-center">
                          <i className="fa-solid fa-file-arrow-up mr-3"></i>{" "}
                          Upload
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* When the view is under md */}
      <div className="md:hidden space-y-4">
        {getCuisines.map((c) => (
          <div key={c.id} className="bg-white rounded-lg p-4 border">
            <div className="flex justify-between mb-3 items-center">
              <h3 className="font-semibold text-lg text-gray-900">{c.name}</h3>
              <span className="text-sm text-gray-500">ID: {c.id}</span>
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-gray-600 line-clamp-2">{c.description}</p>
              <span className="text-gray-500 line-clamp-2">
                Image Url: {c.imgUrl}
              </span>
              <p className="font-semibold text-green-600">
                {c.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                <span>Category: {c.Category.name}</span>
                <span>Author: {c.User.username}</span>
                <span>
                  Created: {new Date(c.createdAt).toLocaleDateString("id-ID")}
                </span>
                <span>
                  Updated: {new Date(c.updatedAt).toLocaleDateString("id-ID")}
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4 pt-3 border-t">
              <Link to={`/${c.id}`}>
                <button className="flex items-center px-3 py-1 text-blue-600 hover:text-blue-900 ">
                  <i className="fas fa-edit mr-1"></i>
                  <span className="text-sm">Edit</span>
                </button>
              </Link>
              <button
                onClick={() => deleteButton(c.id)}
                className="flex items-center px-3 py-1 text-red-600 hover:text-red-900 "
              >
                <i className="fas fa-trash mr-1"></i>
                <span className="text-sm">Delete</span>
              </button>
              <div className="text-yellow-500 hover:text-yellow-800 flex items-center">
                <Link to={`/upload/${c.id}`}>
                  <button className="text-yellow-500 hover:text-yellow-800 flex items-center">
                    <i className="fa-solid fa-file-arrow-up mr-3"></i>
                    <span className="text-sm">Upload</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* When the cuisines is empty */}
      {getCuisines.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">
            <i className="fa-solid fa-database"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No cuisines found
          </h3>
        </div>
      )}
    </>
  );
};

export default TabelCuisines;
