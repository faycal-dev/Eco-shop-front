import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import Header from "../components/header";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    color: "red",
  },
}));

export default function Home({ posts }) {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.cardGrid}>
        {posts.map((post) => (
          <Link key={post.id} href={`product/${encodeURIComponent(post.slug)}`}>
            <Grid item xs={6} sm={4} md={3}>
              <Card>
                <CardMedia></CardMedia>
                <CardContent>
                  <Typography gutterBottom component="p">
                    {post.title}
                  </Typography>
                  <Box component="p" fontSize={16} fontWeight={900}>
                    {post.regular_price} DA
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Link>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://127.0.0.1:8000/api/");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}
