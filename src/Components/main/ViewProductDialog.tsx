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
} from "@mui/material";
import styles from "./Modal.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../assets/logo.png";
import { makeStyles } from "@mui/styles";
import Card from "./card";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "@mui/material/Rating";

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
  return (
    <Dialog fullScreen open={openDialog} onClose={() => setOpenDialog(false)}>
      <div className={styles.dialogContainer}>
        <div className={styles.modalHeader}>
          <img height={30} width={70} src={logo} alt="logo" />
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpenDialog(false)}
            aria-label="close"
            className={styles.closeIcon}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className={styles.search}> <div className={styles.searchcontainer}>
          <TextField
            className={`${styles.textField} ${classes.input}`}
            placeholder="Search"
            InputProps={{
              type: "search",
              endAdornment: <SearchIcon color="action" />,
              //   onFocus: () => {
              //     setInputFocused(true);
              //   },
              //   onBlur: () => {
              //     setTimeout(() => {
              //       setInputFocused(false);
              //     }, 100);
              //   },
            }}
          />
        </div></div>
       
        <div className={styles.modalRootContainer}>
          <div className={styles.gridContainer}>
            <Grid container spacing={2} columns={12}>
              <Grid item xs={12} lg={3}   className={styles.gridContainer1}>
                <p className={styles.gridContainer1Header}>Search Results</p>
                <Accordion className={styles.accordian}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Brand</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox  />}
                        label="Wrogn"
                      />
                      <FormControlLabel
                        control={<Checkbox  />}
                        label="Adidas"
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
                    <Typography>Price Range</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox  />}
                        label="Under 500"
                      />
                      <FormControlLabel
                        control={<Checkbox  />}
                        label="Above 500"
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
                    <Typography>Brand</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox  />}
                        label={<Rating readOnly name="simple-controlled" value={5} />}
                      />
                      <FormControlLabel
                        control={<Checkbox  />}
                        label={<Rating readOnly name="simple-controlled" value={4} />}
                      />
                      <FormControlLabel
                        control={<Checkbox  />}
                        label={<Rating readOnly name="simple-controlled" value={3} />}
                      />
                      <FormControlLabel
                        control={<Checkbox  />}
                        label={<Rating readOnly name="simple-controlled" value={2} />}
                      />
                      <FormControlLabel
                        control={<Checkbox  />}
                        label={<Rating readOnly name="simple-controlled" value={1} />}
                      />
                      
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12} lg={9} className={styles.gridContainer2}>
                <Card />
                <Card />
                <Card />
                <Card /> <Card />
                <Card />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ViewProductDialog;
