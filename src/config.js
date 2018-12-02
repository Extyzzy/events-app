

export default {

  apiUrl: process.env.REACT_APP_API_URL || '',
  uiUrl: process.env.REACT_APP_UI_URL || '',

  defaultMeta: {},

  formats: {
     dateTime: 'DD-MM-YYYY HH:mm',
     date: 'DD-MM-YYYY',
     time: 'HH:mm',
   },
};
