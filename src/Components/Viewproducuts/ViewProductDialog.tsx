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
  const [brandSelectedData, setBrandSelectedData] = useState<any>();
  const [priceSelectedData, setPriceSelectedData] = useState<any>();
  const [brands, setBrands] = useState<any>([]);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
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

  const handleCheckboxChange = (event: any) => {
    const itemName = event.target.value;
    setSelectedBrand(itemName);

    if (itemName === "All") {
      setFilteredData(data);
      setBrandSelectedData(data);
    } else {
      const filteredBrand = data?.filter(
        (item: any) => itemName === item.brand
      );
      setFilteredData(filteredBrand);
      setBrandSelectedData(filteredBrand);
    }
  };
  const handlePriceChange = (e: any) => {
    setSelectedPrice(e.target.value);
    if (e.target.value === "Under 500") {
      const filteredPrice = brandSelectedData?.filter((item: any) => {
        return item.price < 500;
      });
      setFilteredData(filteredPrice);
      setPriceSelectedData(filteredPrice);
    } else if (e.target.value === "Above 500") {
      const filteredPrice = brandSelectedData?.filter(
        (item: any) => item.price >= 500
      );
      setFilteredData(filteredPrice);
      setPriceSelectedData(filteredPrice);
    } else {
      setFilteredData(brandSelectedData);
      setPriceSelectedData(brandSelectedData);
    }
  };
  const handleRatingChange = (event: any) => {
    setSelectedRating(event.target.value);
    if (event.target.value === "All") {
      setFilteredData(priceSelectedData);
    } else {
      const filteredRating = priceSelectedData?.filter(
        (item: any) => event.target.value === String(item.rating)
      );
      setFilteredData(filteredRating);
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
              setSelectedBrand("All");
              setSelectedPrice("All");
              setSelectedRating("All");
              setFilteredData(data);
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
                      <RadioGroup
                        defaultValue={"All"}
                        value={selectedBrand}
                        onChange={handleCheckboxChange}
                      >
                        <FormControlLabel
                          key={"All"}
                          control={<Radio value={"All"} />}
                          label={"All"}
                          style={{ margin: 0, height: 35 }}
                        />
                        {brands?.map((item: any) => (
                          <FormControlLabel
                            key={item}
                            value={item}
                            control={<Radio value={item} />}
                            label={item}
                            style={{ margin: 0, height: 35 }}
                          />
                        ))}
                      </RadioGroup>
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
                      <RadioGroup
                        defaultValue={"All"}
                        value={selectedPrice}
                        onChange={handlePriceChange}
                      >
                        <FormControlLabel
                          control={<Radio value={"All"} />}
                          label="All"
                          style={{ margin: 0, height: 35 }}
                        />
                        <FormControlLabel
                          control={<Radio value={"Under 500"} />}
                          label="Under 500"
                          style={{ margin: 0, height: 35 }}
                        />
                        <FormControlLabel
                          control={<Radio value={"Above 500"} />}
                          label="Above 500"
                          style={{ margin: 0, height: 35 }}
                        />
                      </RadioGroup>
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
                      <RadioGroup
                        defaultValue={"All"}
                        value={selectedRating}
                        onChange={handleRatingChange}
                      >
                        <FormControlLabel
                          control={<Radio value={"All"} />}
                          label={"All"}
                          style={{ margin: 0, height: 35 }}
                        />
                        {rating?.map((item: any) => {
                          return (
                            <FormControlLabel
                              control={<Radio value={item} />}
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
                      </RadioGroup>
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
