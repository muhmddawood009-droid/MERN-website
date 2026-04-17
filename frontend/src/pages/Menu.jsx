import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Search, X } from "lucide-react";
import MenuCart from "../components/MenuCart"; // ✅ use default import

const Menu = () => {
  const { menus } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenus, setFilteredMenus] = useState([]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredMenus(
      query === ""
        ? menus
        : menus.filter((menu) =>
            menu.name.toLowerCase().includes(query)
          )
    );
  }, [searchQuery, menus]);

  const handleClearSearch = () => setSearchQuery("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          Our <span className="text-yellow-500">Menu</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our delicious selection of handcrafted dishes made with the finest ingredients
        </p>
      </div>

      {/* Search Box */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for your favorite dish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 rounded-full border-2 border-gray-200 focus:border-yellow-500 focus:outline-none transition-colors duration-300 text-gray-700 placeholder-gray-400 shadow-md"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-center text-gray-600">
        {searchQuery ? (
          <>
            Found{" "}
            <span className="font-semibold text-yellow-600">
              {filteredMenus.length}
            </span>{" "}
            {filteredMenus.length === 1 ? "result" : "results"} for "{searchQuery}"
          </>
        ) : (
          <>
            Showing{" "}
            <span className="font-semibold text-yellow-600">
              {filteredMenus.length}
            </span>{" "}
            {filteredMenus.length === 1 ? "dish" : "dishes"}
          </>
        )}
      </div>

      {/* Menu Grid */}
      {filteredMenus.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMenus.map((menu) => (
            <MenuCart key={menu._id} menu={menu} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">No results found for "{searchQuery}"</p>
          <button
            onClick={handleClearSearch}
            className="mt-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5 inline-block mr-2" /> Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
