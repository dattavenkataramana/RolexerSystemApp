import axios from 'axios';

const baseURL = 'https://mern-transactionanalyzer.onrender.com';

export const getTransactions = async (month, searchText, currentPage) => {
    try {
      const response = await axios.get(`${baseURL}/getTransactions`, {
        params: {
          month,
          search: searchText,
          page: currentPage,
        },
      });
  
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  };
  
  export const getStatisticsData = async (month) => {
    try {
      const response = await axios.get(`${baseURL}/getstatistics`, {
        params: {
          month,
        },
      });
  
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  };
  
  export const getBarChartData = async (month) => {
    try {
      const response = await axios.get(`${baseURL}/getBarChartData`, {
        params: {
          month,
        },
      });
  
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  };