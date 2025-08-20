import React from "react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fff]">
      <div
        className="w-full max-w-[393px] min-h-screen bg-white flex flex-col mx-auto shadow-lg"
        style={{ height: "100vh" }}
      >
        {children}
      </div>
    </div>
  );
}
