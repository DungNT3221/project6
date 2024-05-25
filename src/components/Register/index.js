import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
  Snackbar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Thêm trạng thái thông báo thành công
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra xem tất cả các trường có được điền đầy đủ hay không
    if (!user_name || !password || !location || !description || !occupation) {
      setError("Vui lòng nhập đầy đủ tất cả các trường thông tin");
      return;
    }

    try {
      const response = await axios.post(
        "https://7kwsvx-8000.csb.app/api/user/register",
        {
          user_name,
          password,
          location,
          description,
          occupation,
        },
      );
      setSuccess("Đăng ký thành công!"); // Thiết lập thông báo thành công
      setTimeout(() => {
        navigate("/login"); // Điều hướng sau 3 giây
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("Tài khoản đã tồn tại, vui lòng chọn tên tài khoản khác.");
      } else if (error.response) {
        setError(
          `Đăng ký thất bại: ${error.response.data.message || error.response.statusText}`,
        );
      } else {
        setError("Đăng ký thất bại: Đã xảy ra lỗi, vui lòng thử lại sau");
      }
      console.error("Registration failed:", error);
    }
  };

  const handleClose = () => {
    setError(null);
    setSuccess(null); // Đóng thông báo thành công
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="user_name"
            label="Username"
            name="user_name"
            autoComplete="username"
            autoFocus
            value={user_name}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="location"
            label="Location"
            name="location"
            autoComplete="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="occupation"
            label="Occupation"
            name="occupation"
            autoComplete="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng ký ngay
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Có tài khoản rồi sao? Đăng nhập ngay"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
}
