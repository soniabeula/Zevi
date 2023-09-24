import styles from "./Hero.module.scss";
import heroImg from "../../assets/heroImage.jpeg";
import logo from "../../assets/logo.png";
import { TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import SuggestionBox from "./SuggestionBox";

const useStyles: any = makeStyles((theme: any) => ({
  input: {
    "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
      height: "100%",
      border: "none",
    },
    "&:hover": {
      backgroundcolor: "#000",
    },
  },
}));

const Hero = () => {
  const [searchString, setSearchString] = useState<String>("");

  const classes = useStyles();
  return (
    <>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="logo" />
        <img className={styles.image} src={heroImg} alt="hero" />
        <div className={styles.searchcontainer}>
          <TextField
            className={`${styles.textField} ${classes.input}`}
            placeholder="Search"
            value={searchString}
            onChange={(e: any) => setSearchString(e.target.value)}
            InputProps={{
              type: "search",
              endAdornment: <SearchIcon color="action" />,
            }}
          />
        </div>
        <div className={styles.CardContainer}>
          {searchString && <SuggestionBox />}
        </div>
      </div>
    </>
  );
};

export default Hero;
