import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Upload } from "lucide-react";
import { toast } from "react-hot-toast";

const AddMenu = () => {
  const { axios, navigate, loading, setLoading } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",   // will hold dummy value like "burger"
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }
    if (!file) {
      toast.error("Please upload an image");
      return;
    }

    try {
      setLoading(true);

      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("price", formData.price);
      formDataObj.append("description", formData.description);
      formDataObj.append("category", formData.category); // dummy category string
      formDataObj.append("image", file);

      const { data } = await axios.post("/api/menu/add", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/admin/menus"); // ✅ redirect to All Menus
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding menu:", error);
      toast.error(error.response?.data?.message || "Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 min-h-screen flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full flex flex-col gap-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Menu Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Menu name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Menu Price *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Menu Price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Menu Description *
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Menu description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a category</option>
            {/* ✅ Hardcoded dummy options */}
            <option value="burger">Burger</option>
            <option value="pizza">Pizza</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Menu Image *
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
            border-dashed border-gray-300 rounded-lg cursor-pointer"
          >
            <Upload className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-gray-600 text-sm">
              {file ? file.name : "Click to upload an image"}
            </span>
          </label>
        </div>

        {preview && <img src={preview} alt="Menu preview" className="w-24 rounded-md" />}

        <button 
          type="submit"
          className="bg-orange-500 text-white px-8 py-3 rounded-md cursor-pointer w-fit"
        >
          {loading ? "Adding..." : "Add menu"}
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
