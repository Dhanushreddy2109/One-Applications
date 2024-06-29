const logger = require("./logger");
const axios = require('axios');


async function listJobs(data) {
    try {
        const apiKey = '87aface2187527b15d5774dcfb57484fbdc74a75652a4313e1d5ff11931a0959';

        const searchQuery = data.searchText || 'software engineer';
        const location = data.location || 'Ireland';

        const url = 'https://serpapi.com/search';
        const params = {
            engine: 'google_jobs',
            q: searchQuery,
            location: location,
            api_key: apiKey
          };
        
          try {
            const response = await axios.get(url, { params });
            return response.data.jobs_results;
          } catch (error) {
            logger.error('Error fetching Google Jobs:', error);
            return [];
          }

    } catch(error) {
        logger.error(error);
        throw error;
    }

}

module.exports = {
    listJobs
}