import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getAllProducts = () => {
    fetch("products.json")
        .then((response) => response.json())
        .then((products) => setProducts(products))
        .catch((error) => console.error("Error fetching the products:", error));
  };

  useEffect(() => getAllProducts, []);

  const getGirlsToys = () => {
      fetch("products.json")
        .then((response) => response.json())
        .then((products) => {
            let girlsToys = products.filter((product) => product.category === "girls_toys" || product.category === "both_toys");
            setProducts(girlsToys);
          })
        .catch((error) =>
          console.error("Error fetching the Girls Products:", error)
      );
    };
    const getBoysToys = () => {
      fetch("products.json")
        .then((response) => response.json())
        .then((products) => {
            let boysToys = products.filter((product) => product.category === "boys_toys" || product.category === "both_toys");
            setProducts(boysToys);
          })
        .catch((error) =>
          console.error("Error fetching the Boys Products:", error)
      );
    };
    const getAdultsToys = () => {
      fetch("products.json")
        .then((response) => response.json())
        .then((products) => {
          let adultsToys = products.filter((product) => product.category === "adults_toys" || product.category === "all_ages_toys");
            setProducts(adultsToys);
        })
        .catch((error) =>
          console.error("Error fetching the Adults Products:", error)
      );
  };

  return (
    <>
      <header dir="ltr" className="bg-violet-500 p-2 text-black text-white font-extrabold font-mono text-xl text-center">
        <p>Toys 'N More  -  هتلاقوا هنا ألعاب للولاد والبنات والشباب وحاجات تانية مختلفة</p>
      </header>
      <main className="bg-violet-200 pt-5">
            <ul className="flex bg-purple-100  w-fit mx-auto font-medium p-1 rounded-md">
              <li
                className={`border-l px-2 duration-300 cursor-pointer rounded-md ${selectedCategory === 'all' ? 'bg-purple-700 text-white' : 'hover:bg-purple-500 hover:text-white'}`}
                onClick={() => {getAllProducts(); setSelectedCategory("all")}}
                >الكل
              </li>
              <li
                className={`border-l px-2 duration-300 cursor-pointer rounded-md ${selectedCategory === 'boys_toys' ? 'bg-purple-700 text-white' : 'hover:bg-purple-500 hover:text-white'}`}
                onClick={() => {getBoysToys(); setSelectedCategory("boys_toys")}}
                >
                  ألعاب الأولاد
              </li>
              <li
                className={`border-l px-2 duration-300 cursor-pointer rounded-md ${selectedCategory === 'girls_toys' ? 'bg-purple-700 text-white' : 'hover:bg-purple-500 hover:text-white'}`}
                onClick={() => {getGirlsToys(); setSelectedCategory("girls_toys")}}
                >ألعاب البنات
              </li>
              <li
                className={`px-2 duration-300 cursor-pointer rounded-md ${selectedCategory === 'adults_toys' ? 'bg-purple-700 text-white' : 'hover:bg-purple-500 hover:text-white'}`}
                onClick={() => {getAdultsToys(); setSelectedCategory("adults_toys")}}
                >ألعاب الشباب
              </li>
            </ul>
        <div className="container mx-auto p-4 pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
            
            {
              products && products.map((product, indx) => (
                <div key={indx} className="relative flex flex-col justify-center bg-violet-500 text-white rounded-2xl p-1">
                    {!product.stock && (
                      <p className="absolute top-2 left-2 bg-slate-400 rounded-full px-2 font-medium text-red-">نفذت الكمية</p>
                    )}
                    <div className="bg-white h-full rounded-2xl flex items-center justify-center">
                      <img src={`/${product.img_url}`} alt="Not Found" className="rounded-2xl" />
                    </div>
                    <div>
                      <div className="px-2 p-1 h-[150px]">
                        <strong>{product.name}</strong>
                        <strong className="mt-1">السعر: <span className="text-slate-200">{product.price}ج</span></strong>
                        <strong className="mt-1">الكمية: <span className="text-slate-200">{product.stock}</span></strong>
                      </div>
                    <div>
                      <a href={product.amz_url} target="_blank" className="bg-white text-black duration-300 hover:bg-slate-200 rounded-xl font-semibold block p-1 mt-2 text-center" rel="noreferrer">اضغط لرؤية الشرح وصور توضيحية</a>
                      <a href={`https://wa.me/+201060203632?text=عاوز أستفسر عن ${product.whatsapp_text}`} target="_blank" rel="noreferrer" className="bg-green-400 duration-300 hover:bg-green-500 font-semibold flex items-center justify-around rounded-xl py-1 mt-2">طلب أو استفسار
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z" fill="#BFC8D0" fill-rule="evenodd" clip-rule="evenodd"></path><path d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" fill="url(#paint0_linear_87_7264)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z" fill="white"></path><path d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z" fill="white"></path><defs><linearGradient id="paint0_linear_87_7264" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse"><stop stop-color="#5BD066"></stop><stop offset="1" stop-color="#27B43E"></stop></linearGradient></defs></svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            }
        </div>
        <div className="flex pt-10 pb-2 w-fit mx-auto">
          انضم إلينا على منصات جروباتنا على منصات الشويال ميديا لمتابعة أحدث وأميز الألعاب
          <ul className="flex ms-2">
            {/* <li>
              <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                  <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                </svg>
              </a>
            </li> */}
            <li>
              <a href="https://chat.whatsapp.com/BiIRqM4eYOUJS6Z68RU1YV">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                  <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </li>
            {/* <li>
              <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                  <path fill="#29b6f6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#fff" d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"></path><path fill="#b0bec5" d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"></path><path fill="#cfd8dc" d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"></path>
                </svg>
              </a>
            </li> */}
          </ul>
        </div>

        <p className="text-center pb-2">تم تصميمه وبرمجته بواسطة <a href="https://osamaeid1.github.io/Portfolio/" className="text-red-500 underline">أسامة</a></p>
      </main>
    </>
  );
}

export default App;
