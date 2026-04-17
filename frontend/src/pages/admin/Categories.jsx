import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX } from "lucide-react";
import { toast } from "react-hot-toast";

const Categories = () => {
  const { categories, fetchCategories, axios } = useContext(AppContext);

  // Fetch categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (id) => {
    try {
      // ✅ Correct route: /api/category/delete/:id
      const { data } = await axios.delete(`/api/category/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // adminOnly requires token
        },
      });

      if (data.success) {
        toast.success(data.message);
        fetchCategories(); // refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting category");
    }
  };

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-3">All Categories</h1>
      <div className="border border-gray-400 max-w-5xl mx-auto p-3">
        <div className="grid grid-cols-3 font-semibold text-gray-700">
          <div>Image</div>
          <div>Name</div>
          <div>Action</div>
        </div>
        <hr className="w-full my-4 text-gray-200" />

        {categories && categories.length > 0 ? (
          categories.map((item) => (
            <div key={item._id}>
              <div className="grid grid-cols-3 items-center mb-4">
                <div className="flex items-center gap-2 max-w-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
                <p>{item.name}</p>
                <button
                  className="text-red-600 cursor-pointer hover:underline flex items-center gap-1"
                  onClick={() => deleteCategory(item._id)}
                >
                  <CircleX /> Delete
                </button>
              </div>
              <hr className="w-full text-gray-300" />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
