import { useEffect, useState } from "react";
import "./Recommended.css";
import { API_KEY, value_converter } from "../../Data";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);
  const { videoId } = useParams();

  const fetchData = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    try {
      const response = await fetch(relatedVideo_url);
      const data = await response.json();
      setApiData(data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]); // Include categoryId in the dependency array to re-fetch data when it changes

  return (
    <div className="recommended">
      {apiData.map((item, index) => (
        <Link
          to={`/video/${item.snippet.categoryId}/${item.id}`}
          className="side-video-list"
          key={index}
        >
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.statistics.viewCount)} Views</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
