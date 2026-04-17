import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Upload } from "lucide-react";
import { toast } from "react-hot-toast";

const AddCategory = () => {
  const { axios, navigate, loading, setLoading } = useContext(AppContext);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !file) {
      toast.error("Name and image are required");
      return;
    }

    try {
      setLoading(true);

      const formDataObj = new FormData();
      formDataObj.append("name", name);
      formDataObj.append("image", file);

      const { data } = await axios.post("/api/category/add", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/admin/categories"); // ✅ redirect to All Categories
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full flex flex-col gap-5"
      >
        {preview && (
          <img
            src={preview}
            alt="Category preview"
            className="w-1/2 rounded-md mb-4"
          />
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:border-transparent"
            placeholder="Enter category name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Image *
          </label>
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            onChange={handleFileChange}
            required
          />
          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center w-full h-32 border-2
            border-dashed border-gray-300 rounded-lg cursor-pointer
            focus:outline-none focus:ring-2 transition"
          >
            <Upload className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-gray-600 text-sm">
              {file ? file.name : "Click to upload an image"}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white px-8 py-3 rounded-md cursor-pointer"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;


