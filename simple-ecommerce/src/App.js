import { useEffect, useState } from "react";
import API from "./api/axios";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("products/");
      console.log("API Response:", res.data);

      // If your API returns pagination (results)
      if (res.data.results) {
        setProducts(res.data.results);
      } else {
        setProducts(res.data);
      }

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (loading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-xl font-bold">My Shop</div>
        <div className="text-sm font-medium">
          Cart: <span className="text-blue-600">{cart.length}</span>
        </div>
      </header>

      {/* Products */}
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded shadow flex flex-col"
            >
              <div className="text-lg font-bold">{product.name}</div>
              <div className="text-gray-600">${product.price}</div>

              <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-blue-600 text-white p-2 rounded mt-4"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Cart */}
      <footer className="bg-white p-4 shadow fixed bottom-0 left-0 w-full">
        <div className="flex justify-between">
          <div className="font-bold">Total:</div>
          <div className="text-blue-600 font-bold">${total.toFixed(2)}</div>
        </div>

        <div className="mt-2">
          <h3 className="font-bold">Cart Items</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.name} x {item.qty}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default App;


