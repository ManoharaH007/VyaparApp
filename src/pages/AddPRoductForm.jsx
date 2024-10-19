import React, { useState, useRef, useEffect } from "react";
import {
  InputAdornment,
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { CreateProduct, clearError } from "../redux/action_api/productAction";
import { useSelector, useDispatch } from "react-redux";
import { CREATE_PRODUCT_RESET } from "../redux/constant/productConstant";
import Swal from "sweetalert2";

const AddProductForm = ({ CloseHides }) => {
  const dispatch = useDispatch();
  const { loading, error, product, isSucsess } = useSelector(
    (state) => state.products
  );

  const [measureValue, setMeasureValue] = useState("");
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [gst, setGst] = useState("");
  const [cess, setCess] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [video, setvideo] = useState(null);
  const [recollectedEmptyProduct, setRecollectedEmptyProduct] = useState(false);
  const [addProductToExistingCustomer, setAddProductToExistingCustomer] =
    useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [VideoPreviewUrl, setVideoPreviewUrl] = useState(null);

  const fileInputRef = useRef(null);
  const measureUnits = [
    "Numbers(NOS)",
    "Pieces(pcs)",
    "Kilogram(kg)",
    "Gram(gm)",
    "Liter(LTR)",
    "Millimeter(ML)",
    "Feet(ft)",
    "Packs(pcs)",
  ];
  useEffect(() => {
    if (product) {
      Swal.fire({
        title: `${product}`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      // Clear the local storage after a successful addition
      // localStorage.removeItem("productData");
      // onToggle(true);
      CloseHides();
    }

    if (isSucsess) {
      dispatch({ type: CREATE_PRODUCT_RESET });

      CloseHides();
    }

    if (error) {
      Swal.fire({
        title: "Something went wrong!",
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(clearError());
    }

    return () => {
      dispatch({ type: CREATE_PRODUCT_RESET });
    };
  }, [product, error, dispatch]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleValueSelect = (value) => {
    setMeasureValue(value);
    setOpen(false);
  };

  const handleRecollectedChange = (event) => {
    setRecollectedEmptyProduct(event.target.checked);
  };

  const handleAddProductChange = (event) => {
    setAddProductToExistingCustomer(event.target.checked);
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
    console.log("click");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleVideo = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file && file.type.startsWith("video/")) {
      setvideo(file);
      setVideoPreviewUrl(URL.createObjectURL(file)); // Create a URL for the video
    } else {
      alert("Please select a valid video file.");
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.set("p_name", name);
    formData.set("p_price", price);
    formData.set("p_discount_price", amount);
    formData.set("gst", gst);
    formData.set("cess", cess);
    formData.set("add_product", addProductToExistingCustomer);
    formData.set("recollected_empty", recollectedEmptyProduct);
    formData.set("p_description", description);
    formData.set("unit", measureValue);
    if (image) {
      formData.append("image", image);
    }

    dispatch(CreateProduct(formData));

    // // Save the product data in local storage
    // const productData = {
    //   p_name: name,
    //   p_price: price,
    //   p_discount_price: amount,
    //   gst: gst,
    //   cess: cess,
    //   add_product: addProductToExistingCustomer,
    //   recollected_empty: recollectedEmptyProduct,
    //   p_description: description,
    //   unit: measureValue,
    //   imagePreviewUrl: imagePreviewUrl,
    // };

    // localStorage.setItem("productData", JSON.stringify(productData));
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Header */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add Product
      </Typography>

      {/* Form Fields */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1">Item Name</Typography>
          <TextField
            fullWidth
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#00BFA6",
                  borderRadius: "8px",
                },
                "&:hover fieldset": {
                  borderColor: "#00BFA6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00BFA6",
                },
              },
              boxShadow: "5px 5px 5px #c3c3c3",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      border: "1px solid #00BFA6", // Border to create a box effect
                      borderRadius: "8px", // Matching border radius
                      bgcolor: "#00BFA6", // Background color of the box
                      transition: "background-color 0.3s", // Smooth transition for hover effect
                      "&:hover": {
                        bgcolor: "#369a8d", // Change background color on hover
                      },
                      p: "4px", // Padding for the box
                    }}
                  >
                    <IconButton
                      onClick={handleClick}
                      sx={{
                        fontSize: "14px",
                        color: "white",
                        bgcolor: "transparent", // Transparent background to see the box's hover effect
                        "&:hover": {
                          bgcolor: "transparent", // Keep transparent on hover
                        },
                      }}
                    >
                      {measureValue ? measureValue : "Select Unit"}
                    </IconButton>
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {open && (
          <Box
            sx={{
              backgroundColor: "#a4cda8",
              width: "150px",
              position: "absolute",
              zIndex: 1,
              borderRadius: "4px",
              top: "160px",
            }}
          >
            {measureUnits.map((elem, index) => (
              <p
                key={index}
                style={{
                  margin: 0,
                  padding: "5px 10px",
                  color: "black",
                  backgroundColor: "#a4cda8",
                  cursor: "pointer",
                  hover: {
                    backgroundColor: "#355a39",
                  },
                }}
                onClick={() => handleValueSelect(elem)}
              >
                {elem}
              </p>
            ))}
          </Box>
        )}

        <Grid item xs={12}>
          <Typography variant="body1">Sale Price</Typography>
          <TextField
            fullWidth
            placeholder="Sale Price (Rs)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#00BFA6",
                  borderRadius: "8px",
                },
                "&:hover fieldset": {
                  borderColor: "#00BFA6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00BFA6",
                },
              },
              boxShadow: "5px 5px 5px #c3c3c3",
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">Discount Amount(optional)</Typography>
          <TextField
            fullWidth
            placeholder="Discount Amount (Rs)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#00BFA6",
                  borderRadius: "8px",
                },
                "&:hover fieldset": {
                  borderColor: "#00BFA6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00BFA6",
                },
              },
              boxShadow: "5px 5px 5px #c3c3c3",
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="body1">Enter GST %(optional)</Typography>
          <TextField
            fullWidth
            placeholder="GST %"
            value={gst}
            onChange={(e) => setGst(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#00BFA6",
                  borderRadius: "8px",
                },
                "&:hover fieldset": {
                  borderColor: "#00BFA6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00BFA6",
                },
              },
              boxShadow: "5px 5px 5px #c3c3c3",
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="body1">Enter CESS %(optional)</Typography>
          <TextField
            fullWidth
            placeholder="CESS %"
            value={cess}
            onChange={(e) => setCess(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#00BFA6",
                  borderRadius: "8px",
                },
                "&:hover fieldset": {
                  borderColor: "#00BFA6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00BFA6",
                },
              },
              boxShadow: "5px 5px 5px #c3c3c3",
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">Product Description(optional)</Typography>
          <TextField
            fullWidth
            placeholder="Enter product description"
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#00BFA6",
                  borderRadius: "8px",
                },
                "&:hover fieldset": {
                  borderColor: "#00BFA6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00BFA6",
                },
              },
              boxShadow: "5px 5px 5px #c3c3c3",
            }}
          />
        </Grid>

        {/* Checkboxes */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={recollectedEmptyProduct}
                onChange={handleRecollectedChange}
              />
            }
            label="Have you recollected empty product? (This cannot be changed afterwards)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={addProductToExistingCustomer}
                onChange={handleAddProductChange}
              />
            }
            label="Add product to existing customers"
          />
        </Grid>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Product Media :
        </Typography>
        {/* Product Media Upload */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 3,
            width: "100%",
            maxWidth: 400,
            margin: "0 auto",
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Grid item xs={12}>
            <Grid container spacing={1} justifyContent="space-between">
              <Grid item xs={6}>
                <IconButton
                  onClick={handleIconClick}
                  sx={{
                    width: "80px",
                    height: "70px",
                    border: "1px solid #00BFA6",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column", // Stack the icon and text vertically
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#00BFA6",
                    boxShadow: "5px 5px 5px #c3c3c3",
                  }}
                >
                  <PhotoCameraIcon fontSize="large" />
                  <Typography
                    sx={{
                      fontSize: "10px",
                      marginTop: "4px",
                    }}
                  >
                    <input
                      onClick={handleIconClick}
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    upload Images
                  </Typography>
                </IconButton>
              </Grid>

              {/* <Grid item xs={6}>
                <IconButton
                  onClick={handleIconClick}
                  sx={{
                    width: "80px",
                    height: "70px",
                    border: "1px solid #00BFA6",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column", // Stack icon and text vertically
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#00BFA6",
                    boxShadow: "5px 5px 5px #c3c3c3",
                  }}
                >
                  <VideoLibraryIcon fontSize="large" />
                  <Typography sx={{ fontSize: "10px", marginTop: "4px" }}>
                    <input
                      onClick={handleIconClick}
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleVideo}
                      accept="video/*" // Allows both image and video uploads
                    />
                    add Video
                  </Typography>
                </IconButton>
              </Grid> */}
            </Grid>
          </Grid>
          <Typography sx={{ display: "block" }}>Or</Typography>
          {imagePreviewUrl && (
            <img
              src={imagePreviewUrl}
              alt="Preview"
              style={{
                // position: "absolute",
                width: "20%",
                height: "40%",
                objectFit: "cover",
              }}
            />
          )}

          {VideoPreviewUrl && (
            <div>
              <video
                src={VideoPreviewUrl}
                controls // Adds play/pause controls to the video
                style={{
                  width: "300px", // Set the desired width for the video preview
                  height: "auto",
                  marginTop: "20px",
                }}
              />
            </div>
          )}
        </Box>

        <Grid item xs={12}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ boxShadow: "5px 5px 5px #c3c3c3" }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddProductForm;
