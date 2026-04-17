import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AppContext = createContext(null);

// ✅ Configure axios globally
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

// ✅ Attach token automatically for protected routes
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // 🔧 State
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // 🛒 Fetch Cart
  const fetchCartData = async () => {
    try {
      const { data } = await axios.get("/api/cart/get");
      if (data.success) {
        setCart(Array.isArray(data.cart) ? data.cart : []);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // 🧮 Calculate totals whenever cart changes
  useEffect(() => {
    if (Array.isArray(cart)) {
      const total = cart.reduce(
        (sum, item) => sum + item.menuItem.price * item.quantity,
        0
      );
      setTotalPrice(total);

      const count = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    } else {
      setTotalPrice(0);
      setCartCount(0);
    }
  }, [cart]);

  // ➕ Add to Cart
  const addToCart = async (menuId) => {
    try {
      const { data } = await axios.post("/api/cart/add", { menuId, quantity: 1 });
      if (data.success) {
        toast.success(data.message);
        fetchCartData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong");
    }
  };
const removeFromCart = async (menuId) => {
  try {
    const { data } =await axios.delete(`/api/cart/remove/${menuId}`);
    if (data.success) {
      toast.success(data.message);
      fetchCartData();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Remove from the cart error:" , error);
    toast.error("something went wrong");
  }
};
  // 📂 Fetch Categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // 🍽️ Fetch Menus
  const fetchMenus = async () => {
    try {
      const { data } = await axios.get("/api/menu");
      if (data.success) {
        setMenus(data.menuItems);
      }
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };

  // 🔐 Auth Check
  const isAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/is-auth");
      if (data.success) {
        setUser(data.user);
        setAdmin(data.user?.role === "admin");
      } else {
        setUser(null);
        setAdmin(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      setAdmin(false);
    }
  };

  // 🚀 Initial Load
  useEffect(() => {
    isAuth();
    fetchCategories();
    fetchMenus();
    fetchCartData();
  }, []);

  // 🌍 Context Value
  const value = {
    navigate,
    loading,
    setLoading,
    user,
    setUser,
    admin,
    setAdmin,
    categories,
    fetchCategories,
    menus,
    fetchMenus,
    addToCart,
    cart,
    setCart,
    totalPrice,
    cartCount,
    axios, // expose axios if needed
    removeFromCart,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
