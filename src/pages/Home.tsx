import { Box, TextField, Grid } from "@mui/material";
import TitleImageList from "../components/ImageList/TitleImageList";
// import AwesomeInput from '../components/AwesomeInput/AwesomeInput';
import CardInfo from "../components/CardInfo/CardInfo";
import CardEvents from "../components/CardInfo/CardEvents";
// import NavBar from '../components/NavBar/NavBar';
import CardCalander from "../components/CardInfo/CardCalander";
import CardIndex from "../components/CardInfo/CardIndex";
import CardIondelay from "../components/CardInfo/CardIondelay";
import CardPredict from "../components/CardInfo/CardPredict";
export default function Home() {
  return (
    <Box sx={{ mx: 3, pt: 12 }} height="100vh">
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} xl={6}>
          <CardInfo />
          <CardCalander />
          <CardIondelay />
        </Grid>
        <Grid item xs={12} md={12} xl={6}>
          <CardPredict/>
          <CardEvents />
          <CardIndex />
        </Grid>
      </Grid>
    </Box>
  );
}
