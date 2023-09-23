import styles from "./Hero.module.scss";
import heroImg from "../../assets/heroImage.jpeg";
import logo from "../../assets/logo.png";
import { TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import SuggestionBox from "./SuggestionBox";

const theme = createTheme();
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
  const [isInputFocused, setInputFocused] = useState(false);

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
            InputProps={{
              type: "search",
              endAdornment: <SearchIcon color="action" />,
              onFocus: () => {
                setInputFocused(true);
              },
              onBlur: () => {
                setTimeout(() => {
                  setInputFocused(false);
                }, 100);
              },
            }}
          />
        </div>
        <div className={styles.CardContainer}>
          {/* {isInputFocused && ( */}
            <SuggestionBox setInputFocused={setInputFocused} />
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default Hero;
