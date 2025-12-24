import React from "react";
import connect from "../../assets/images/connect_img.png";
import World_map from "../../assets/images/World_map.png";
import { Link } from "react-router-dom";

export default function Connect() {
  return (
    <section>
      <div className="flex justify-center md:justify-between align-middle items-center my-2">
        <div className="flex flex-col align-center items-center  justify-center md:items-start md:align-start ">
          <div className="mb-1">
            <img src={connect} alt="Connect" />
          </div>
          <h2 className="text-center md:text-left md:text-xl lg:text-4xl mt-4 mb-2 font-semibold ">
            Join our <span className="text-light">community </span> of students{" "}
            <br />
            from around the world
          </h2>
          <p className="text-base text-light_black ">
            Gain access to global opportunities
          </p>
          <div>
            <button className="bg-light py-2 px-4 rounded-3xl mt-6 w-40 md:w-auto ">
              <Link
                to="https://discord.gg/EfTkBxs5Fd"
                style={{ color: "white" }}
              >
                Join Community
              </Link>
            </button>
          </div>
        </div>
        <div className="hidden md:flex w-1/2">
          <img src={World_map} alt="Connect" />
        </div>
      </div>
    </section>
  );
}
