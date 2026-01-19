// 外部資源
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import Pagination from "../components/pagination";
import ProductModal from "../components/ProductModal";
import DelProductModal from "../components/delProductModal";

function ProductsPage({
  products,
  loadingProducts,
  pageProducts,
  getAllProducts,
}) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const path = import.meta.env.VITE_API_PATH;

  const modalInputValue = {
    imageUrl: "",
    title: "",
    category: "",
    unit: "",
    origin_price: "",
    price: "",
    description: "",
    content: "",
    is_enabled: 0,
    imagesUrl: [""],
  };
  const [productData, setproductData] = useState(modalInputValue);
  const [modalCategory, setmodalCategory] = useState(null);
  const productsModalRef = useRef(null);
  const delproductsModalRef = useRef(null);
  const productsModalRefIns = useRef(null);
  const delproductsModalRefIns = useRef(null);

  // 判斷開啟編輯，還是新增商品modal
  const handleOpenProductsModal = (category, product) => {
    setmodalCategory(category);

    if (category === "edit" && product) {
      setproductData({ ...product });
    } else {
      setproductData({ ...modalInputValue });
    }

    productsModalRefIns.current.show();
  };

  // 開啟、關閉刪除商品modal
  const handleOpenDelProductsModal = (product) => {
    setproductData(product);
    delproductsModalRefIns.current.show();
  };

  // 取得modal的DOM節點
  useEffect(() => {
    productsModalRefIns.current = new Modal(productsModalRef.current);
    delproductsModalRefIns.current = new Modal(delproductsModalRef.current);
  }, []);

  // JSX
  return (
    <>
      {/*商品列表頁*/}
      <div className="container">
        <h1 className="text-center mb-4">Focus Fitness</h1>
        {/* 格線系統 */}
        <div className="row mb-4">
          {/* 商品清單區塊 */}
          <div className="col">
            <div className="border p-2 rounded-1">
              <h2 className="text-center  mb-3">商品清單</h2>
              <table className="table mb-0 table-hover table-bg table-color mb-3">
                <thead>
                  <tr>
                    <th scope="col">裝備</th>
                    <th scope="col">原價</th>
                    <th scope="col">售價</th>
                    <th scope="col">是否上架</th>
                    <th scope="col" className="text-end">
                      <button
                        type="button"
                        className="btn btn-success-dark text-white fs-6 hover-effect"
                        onClick={() => handleOpenProductsModal("create")}
                      >
                        建立新商品
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loadingProducts ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        資料載入中...
                      </td>
                    </tr>
                  ) : products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id}>
                        <th scope="row">{product.title}</th>
                        <td>{product.origin_price}</td>
                        <td>{product.price}</td>
                        <td>
                          {product.is_enabled ? (
                            <span>上架</span>
                          ) : (
                            <span className="text-danger-normal">下架</span>
                          )}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary-400 text-grey-900 fs-6 hover-effect me-2"
                            onClick={() =>
                              handleOpenProductsModal("edit", product)
                            }
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger-normal text-white fs-6 hover-effect"
                            onClick={() => handleOpenDelProductsModal(product)}
                          >
                            刪除
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        尚無商品
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          pageProducts={pageProducts}
          getAllProducts={getAllProducts}
        />
      </div>
      {/* 新增、編輯商品modal */}
      <ProductModal
        productData={productData}
        productsModalRef={productsModalRef}
        modalCategory={modalCategory}
        productsModalRefIns={productsModalRefIns}
        setproductData={setproductData}
        getAllProducts={getAllProducts}
      />
      {/* 刪除商品modal */}
      <DelProductModal
        delproductsModalRef={delproductsModalRef}
        productData={productData}
        delproductsModalRefIns={delproductsModalRefIns}
        getAllProducts={getAllProducts}
      />
    </>
  );
}

export default ProductsPage;
