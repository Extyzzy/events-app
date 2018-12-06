
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY || '';

export default {

  apiUrl: process.env.REACT_APP_API_URL || '',
  uiUrl: process.env.REACT_APP_UI_URL || '',

  googleMapsApiKey,
  googleMapsApiV3Url: `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&language=ro&v=3.exp&libraries=geometry,drawing,places`,

  defaultMeta: {},

  formats: {
     dateTime: 'DD-MM-YYYY HH:mm',
     date: 'DD-MM-YYYY',
     time: 'HH:mm',
   },
};
