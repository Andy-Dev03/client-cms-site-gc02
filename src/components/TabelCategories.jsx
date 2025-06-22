const TabelCategories = ({ getCategories }) => {
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
                  createdAt
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  updatedAt
                </th>
              </tr>
            </thead>
            <tbody className="text-center bg-white">
              {getCategories.map((cate) => (
                <tr key={cate.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-40 truncate border border-gray-200">
                    {cate.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-200">
                    {cate.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-200">
                    {new Date(cate.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-200">
                    {new Date(cate.updatedAt).toLocaleDateString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* When the view is under md */}
      <div className="md:hidden space-y-4">
        {getCategories.map((cate) => (
          <div key={cate.id} className="bg-white rounded-lg p-4 border">
            <div className="flex justify-between mb-3 items-center ">
              <h3 className="font-semibold text-lg text-gray-900">
                {cate.name}
              </h3>
              <span className="text-sm text-gray-500">ID: {cate.id}</span>
            </div>

            <div className="flex flex-col text-xs text-gray-500 gap-2">
              <span>
                Created: {new Date(cate.createdAt).toLocaleDateString("id-ID")}
              </span>
              <span>
                Updated: {new Date(cate.updatedAt).toLocaleDateString("id-ID")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* When the cuisines is empty */}
      {getCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">
            <i className="fa-solid fa-database"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No categories found
          </h3>
        </div>
      )}
    </>
  );
};

export default TabelCategories;
