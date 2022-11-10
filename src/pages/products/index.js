import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Layout from "../../hocs/Layout";
import Sidebar from "react-sidebar";
import ShopSideBar from "../../components/shopSidebar/ShopSideBar";
import colors from "../../constants/colors";
import ProductCard from "../../components/product/ProductCard";
import { Col, Row } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import SweetAlert from "react-bootstrap-sweetalert";
import { API_URL } from "../../config";
import { Input } from "../../components/input/Input";
import CustomPagination from "../../components/pagination/pagination";

export default function Index({ products, pagination }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [productsData, setProductsData] = useState(products);
  const [page, setPage] = useState(pagination);
  const [ratingStars, setRatingStars] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [brands, setBrands] = useState([]);
  const [data, setData] = useState(products);
  const [mql, setMql] = useState({ matches: true });
  const [alert, setAlert] = useState({
    title: "",
    body: "",
    show: false,
    success: false,
  });
  const [isLoading, setIsLoading] = useState({
    state: false,
    id: null,
    button: null,
  });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //   const loading = useSelector((state) => state.auth.loading);

  const onSetSidebarOpen = (open) => {
    setSidebarOpen(open);
  };

  function getWindowSize() {
    const media = window.matchMedia(`(min-width: 900px)`);
    return media;
  }

  const getWishlist = async () => {
    try {
      const res = await fetch("api/shop/wishlist", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const data = await res.json();

      setWishlist(data.wishlist);
    } catch (error) {}
  };

  useEffect(() => {
    if (isAuthenticated) {
      getWishlist();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setMql(getWindowSize());

    function handleWindowResize() {
      setMql(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const checkRange = (product) => {
    return (
      product.regular_price >= priceRange[0] &&
      product.regular_price <= priceRange[1]
    );
  };

  const chackRating = (product) => {
    return product.rating >= ratingStars;
  };

  const checkBrands = (product) => {
    const include = false;
    for (let index = 0; index < brands.length; index++) {
      include = include || product.brand == brands[index];
    }

    return include;
  };

  //   for the filters
  useEffect(() => {
    let filtredData = productsData;
    if (priceRange.length === 2) {
      filtredData = filtredData.filter(checkRange);
    }
    if (ratingStars > 0) {
      filtredData = filtredData.filter(chackRating);
    }
    if (brands.length > 0) {
      filtredData = filtredData.filter(checkBrands);
    }

    setData(filtredData);
  }, [productsData, priceRange, brands, ratingStars]);

  const handleRangeChannge = (range) => {
    setPriceRange(range);
  };

  const handleCategoryChange = async (cat) => {
    const slug = cat.target.value;
    try {
      const res = await fetch(`${API_URL}/api/category/${slug}`);
      const posts = await res.json();
      if (res.status === 200) {
        setProductsData(posts.results);
        const paginationData = {
          current: 1,
          previous: posts.previous,
          next: posts.next,
          last: posts.count,
        };
        setPage(paginationData);
      } else {
        setAlert({
          title: "Category filter failed",
          body: posts.detail,
          show: true,
          success: false,
        });
      }
    } catch (error) {
      setAlert({
        title: "Category filter failed",
        body: error.message,
        show: true,
        success: false,
      });
    }
  };

  const handleRatingChange = (rating) => {
    setRatingStars(rating);
  };

  const handleBrandChange = (e) => {
    let ChangedBrand = [...brands];

    if (e.target.checked) {
      ChangedBrand.push(e.target.value);
    } else {
      const index = ChangedBrand.indexOf(e.target.value);
      ChangedBrand.splice(index, 1);
    }

    setBrands(ChangedBrand);
  };

  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const SearchProducts = async () => {
    try {
      setIsLoading({ state: true, id: null, button: "search" });
      const res = await fetch(`${API_URL}/api?search=${searchText}`);
      const posts = await res.json();
      if (res.status === 200) {
        setProductsData(posts.results);
        const paginationData = {
          current: 1,
          previous: posts.previous,
          next: posts.next,
          last: posts.count,
        };
        setPage(paginationData);
      } else {
        setAlert({
          title: "Search failed",
          body: posts.detail,
          show: true,
          success: false,
        });
      }
      setIsLoading({ state: false, id: null, button: null });
    } catch (error) {
      setIsLoading({ state: false, id: null, button: null });

      setAlert({
        title: "Search failed",
        body: error.message,
        show: true,
        success: false,
      });
    }
  };

  const handleGoPageNumber = async (to) => {
    try {
      const res = null;
      const paginationData = {};
      switch (to) {
        case "first":
          res = await fetch(`${API_URL}/api?page=1`);
          paginationData = {
            current: 1,
          };
          break;
        case "next":
          res = await fetch(`${page.next}`);
          paginationData = {
            current: page.current + 1,
          };
          break;
        case "previous":
          res = await fetch(`${page.previous}`);
          paginationData = {
            current: page.current - 1,
          };
          break;
        case "last":
          res = await fetch(`${page.next}`);
          paginationData = {
            current: page.current + 1,
          };
          break;

        default:
          break;
      }

      const posts = await res.json();
      paginationData = {
        ...paginationData,
        previous: posts.previous,
        next: posts.next,
        last: posts.count,
      };
      if (res.status === 200) {
        setProductsData(posts.results);
        setPage(paginationData);
      } else {
        setAlert({
          title: "Pagination failed",
          body: posts.detail,
          show: true,
          success: false,
        });
      }
    } catch (error) {
      setAlert({
        title: "Pagination failed",
        body: error.message,
        show: true,
        success: false,
      });
    }
  };

  const handleAddWishlist = async (id) => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      try {
        setIsLoading({ state: true, id: id, button: "wish" });

        const body = JSON.stringify({ id: id });
        const res = await fetch("api/shop/toggle_product_to_wishlist", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: body,
        });
        const data = await res.json();
        setIsLoading({ state: false, id: null, button: null });
        getWishlist();
        setAlert({
          title: "Success",
          body: data.success,
          show: true,
          success: true,
        });
      } catch (error) {
        setIsLoading({ state: false, id: null, button: null });
        setAlert({
          title: "Failed to modify the wishlist",
          body: error,
          show: true,
          success: false,
        });
      }
    }
  };

  const handleAddToCart = async (id) => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      try {
        setIsLoading({ state: true, id: id, button: "cart" });
        const body = JSON.stringify({ id: id });
        const res = await fetch("api/shop/add_to_cart", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: body,
        });
        const data = await res.json();
        setIsLoading({ state: false, id: null, button: null });

        setAlert({
          title: "Success",
          body: data.success,
          show: true,
          success: true,
        });
      } catch (error) {
        setIsLoading({ state: false, id: null, button: null });

        setAlert({
          title: "Failed to modify the cart",
          body: "",
          show: true,
          success: false,
        });
      }
    }
  };

  // in case you want to secure the shop page by giving access to only authenticated users
  //   if (typeof window !== "undefined" && !loading && !isAuthenticated) {
  //     router.push("/auth/login");
  //   }

  return (
    <Layout title="Shop" content="List of all the products">
      <Sidebar
        sidebar={
          <ShopSideBar
            onRangeChange={handleRangeChannge}
            onCategoryChange={handleCategoryChange}
            onRatingStarsChange={handleRatingChange}
            onBrandChange={handleBrandChange}
          />
        }
        docked={mql.matches}
        open={sidebarOpen}
        touch={true}
        styles={{
          sidebar: {
            left: 10,
            overflow: "visible",
            border: "none",
            backgroundColor: colors.white,
            borderRadius: 5,
            width: "20%",
          },
          content: { marginLeft: 20 },
          root: { top: 80 },
          overlay: { backgroundColor: colors.white },
        }}
        contentId="content"
      >
        <PerfectScrollbar
          options={{
            wheelPropagation: false,
          }}
        >
          <div id="content">
            <Row className="mx-4 my-3">
              <h6
                style={{
                  color: colors.dark,
                  fontSize: "1rem",
                  fontWeight: 400,
                }}
              >
                Found {data.length} products
              </h6>
              <Input
                isLoading={
                  isLoading.button === "search" && isLoading.state === true
                }
                type="text"
                name="Search"
                placeholder="Search"
                onChange={onSearchTextChange}
                value={searchText}
                onButtonClick={SearchProducts}
              />
            </Row>
            <Row className="mx-3 my-3">
              {data.map((product) => (
                <Col key={product.id} xs="12" sm="6" md="6" lg="4" xl="3" className="my-3">
                  <ProductCard
                    product={product}
                    addWishlist={() => handleAddWishlist(product.id)}
                    viewInCart={() => handleAddToCart(product.id)}
                    isInWishList={wishlist?.some((el) => el.id === product.id)}
                    remouveTag={false}
                    isWishlistLoading={
                      isLoading.id === product.id &&
                      isLoading.button === "wish" &&
                      isLoading.state === true
                    }
                    isCartLoading={
                      isLoading.id === product.id &&
                      isLoading.button === "cart" &&
                      isLoading.state === true
                    }
                  />
                </Col>
              ))}
            </Row>
            <CustomPagination
              goPageNumber={handleGoPageNumber}
              currentPage={page.current}
              next={page.next}
            />
          </div>
        </PerfectScrollbar>
      </Sidebar>
      <SweetAlert
        error={!alert.success}
        success={alert.success}
        title={alert.title}
        show={alert.show}
        onConfirm={() => {
          setAlert({
            ...alert,
            show: false,
            title: "",
            body: "",
          });
        }}
        confirmBtnStyle={{ backgroundColor: colors.primary2, width: "40%" }}
      >
        <p className="sweet-alert-text">{alert.body}</p>
      </SweetAlert>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${API_URL}/api/`);
    const res = await response.json();
    const pagination = {
      current: 1,
      previous: res.previous,
      next: res.next,
      last: res.count,
    };
    const products = res.results;
    return {
      props: {
        products,
        pagination,
      },
    };
  } catch (error) {
    const products = [];
    const pagination = {
      current: 1,
      previous: null,
      next: "",
      last: 1,
    };
    return {
      props: {
        products,
        pagination,
      },
    };
  }
}
