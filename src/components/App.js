
import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Grid from '@mui/material/Grid';






function App() {
  // This provides the styling for the Map.
  const containerStyle = {
    width: '700px',
    height: '800px'
  };
  // This dictates where the map will start.
  const center = {
    lat: -3.745,
    lng: -38.523
  };
 
  return (
    <Grid container spacing={2}>
    <Grid item md={6}>
    <Box component="form" noValidate >
      <TextField
        margin="normal"
        required
        fullWidth
        id="location"
        label="Location"
       
        name="location"
        autoComplete="location"
        autoFocus
       
      />
      <Button type="submit" fullWidth variant="contained">
        Submit
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
          zoom={10}
        >
          <></>
        </GoogleMap>
      </LoadScript>
      </Grid>
    
    </Grid>
  );
}

export default App;
