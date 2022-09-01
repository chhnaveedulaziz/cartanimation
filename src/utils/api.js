import axios from "axios"

export const getVideos = async (perPage) => {
 const result = await axios.get(`https://stg.starzly.io/api/featured-videos?page=1&per_page=${perPage}&app=1&new=1`)
 return result.data;
}