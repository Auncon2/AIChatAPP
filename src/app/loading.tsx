import Loading from "@/components/Loading/Loading";
import React from "react";
import { RiLoaderLine } from "react-icons/ri";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loading />
    </div>
  );
};

export default loading;
