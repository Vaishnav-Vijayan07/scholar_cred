import React from "react";

type Props = {
  name: string;
  image?: string | null;
};

function Avatar({ name, image }: Props) {
  
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
      {image ? (
        <img
          className="rounded-circle"
          src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
          alt="Image not loaded"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        name ? name.charAt(0).toUpperCase() : "A"
      )}
    </div>
  );
}

export default Avatar;
