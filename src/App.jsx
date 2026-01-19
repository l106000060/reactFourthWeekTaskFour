// 外部資源
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage.jsx";

function App() {
  console.log("App render");

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const path = import.meta.env.VITE_API_PATH;

  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [pageProducts, setPageProducts] = useState({});

  // 驗證
  const authorization = () => {
    // 從cookie取得token
    const autoken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    // 將tokens放入headers
    axios.defaults.headers.common["Authorization"] = autoken;
  };
  authorization();

  // 取得所有商品
  const getAllProducts = async (page = 1) => {
    setLoadingProducts(true);
    try {
      const allProductRes = await axios.get(
        `${baseUrl}/v2/api/${path}/admin/products?page=${page}`,
      );
      setProducts(allProductRes.data.products);
      setPageProducts(allProductRes.data.pagination);
      setLoadingProducts(false);
    } catch {
      console.log(error);
    }
  };

  return (
    <>
      {isAuth ? (
        <ProductsPage
          products={products}
          loadingProducts={loadingProducts}
          pageProducts={pageProducts}
          getAllProducts={getAllProducts}
        />
      ) : (
        <LoginPage
          setIsAuth={setIsAuth}
          authorization={authorization}
          getAllProducts={getAllProducts}
        />
      )}
    </>
  );
}

export default App;
