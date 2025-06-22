const Button = ({ nameProp }) => {
  return (
    <button
      type="submit"
      className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600"
    >
      {nameProp}
    </button>
  );
};

export default Button;
