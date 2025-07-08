import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './index.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => {
        const withColor = data.map(p => ({ ...p, selectedColor: 'yellow' }));
        setProducts(withColor);
      })
      .catch(err => console.error("API Error:", err));
  }, []);

  const handleColorChange = (index, color) => {
    const updated = [...products];
    updated[index].selectedColor = color;
    setProducts(updated);
  };

  const renderStars = (score) => {
    const full = Math.floor(score);
    const half = score % 1 >= 0.25 && score % 1 < 0.75;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <div className="flex items-center gap-1 text-yellow-500 text-[20px]">
        {Array.from({ length: full }).map((_, i) => <span key={`full-${i}`}>★</span>)}
        {half && (
          <span className="relative w-5 h-5 inline-block">
            <span className="absolute w-2.5 overflow-hidden text-yellow-500">★</span>
            <span className="text-gray-300">★</span>
          </span>
        )}
        {Array.from({ length: empty }).map((_, i) => <span key={`empty-${i}`}>☆</span>)}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto font-avenir">
      <h1 className="text-[45px] font-normal text-center mb-6">Product List</h1>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
        }}
        className="pb-10"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="min-w-[250px] max-w-[250px] border p-4 rounded-lg shadow hover:shadow-lg transition bg-white">
              <img
                src={product.images[product.selectedColor]}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h2 className="text-[15px] font-medium font-montserrat">{product.name}</h2>
              <p className="text-[15px] text-gray-700 font-normal font-montserrat">${product.price} USD</p>
              <p className="text-[12px] text-gray-600 font-[Avenir] capitalize">
                {product.selectedColor} Gold
              </p>
              <div className="mt-1">{renderStars(product.popularityScore5)}</div>

              <div className="flex gap-2 mt-2">
                {['yellow', 'white', 'rose'].map(color => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(index, color)}
                    className={`w-6 h-6 rounded-full border-2 ${
                      color === 'yellow' ? 'bg-[#E6CA97]' :
                      color === 'white' ? 'bg-[#D9D9D9]' :
                      'bg-[#E1A4A9]'
                    } ${product.selectedColor === color ? 'ring-2 ring-black' : ''}`}
                  />
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default App;
