
export default {

  apiUrl: process.env.API_URL || '',
  uiUrl: process.env.UI_URL || '',

  defaultMeta: {},

  formats: {
     dateTime: 'DD-MM-YYYY HH:mm',
     date: 'DD-MM-YYYY',
     time: 'HH:mm',
   },
};
