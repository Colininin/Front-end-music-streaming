import backEndClient from "./axiosClient";

const searchUri = "search";

const getSearchResults = async (input) => {
    try {
        const response = await backEndClient.post(searchUri, { input });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { getSearchResults };