import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX } from "lucide-react";
import { toast } from "react-hot-toast";

const Menus = () => {
  const { menus, fetchMenus, axios } = useContext(AppContext);

  // ✅ Fetch menus when component mounts
  useEffect(() => {
    fetchMenus();
  }, []);

  const deleteMenu = async (id) => {
    try {
      const { data } = await axios.delete(`/api/menu/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchMenus(); // refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting menu");
    }
  };

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-3">All Menus</h1>
      <div className="border border-gray-400 max-w-5xl mx-auto p-3">
        <div className="grid grid-cols-5 font-semibold text-gray-700">
          <div>Image</div>
          <div>Name</div>
          <div>Category</div>
          <div>Price</div>
          <div>Action</div>
        </div>
        <hr className="w-full my-4 text-gray-200" />
        <ul>
          {menus && menus.length > 0 ? (
            menus.map((item) => (
              <li key={item._id}>
                <div className="grid grid-cols-5 items-center mb-4">
                  <div className="flex items-center gap-2 max-w-md">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </div>
                  <p>{item.name}</p>
                  <p>{item.category?.name || "Unknown"}</p>
                  <p>${item.price}</p>
                  <button
                    className="text-red-600 cursor-pointer hover:underline flex items-center gap-1"
                    onClick={() => deleteMenu(item._id)}
                  >
                    <CircleX /> Delete
                  </button>
                </div>
                <hr className="w-full text-gray-300" />
              </li>
            ))
          ) : (
            <p className="text-gray-500">No menus found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Menus;
