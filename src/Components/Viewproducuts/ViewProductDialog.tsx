import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Dialog,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
  Radio,
  RadioGroup,
} from "@mui/material";
import styles from "../main/Modal.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../assets/logo.png";
import { makeStyles } from "@mui/styles";
import Card from "./card";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "@mui/material/Rating";
import { data } from "../../data/productData";
import { useState, useEffect } from "react";
import noData from "../../assets/nodata.png";

export type ViewProductDialogType = {
  openDialog: boolean;
  setOpenDialog: (val: any) => void;
};

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

const ViewProductDialog = ({
  openDialog,
  setOpenDialog,
}: ViewProductDialogType) => {
  const classes = useStyles();
  const [searchString, setSearchString] = useState("");
  const [filteredData, setFilteredData] = useState<any>();
  const [brands, setBrands] = useState<any>([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brandSelectedData, setBrandSelectedData] = useState<any>();
  const [brandsSelected, setBrandsSelected] = useState<Array<string>>([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [priceselected, setPriceSelected] = useState<Array<string>>([]);
  const [priceSelectedData, setPriceSelectedData] = useState<any>();
  const [selectedRating, setSelectedRating] = useState("");
  const [ratingSelected, setRatingSelected] = useState<Array<string>>([]);
  const rating = ["5", "4", "3", "2", "1"];

  useEffect(() => {
    setFilteredData(data);
    const brand = data?.map((item: any) => item.brand);
    const uniqueBrands = Array.from(new Set(brand));
    setBrands(uniqueBrands);
  }, [data]);

  useEffect(() => {
    setBrandSelectedData(data);
    setPriceSelectedData(data);
  }, [data]);

  useEffect(() => {
    const searchedData = data?.filter((item: any) =>
      item.name.toLowerCase().includes(searchString)
    );
    setFilteredData(searchedData);
  }, [searchString]);

  useEffect(() => {
    if (brandsSelected.length === 0) {
      setFilteredData(data);
      setBrandSelectedData(data);
    } else {
      const filteredBrand = data?.filter((item: any) =>
        brandsSelected.includes(item.brand)
      );

      setFilteredData(filteredBrand);
      setBrandSelectedData(filteredBrand);
    }
  }, [selectedBrand, brandsSelected]);

  useEffect(() => {
    if (
      priceselected.includes("Under 500") &&
      priceselected.includes("Above 500")
    ) {
      // If both options are selected, show all data
      setFilteredData(brandSelectedData);
      setPriceSelectedData(brandSelectedData);
    } else if (priceselected.length === 0) {
      // If no prices are selected, show all data
      setFilteredData(brandSelectedData);
      setPriceSelectedData(brandSelectedData);
    } else {
      const filteredPrices = brandSelectedData?.filter((item: any) => {
        if (priceselected.includes("Under 500")) {
          return item.price <= 500;
        } else if (priceselected.includes("Above 500")) {
          return item.price > 500;
        }
        return false;
      });

      setFilteredData(filteredPrices);
      setPriceSelectedData(filteredPrices);
    }
  }, [priceselected, brandSelectedData]);

  useEffect(() => {
    if (ratingSelected.length === 0) {
      setFilteredData(data);
    } else {
      const filteredBrand = priceSelectedData?.filter((item: any) =>
        ratingSelected.includes(String(item.rating))
      );

      setFilteredData(filteredBrand);
    }
  }, [ratingSelected, selectedRating]);

  const handlePriceChange = (e: any) => {
    const value = e.target.value;
    setSelectedPrice(value);
    if (e.target.checked) {
      setPriceSelected([...priceselected, value]);
    } else {
      setPriceSelected(priceselected.filter((item: any) => item !== value));
    }
  };
  const handleRatingChange = (e: any) => {
    const value = e.target.value;
    setSelectedRating(value);
    if (e.target.checked) {
      setRatingSelected([...ratingSelected, value]);
    } else {
      setRatingSelected(ratingSelected.filter((item: any) => item !== value));
    }
  };
  const handleBrandChange = (e: any) => {
    const value = e.target.value;
    setSelectedBrand(value);
    if (e.target.checked) {
      setBrandsSelected([...brandsSelected, value]);
    } else {
      setBrandsSelected(brandsSelected.filter((item: any) => item !== value));
    }
  };

  return (
    <Dialog fullScreen open={openDialog} onClose={() => setOpenDialog(false)}>
      <div className={styles.dialogContainer}>
        <div className={styles.modalHeader}>
          <img height={30} width={70} src={logo} alt="logo" />
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              setOpenDialog(false);
            }}
            aria-label="close"
            className={styles.closeIcon}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className={styles.search}>
          {" "}
          <div className={styles.searchcontainer}>
            <TextField
              className={`${styles.textField} ${classes.input}`}
              placeholder="Search"
              onChange={(e) => setSearchString(e.target.value)}
              InputProps={{
                type: "search",
                endAdornment: <SearchIcon color="action" />,
              }}
            />
          </div>
        </div>

        <div className={styles.modalRootContainer}>
          <div className={styles.gridContainer}>
            <Grid container spacing={2} columns={12}>
              <Grid item xs={12} md={3} className={styles.gridContainer1}>
                <p className={styles.gridContainer1Header}>Search Results</p>
                <Accordion className={styles.accordian}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Brand</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={styles.accordianDetails}>
                    <FormGroup>
                      {brands?.map((item: any) => (
                        <FormControlLabel
                          key={item}
                          value={item}
                          control={
                            <Checkbox
                              onChange={handleBrandChange}
                              value={item}
                            />
                          }
                          label={item}
                          style={{ margin: 0, height: 35 }}
                        />
                      ))}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
                <Accordion className={styles.accordian}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Price Range</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={styles.accordianDetails}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handlePriceChange}
                            value={"Under 500"}
                          />
                        }
                        label="Under 500"
                        style={{ margin: 0, height: 35 }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handlePriceChange}
                            value={"Above 500"}
                          />
                        }
                        label="Above 500"
                        style={{ margin: 0, height: 35 }}
                      />
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
                <Accordion className={styles.accordian}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Rating</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={styles.accordianDetails}>
                    <FormGroup>
                      {rating?.map((item: any) => {
                        return (
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={handleRatingChange}
                                value={item}
                              />
                            }
                            style={{ margin: 0, height: 35 }}
                            label={
                              <Rating
                                readOnly
                                name="simple-controlled"
                                value={item}
                              />
                            }
                          />
                        );
                      })}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              </Grid>

              {filteredData?.length > 0 ? (
                <Grid item xs={12} md={9} className={styles.gridContainer2}>
                  <div className={styles.cardsContainer}>
                    {filteredData?.map((item: any) => {
                      return (
                        <Card
                          img={item.image}
                          name={item.name}
                          brand={item.brand}
                          rating={item.rating}
                          price={item.price}
                          discount={item.discount}
                          isFavorite={item.isFavorite}
                          people={item.people}
                        />
                      );
                    })}
                  </div>
                </Grid>
              ) : (
                <Grid item xs={12} md={9} className={styles.gridContainer2}>
                  <img
                    className={styles.noData}
                    src={noData}
                    alt={"No data"}
                  ></img>
                </Grid>
              )}
            </Grid>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ViewProductDialog;
