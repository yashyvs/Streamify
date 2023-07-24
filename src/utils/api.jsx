const API_KEY = "AIzaSyDSSIgipVRx8lRn7Keogh2MI3F5CHHFK3Q";

export const SEARCH_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&regionCode=IN&key=" +
  API_KEY +
  "&q=";

export const VIDEO_DETAILS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=" +
  API_KEY +
  "&id=";

export const SEARCH_SUGGESTIONS_API =
  "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const SIMILAR_VIDEO_API =
  "https://www.googleapis.com/youtube/v3/search?regionCode=IN&maxResults=15&part=snippet&type=video&key=" +
  API_KEY +
  "&relatedToVideoId=";
