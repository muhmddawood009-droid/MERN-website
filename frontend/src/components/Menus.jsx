import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import MenuCart from "./MenuCart"; // import your card component

const Menus = () => {
  const { menus, fetchMenus } = useContext(AppContext);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">
            Our <span className="text-yellow-500">Menu</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our delicious selection of handcrafted dishes made with the finest ingredients.
          </p>
        </header>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menus?.length > 0 ? (
            menus.map((menu) => <MenuCart key={menu._id} menu={menu} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No menus available
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menus;
