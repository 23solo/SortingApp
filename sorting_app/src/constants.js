const prod = {
    url: {
     API_URL: 'https://solanki-algo-visualiser.onrender.com/app/'}
   };
   const dev = {
    url: {
     API_URL: 'http://localhost:3000/app/'
    }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
