import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { abbreviateNumber } from "js-abbreviation-number";
import SimilarVideoCard from "./SimilarVideoCard";
import { SIMILAR_VIDEO_API, VIDEO_DETAILS_API } from "../utils/api";
import { AiOutlineLike } from "react-icons/ai";

const VideoPage = () => {
  const [video, setVideo] = useState();
  const [similarVideo, setSimilarVideo] = useState();
  const { id } = useParams();
  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    getVideoDetails();
    getSimilarVideo();
  }, [id]);

  const getVideoDetails = async () => {
    const data = await fetch(VIDEO_DETAILS_API + id);
    const json = await data.json();
    setVideo(json.items);
  };
  const getSimilarVideo = async () => {
    const idData = await fetch(SIMILAR_VIDEO_API + id);
    const idJson = await idData.json();
    const VideoId = idJson.items
      .map((item) => {
        return item.id.videoId;
      })
      .join(",");
    const data = await fetch(VIDEO_DETAILS_API + VideoId);
    const json = await data.json();
    setSimilarVideo(json.items);
  };

  return (
    <div className="flex justify-center flex-row h-[calc(100%-54px)] bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          <div className="text-white font-bold text-sm md:text-xl h-16 mt-4 line-clamp-2">
            {!video ? null : video[0]?.snippet?.title}
          </div>
          {!video ? null : (
            <div className="flex justify-between flex-col md:flex-row mt-4 ">
              <div className="flex ">
                <div className="flex flex-col">
                  <div className="text-white text-lg font-semibold flex items-center mt-2">
                    {video[0]?.snippet?.channelTitle}
                  </div>
                </div>
              </div>
              <div className="flex text-white mt-4 md:mt-0">
                <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                  <AiOutlineLike className="text-xl text-white mr-2 " />
                  <span>
                    {`${abbreviateNumber(
                      video[0]?.statistics?.likeCount,
                      2
                    )} likes`}{" "}
                  </span>
                </div>
                <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                  <span>
                    {`${abbreviateNumber(
                      video[0]?.statistics?.viewCount,
                      2
                    )} views`}{" "}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="text-white font-medium text-sm md:text-lg h-16 mt-4 line-clamp-2">
            {!video ? null : video[0]?.snippet?.description}
          </div>
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          {!similarVideo
            ? null
            : similarVideo.map((data) => {
                return (
                  <SimilarVideoCard
                    key={data?.id}
                    video={data.snippet}
                    statistics={data.statistics}
                    videoId={data?.id}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
