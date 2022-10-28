// import Head from "next/head";
// // import { useRouter } from "next/router";
// import Header from "../../components/header";
// import Container from "@material-ui/core/Container";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import Hidden from "@material-ui/core/Hidden";
// import { useState } from "react";



// function Product({ post, categories }) {
//   const [image, setImage] = useState(post.product_image[0]);
//   //   const router = useRouter();

//   //   if (router.isFallback) {
//   //     return <div>Loading...</div>;
//   //   }

//   return (
//     <>
//       <Head>
//         <title>{post.title}</title>
//       </Head>
//       <Header data={categories} />
//       <Container maxWidth="md">
//         <Grid container spacing={0}>
//           <Hidden only={["xs", "sm"]}>
//             <Grid item sm={1}>
//               <Paper className={classes.paperImagePreview} elevation={0}>
//                 {post.product_image.map((c) => (
//                   <div
//                     key={c.id}
//                     onClick={() => {
//                       setImage(c);
//                     }}
//                   >
//                     <Paper className={classes.paperImage} elevation={0}>
//                       <img
//                         src={c.image}
//                         alt={c.alt_text}
//                         className={classes.img}
//                       />
//                     </Paper>
//                   </div>
//                 ))}
//               </Paper>
//             </Grid>
//           </Hidden>
//           <Grid item xs={12} sm={6}>
//             <Paper className={classes.paperImage} elevation={0}>
//               <img
//                 src={image.image}
//                 alt={image.alt_text}
//                 className={classes.img}
//               />
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={5}>
//             <Paper className={classes.paperRight} elevation={0}>
//               <Box component="h1" fontSize={18} fontWeight="400">
//                 {post.title}
//               </Box>
//               <Box component="p" fontSize={22} fontWeight="900" m={0}>
//                 {post.regular_price} DA
//               </Box>
//               <Box component="p" m={0} fontSize={14}>
//                 Free Delivery & Returns
//               </Box>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// }

// export async function getServerSideProps({ params }) {
//   const res = await fetch(`http://127.0.0.1:8000/api/${params.slug}`);
//   const post = await res.json();

//   const ress = await fetch("http://127.0.0.1:8000/api/category/");
//   const categories = await ress.json();

//   return {
//     props: {
//       post,
//       categories,
//     },
//   };
// }

// export default Product;
