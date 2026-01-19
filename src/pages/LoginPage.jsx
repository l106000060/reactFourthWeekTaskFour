// 外部資源
import { useState } from "react";
import axios from "axios";

// 內部資源
import logo from "../assets/images/logos/FOCUS-FITNESS-logo-3-long-big.png";

// API網域
const baseUrl = import.meta.env.VITE_BASE_URL;

// Login元件
function LoginPage({ setIsAuth, authorization, getAllProducts }) {
  // 登入api資料
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  // 驗證登入
  const checkLogin = async () => {
    try {
      await axios.post(`${baseUrl}/v2/api/user/check`);
      // 判斷顯示登入頁面或商品列表頁
      setIsAuth(true);
      //取得商品api、loading
      getAllProducts();
    } catch (error) {
      console.log(error);
      alert("您尚未登入");
    }
  };

  // 帳密輸入事件處理函式
  const handleLoginChange = (e) => {
    const { value, name } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
    // console.log(login);
  };

  // 登入按鈕事件處理函式
  const handleLoginBtn = async (e) => {
    e.preventDefault();
    try {
      // 取得登入api
      const res = await axios.post(`${baseUrl}/v2/admin/signin`, login);
      const { token, expired } = res.data;
      // 將token存入cookie
      document.cookie = `token=${token}; expires=${expired}`;
      // 權限
      authorization();
      // 驗證登入
      checkLogin();
    } catch (error) {
      console.log(error);
      alert("登入失敗");
    }
  };

  // JSX
  return (
    <>
      <div className="p-5">
        <div className="container text-center bg-white-opacity-20 p-3 rounded-3">
          <div className="row">
            {/*圖片*/}
            <div className="col-6">
              <div className="h-100 d-flex justify-content-center align-items-end login-bg rounded-3">
                {/*logo*/}
                <div className="max-w-182 mb-8">
                  <img src={logo} alt="logo" />
                </div>
              </div>
            </div>
            {/*表單*/}
            <div className="col-6 pt-107 pb-107">
              <div>
                {/*標題*/}
                <div className="text-start mb-7">
                  <h2 className="fs-7 fw-bold mb-3 text-primary-400">
                    {/* Login */}
                  </h2>
                  <h2 className="fs-2 fw-bold lh-sm">會員登入</h2>
                </div>
                <form onSubmit={handleLoginBtn}>
                  <div className="mb-3 text-start">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      帳號<span className="text-danger-normal">*</span>
                    </label>
                    <input
                      name="username"
                      value={login.username}
                      onChange={handleLoginChange}
                      type="email"
                      className="form-control pt-2 pb-2"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="請輸入電子郵件帳號"
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      密碼<span className="text-danger-normal">*</span>
                    </label>
                    <input
                      name="password"
                      value={login.password}
                      onChange={handleLoginChange}
                      type="password"
                      className="form-control pt-2 pb-2"
                      id="exampleInputPassword1"
                      placeholder="請輸入密碼"
                    />
                  </div>
                  <button
                    onClick={handleLoginBtn}
                    className="btn btn-primary-400 w-100 pt-3 pb-3 fs-7 fw-bold"
                  >
                    登入
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
