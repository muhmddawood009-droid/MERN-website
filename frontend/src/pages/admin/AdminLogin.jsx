import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LockIcon, MailIcon } from "lucide-react";
import { toast } from "react-hot-toast"; // or react-toastify, but be consistent
import { AppContext } from "../../context/AppContext";

const AdminLogin = () => {
  const { navigate, loading, setLoading, axios, setAdmin } = useContext(AppContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/admin/login", formData); // ✅ login route
      

      if (data.success) { 
        localStorage.setItem("admin", JSON.stringify(data.admin));
        setAdmin(true);
        toast.success(data.message);
        navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-[350px] text-center bg-gray-900 border border-gray-800 rounded-2xl px-6 py-8"
      >
        <h1 className="text-white text-2xl font-medium">Login</h1>
        <p className="text-gray-400 text-sm mt-2">Please Login to continue</p>

        <div className="flex items-center w-full mt-4 bg-gray-800 border border-gray-700 h-10 rounded-full pl-4 gap-2">
          <MailIcon className="text-white" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-10 rounded-full pl-4 gap-2">
          <LockIcon className="text-white" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full h-10 rounded-full text-white bg-orange-600 hover:bg-indigo-500 transition"
        >
          {loading ? "loading..." : "Login"}
        </button>

     
      </form>
    </div>
  );
};

export default AdminLogin;
