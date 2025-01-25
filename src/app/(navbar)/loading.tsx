import Loading from "@/components/common/Loading";
import React from "react";
import { RiLoaderLine } from "react-icons/ri";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* <RiLoaderLine color="#7d6340" size="130" className="animate-spin" /> */}
      <Loading/>
    </div>
  );
};

export default loading;
