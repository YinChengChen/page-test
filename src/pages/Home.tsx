import { Box, TextField, Grid } from "@mui/material";
import TitleImageList from "../components/ImageList/TitleImageList";
// import AwesomeInput from '../components/AwesomeInput/AwesomeInput';
import CardInfo from "../components/CardInfo/CardInfo";
import CardEvents from "../components/CardInfo/CardEvents";
// import NavBar from '../components/NavBar/NavBar';
import CardCalander from "../components/CardInfo/CardCalander";
import CardIndex from "../components/CardInfo/CardIndex";
export default function Home() {
  return (
    <Box sx={{ mx: 'auto', pt: 12, px: 2, maxWidth: 'xl' }} height="100vh">
          <CardInfo />
          <CardCalander />
          <CardEvents />
          <CardIndex />
    </Box>
  );
}
