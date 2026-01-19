function Pagination({ pageProducts, getAllProducts }) {
  // 取得某頁商品
  const handlePageNumProducts = (page) => {
    getAllProducts(page);
  };
  return (
    <>
      {/*分頁元件*/}
      <nav aria-label="Page navigation example ">
        <ul className="pagination justify-content-center">
          {/*上一頁按鈕*/}
          <li className={`page-item ${!pageProducts.has_pre && "disabled"}`}>
            <a
              className={`page-link ${
                !pageProducts.has_pre
                  ? "bg-gray-200 text-gray-400 pointer-events-none"
                  : "bg-blue-900 text-primary-400"
              }`}
              href="#"
              aria-label="Previous"
              onClick={() =>
                handlePageNumProducts(pageProducts.current_page - 1)
              }
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {/*頁碼按鈕*/}
          {Array.from({ length: pageProducts.total_pages }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${pageProducts.current_page === index + 1 && "active"}`}
            >
              <a
                className="page-link bg-blue-900 text-primary-400"
                href="#"
                onClick={() => handlePageNumProducts(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}
          {/*下一頁按鈕*/}
          <li className={`page-item ${!pageProducts.has_next && "disabled"}`}>
            <a
              className={`page-link ${
                !pageProducts.has_next
                  ? "bg-gray-200 text-gray-400 pointer-events-none"
                  : "bg-blue-900 text-primary-400"
              }`}
              href="#"
              aria-label="Next"
              onClick={() =>
                handlePageNumProducts(pageProducts.current_page + 1)
              }
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Pagination;
