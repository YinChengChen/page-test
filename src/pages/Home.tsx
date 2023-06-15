import { Box, TextField, Grid } from "@mui/material";
import TitleImageList from "../components/ImageList/TitleImageList";
// import AwesomeInput from '../components/AwesomeInput/AwesomeInput';
import CardInfo from "../components/CardInfo/CardInfo";
import CardEvents from "../components/CardInfo/CardEvents";
// import NavBar from '../components/NavBar/NavBar';

export default function Home() {
  return (
    <Box sx={{ mx: 3, pt: 12 }} height="100vh">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <CardInfo />
        </Grid>
        <Grid item xs={12} md={8}>
          <CardEvents />
        </Grid>
      </Grid>
    </Box>
  );
}
