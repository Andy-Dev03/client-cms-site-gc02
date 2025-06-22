import Button from "./Button";
const FormUser = ({ postNewUser, formAddUser, setFormAddUser }) => {
  const btnChangeUser = (event) => {
    const { name, value } = event.target;
    setFormAddUser({
      ...formAddUser,
      [name]: value,
    });
  };

  return (
    <>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          postNewUser(e, formAddUser);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Insert new username"
              onChange={btnChangeUser}
              value={formAddUser.username}
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Insert new phone number"
              onChange={btnChangeUser}
              value={formAddUser.phoneNumber}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Insert new email"
              onChange={btnChangeUser}
              value={formAddUser.email}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Insert new Password"
              onChange={btnChangeUser}
              value={formAddUser.password}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows="6"
            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            placeholder="Insert your address here..."
            onChange={btnChangeUser}
            value={formAddUser.address}
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          <Button nameProp="Add Staff" />
        </div>
      </form>
    </>
  );
};

export default FormUser;
