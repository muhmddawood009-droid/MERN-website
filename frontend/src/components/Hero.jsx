import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { navigate } = useContext(AppContext);

  return (
    <section
      className="relative h-[90vh] flex items-center justify-center bg-center bg-cover filter brightness-110 contrast-105"
      style={{ backgroundImage: "url('/background copy.jpeg')" }} // ✅ from public folder
    >
      {/* Overlay (lighter) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Restaurant
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Experience the taste of perfection — where every bite tells a story.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/menu")}
            className="cursor-pointer bg-orange-500 hover:bg-orange-600 
            text-black font-semibold px-6 py-3 rounded-full transition-all duration-300"
          >
            All Menus
          </button>

          <button
            onClick={() => navigate("/book-table")}
            className="cursor-pointer border border-white bg-transparent hover:bg-white 
            hover:text-black text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
          >
            Book a Table
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
