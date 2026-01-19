// 外部資源
import { useState, useRef, useEffect } from "react";
import axios from "axios";

function DelProductModal({
  delproductsModalRef,
  productData,
  delproductsModalRefIns,
  getAllProducts,
}) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const path = import.meta.env.VITE_API_PATH;

  // 刪除商品功能
  const delProduct = async () => {
    try {
      await axios.delete(
        `${baseUrl}/v2/api/${path}/admin/product/${productData.id}`,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseDelProductsModal = () => {
    delproductsModalRefIns.current.hide();
  };

  // 刪除商品事件處理函式
  const handleDelProduct = async () => {
    try {
      await delProduct();
      getAllProducts();
      handleCloseDelProductsModal();
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      {/* 刪除商品modal */}
      <div className="modal" tabIndex="-1" ref={delproductsModalRef}>
        <div className="modal-dialog">
          <div className="modal-content bg-blue-900 border-white text-white">
            <div className="modal-header">
              <h5 className="modal-title">刪除商品</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                onClick={handleCloseDelProductsModal}
              ></button>
            </div>
            <div className="modal-body">
              <p>確定要刪除商品嗎?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary-400 text-grey-900 fs-6 hover-effect me-2"
                onClick={handleDelProduct}
              >
                確認
              </button>
              <button
                type="button"
                className="btn btn-danger-normal text-white fs-6 hover-effect"
                onClick={handleCloseDelProductsModal}
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

export default DelProductModal;
