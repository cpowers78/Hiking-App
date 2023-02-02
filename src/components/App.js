
import React, {useState} from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Grid from '@mui/material/Grid';
import Axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { InputAdornment } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ForwardIcon from '@mui/icons-material/Forward';
import "./styles.css";





const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
    },
    secondary: {
      main: '#c5e1a5',
    },
  },
});


function App() {
  // This provides the styling for the Map.
  const containerStyle = {
    width: '700px',
    height: '800px'
  };
  // This dictates where the map will start.
  const [center, setCenter] = useState({
    lat: 40.855930,
    lng: -73.200668
  });

  const [hikingLocations, setHikingLocations] = useState([]);

  //Initializing the location and storing it in variable with useState
  const [location, setLocation] = useState(" ");

  const[zoomValue, setZoomValue]=useState(10);

 

  function changeLocation(event){
    setZoomValue(10);
    return (setLocation(event.target.value));
  }

  async function handleSubmit(event){
    event.preventDefault();
    const response = await Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyAJwKOwIZVEh5XW1rV7hEknO38vFvXFtnY`);
    const { lat, lng } = response.data.results[0].geometry.location;
    setCenter({ lat, lng });
  }

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      // Make a request to the Google Maps Places API to retrieve the hiking trails near the user's search
      const response = await Axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=hiking%20trails%20in%20${location}&key=AIzaSyAJwKOwIZVEh5XW1rV7hEknO38vFvXFtnY`);

      // Extract the hiking locations from the API response
      const locations = response.data.results.map(result => ({
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        name: result.name
      }));

      //Update the state with the hiking locations
      setHikingLocations(locations);
    } catch (error) {
      console.error(error);
    }
  };


  function zoomIn (lat, lng, prevZoomValue){
    setCenter({lat, lng});
    setZoomValue(18);

  }

  // onSubmit={(event) => handleSubmit(event) && handleClick(event)}
  return (
    <ThemeProvider theme={theme}>
    <Grid container className="background-container" alignItems="center" spacing={2}>
    <Grid item md={6}>
    <Box component="form" noValidate onSubmit={(event) => handleSubmit(event) && handleClick(event)}>
    <Typography variant="h4" gutterBottom>
    Let's Plan Your Next Adventure
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
    Where Would You Like to Hike?
    </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="location"
        label="Location"
        value={location}
        onChange={changeLocation}
        name="location"
        autoComplete="location"
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOnIcon fontsize="small" />
            </InputAdornment>
          ),
        }}
       
      />
      <Button type="submit" fullWidth variant="contained" color="primary" endIcon={<ForwardIcon />}>
        Let's Go
      </Button>
      </Box>
      </Grid>
      <Grid item md={6}>
      <LoadScript
        googleMapsApiKey="AIzaSyAJwKOwIZVEh5XW1rV7hEknO38vFvXFtnY"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoomValue}
        >
          {hikingLocations.map(location =>(
            <Marker
            key={location.name}
            position={{lat: location.lat, lng: location.lng}}
            title={location.name}
            onClick={() => zoomIn(location.lat, location.lng)}
            icon={{
              url: "https://static.thenounproject.com/png/3342420-200.png",
              scaledSize: {width: 50, height: 50}
              
            }}
            />
          ))}
          <></>
        </GoogleMap>
      </LoadScript>
      </Grid>
    
    </Grid>
    </ThemeProvider>
    
  );
}

export default App;
