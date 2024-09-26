import { Fragment, useEffect, useRef, useState } from "react";
import CardProduct from "../components/Fragments/CardProduct";
import Button from "../components/Elements/Button";
import { getProducts } from "../services/product.service";
import { getUsername } from "../services/auth.service";

const token = localStorage.getItem("token");

const ProductsPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);


  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.href = "/login";
  };

  const handleAddToCart = (id) => {
    if (cart.find((item) => item.id === id)) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { id, qty: 1 }]);
    }
  };  

  // useRef
  const cartRef = useRef(JSON.parse(localStorage.getItem("cart")) || []);

  const handleAddToCartRef = (id) => {
    cartRef.current = [...cartRef.current, { id, qty: 1 }];
    localStorage.setItem("cart", JSON.stringify(cartRef.current));
  };

  const totalpriceRef = useRef(null);

  useEffect(() => {
    if (cart.length > 0) {
      totalpriceRef.current.style.display = "table-row";
    } else {
      totalpriceRef.current.style.display = "none";
    }
  }, [cart]);

  return (
    <Fragment>
      <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10 rounded-full  ml-5 mr-5 my-5">
        {email}
        <Button
          classname="ml-5 bg-slate-800 hover:bg-yellow-500 rounded-full"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <div className="flex justify-center py-5">
        <div className="w-3/4 flex flex-wrap mx-7">
          {products.length > 0 &&
            products.map((product) => (
              <CardProduct key={product.id}>
                <CardProduct.Header image={product.image} />
                <CardProduct.Body name={product.title}>
                  {product.description}
                </CardProduct.Body>
                <CardProduct.Footer
                  price={product.price}
                  id={product.id}
                  handleAddToCart={handleAddToCart}
                />
              </CardProduct>
            ))}
        </div>
        <div className="w-1/4 mr-12">
          <h1 className="text-3xl font-bold text-blue-500 mb-2 pl-5">Cart</h1>
          <table className="table-auto  text-left border-separate border-spacing-x-5 border-spacing-y-3 border-4 ">
            <thead>
              <tr>
                <th className="border-b border-gray-500">Product</th>
                <th className="border-b border-gray-500">Harga</th>
                <th className="border-b border-gray-500">Quantity</th>
                <th className="border-b border-gray-500">Total</th>
              </tr>
            </thead>
            <tbody className="border-b border-gray-700">
              {products.length > 0 &&
                cart.map((item) => {
                  const product = products.find(
                    (product) => product.id === item.id
                  );
                  return (
                    <tr key={item.id}>
                      <td>{product.title.substring(0, 15)}...</td>
                      <td>
                        ${" "}
                        {product.price.toLocaleString("id-ID", {
                          styles: "currency",
                          currency: "USD",
                        })}
                      </td>
                      <td>{item.qty}</td>
                      <td>
                        ${" "}
                        {(item.qty * product.price).toLocaleString("id-ID", {
                          styles: "currency",
                          currency: "USD",
                        })}
                      </td>
                    </tr>
                  );
                })}
              <tr ref={totalpriceRef}>
                <td colSpan={3}>
                  <b>Total Harga</b>
                </td>
                <td>
                  <b>
                    ${" "}
                    {totalPrice.toLocaleString("id-ID", {
                      styles: "currency",
                      currency: "USD",
                    })}
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsPage;
