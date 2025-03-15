import Image from "next/image";
import React from "react";

function Rightbar() {
  return (
    <div className="fixed ">
      <div className="item">
        <div className="bg_container ">
          <Image
            className=" object-contain opacity-[0.2]"
            src="/astronaut.png"
            alt=""
            fill
          />
        </div>
        <div className="text">
          <span className="font-bold">🔥 Available Now</span>
          <h3 className="title">
            How to use the new version of the admin dashboard?
          </h3>
          <span className="subtitle">Takes 4 minutes to learn</span>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <button className="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
              />
            </svg>
            Watch
          </button>
        </div>
      </div>
      <div className="item">
        <div className="text">
          <span className="font-bold">🚀 Coming Soon</span>
          <h3 className="title">
            New server actions are available, partial pre-rendering is coming
            up!
          </h3>
          <span className="subtitle">Boost your productivity</span>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <button className="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            Learn
          </button>
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
