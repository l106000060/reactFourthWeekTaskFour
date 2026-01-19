// 外部資源
import axios from "axios";

function ProductModal({
  productsModalRef,
  productData,
  modalCategory,
  productsModalRefIns,
  setproductData,
  getAllProducts,
}) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const path = import.meta.env.VITE_API_PATH;

  const handleAddProduct = async () => {
    const apiExchange = modalCategory === "create" ? addProducts : editProducts;
    try {
      await apiExchange();
      getAllProducts();
      handleCloseProductsModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseProductsModal = () => {
    productsModalRefIns.current.hide();
  };

  // 新增商品功能
  const addProducts = async () => {
    try {
      await axios.post(`${baseUrl}/v2/api/${path}/admin/product`, {
        data: {
          ...productData,
          origin_price: Number(productData.origin_price),
          price: Number(productData.price),
          is_enabled: productData.is_enabled ? 1 : 0,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 修改商品功能
  const editProducts = async () => {
    try {
      await axios.put(
        `${baseUrl}/v2/api/${path}/admin/product/${productData.id}`,
        {
          data: {
            ...productData,
            origin_price: Number(productData.origin_price),
            price: Number(productData.price),
            is_enabled: productData.is_enabled ? 1 : 0,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductData = (e) => {
    const { value, name, checked, type } = e.target;

    setproductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageEdit = (e, index) => {
    const { value } = e.target;
    const newImages = [...productData.imagesUrl];
    newImages[index] = value;
    setproductData({
      ...productData,
      imagesUrl: newImages,
    });
  };

  const handleAddImage = () => {
    const newImages = [...productData.imagesUrl, ""];

    setproductData({
      ...productData,
      imagesUrl: newImages,
    });
  };

  const handleDelImage = () => {
    const newImages = [...productData.imagesUrl];

    newImages.pop();

    setproductData({
      ...productData,
      imagesUrl: newImages,
    });
  };

  return (
    <>
      {/* 新增、編輯商品modal */}
      <div className="modal " tabIndex="-1" ref={productsModalRef}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content bg-blue-900 border-white text-white">
            {/* modal header */}
            <div className="modal-header border-white">
              <h5 className="modal-title">
                {modalCategory === "create" ? "新增商品" : "編輯商品"}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                onClick={handleCloseProductsModal}
              ></button>
            </div>

            {/* modal body */}
            <div className="modal-body">
              <div className="row">
                {/* 商品圖片 */}
                <div className="col-4">
                  {/* 首圖 */}
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      請輸入首圖網址
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cover-image"
                      placeholder="請輸入首圖網址"
                      name="imageUrl"
                      value={productData.imageUrl}
                      onChange={handleProductData}
                    />
                    <img
                      src={productData.imageUrl}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  {/* 其他圖片 */}
                  <div>
                    {productData.imagesUrl?.map((image, index) => (
                      <div key={index} className="mb-2">
                        <label
                          htmlFor={`imagesUrl-${index + 1}`}
                          className="form-label"
                        >
                          圖片網址 {index + 1}
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          id={`imagesUrl-${index + 1}`}
                          placeholder={`圖片網址 ${index + 1}`}
                          value={image}
                          onChange={(e) => handleImageEdit(e, index)}
                        />
                        {image && (
                          <img
                            src={image}
                            alt={`圖片 ${index + 1}`}
                            className="img-fluid mb-2"
                          />
                        )}
                      </div>
                    ))}
                    <div>
                      {productData.imagesUrl.length < 5 &&
                        productData.imageUrl[
                          productData.imagesUrl.length - 1
                        ] !== "" && (
                          <button
                            type="button"
                            className="btn btn-primary-400 text-grey-900 fs-6 hover-effect me-2"
                            onClick={handleAddImage}
                          >
                            新增圖片
                          </button>
                        )}
                      {productData.imagesUrl.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-danger-normal text-white fs-6 hover-effect"
                          onClick={handleDelImage}
                        >
                          取消圖片
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {/* 商品內容 */}
                <div className="col-8">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      標題
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="請輸入商品標題"
                      name="title"
                      value={productData.title}
                      onChange={handleProductData}
                    />
                  </div>

                  <div className="row">
                    <div className="col-3">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          分類
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="category"
                          placeholder="請輸入商品分類"
                          name="category"
                          value={productData.category}
                          onChange={handleProductData}
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          單位
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="unit"
                          placeholder="請輸入商品單位"
                          name="unit"
                          value={productData.unit}
                          onChange={handleProductData}
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          原價
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="origin_price"
                          placeholder="請輸入商品原價"
                          name="origin_price"
                          value={productData.origin_price}
                          onChange={handleProductData}
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          售價
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="price"
                          placeholder="請輸入商品售價"
                          name="price"
                          value={productData.price}
                          onChange={handleProductData}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      描述
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="description"
                      placeholder="請輸入商品描述"
                      name="description"
                      value={productData.description}
                      onChange={handleProductData}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      內容
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="content"
                      placeholder="請輸入商品內容"
                      name="content"
                      value={productData.content}
                      onChange={handleProductData}
                    />
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={productData.is_enabled}
                      onChange={handleProductData}
                      id="isEnabled"
                      name="is_enabled"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      是否上架
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* modal footer */}
            <div className="modal-footer border-white">
              <button
                type="button"
                className="btn btn-primary-400 text-grey-900 fs-6 hover-effect me-2"
                onClick={handleAddProduct}
              >
                確認
              </button>
              <button
                type="button"
                className="btn btn-danger-normal text-white fs-6 hover-effect"
                onClick={handleCloseProductsModal}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductModal;
