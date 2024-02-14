import React from "react";

type Props = {
  name: string;
};

function Avatar({ name }: Props) {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "A";
  return (
    <div
      className="rounded-circle avatar-xs"
      style={{
        width: "30px",
        height: "30px",
        backgroundColor: "#FFA500",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
      }}
    >
      {firstLetter}
    </div>
  );
}

export default Avatar;
