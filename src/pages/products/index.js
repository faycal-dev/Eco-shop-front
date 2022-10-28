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

export default function Index({ products }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([]);
  const [productsData, setProductsData] = useState(products);
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

  //   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //   const loading = useSelector((state) => state.auth.loading);

  const onSetSidebarOpen = (open) => {
    setSidebarOpen(open);
  };

  function getWindowSize() {
    const media = window.matchMedia(`(min-width: 900px)`);
    return media;
  }

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
        setProductsData(posts);
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

  const SearchProducts = () => {
    console.log(searchText);
  };

  // in case you want to secure the shop page by giving access to only authenticated users
  //   if (typeof window !== "undefined" && !loading && !isAuthenticated) {
  //     router.push("auth/login");
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
              <h6 style={{color:colors.dark, fontSize:"1rem", fontWeight:400}}>Found {data.length} products</h6>
              <Input
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
                <Col xs="12" sm="6" md="6" lg="4" xl="3" className="my-3">
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
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
    //   {/* <Header data={categories} />
    //   <main>
    //     <Container className={classes.cardGrid} maxWidth="lg">
    //       <Grid container spacing={2}>
    //         {posts.map((post) => (
    //           <Link
    //             key={post.id}
    //             href={`product/${encodeURIComponent(post.slug)}`}
    //           >
    //             <Grid item xs={6} sm={4} md={3}>
    //               <Card className={classes.card} elevation={0}>
    //                 <CardMedia
    //                   className={classes.cardMedia}
    //                   image={post.product_image[0].image}
    //                   title="Image title"
    //                   alt={post.product_image[0].alt_text}
    //                 />
    //                 <CardContent>
    //                   <Typography gutterBottom component="p">
    //                     {post.title}
    //                   </Typography>
    //                   <Box component="p" fontSize={16} fontWeight={900}>
    //                     {post.regular_price} DA
    //                   </Box>
    //                 </CardContent>
    //               </Card>
    //             </Grid>
    //           </Link>
    //         ))}
    //       </Grid>
    //     </Container>
    //   </main> */}
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${API_URL}/api/`);
    const products = await response.json();
    return {
      props: {
        products,
      },
    };
  } catch (error) {
    const products = [];
    return {
      props: {
        products,
      },
    };
  }
}