import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    color: "red"
  }
}));

export default function Home() {
  const classes = useStyles();
  return <div className={classes.cardGrid}>HELLO</div>;
}
