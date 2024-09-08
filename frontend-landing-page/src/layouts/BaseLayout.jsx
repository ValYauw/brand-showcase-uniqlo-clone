import Navbar from "../components/Navbar";
import NotificationSnackbar from '../components/NotificationSnackbar';
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function BaseLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Container sx={{ py: 8, marginTop: '40px' }} maxWidth="lg">
          <Outlet />
          <NotificationSnackbar />
        </Container>
      </main>
    </>
  )
}