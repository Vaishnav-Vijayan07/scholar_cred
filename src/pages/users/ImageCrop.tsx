import React, { useEffect, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "react-bootstrap";

const Img = { width: 150, height: 50 };
const Alt = { width: 30, height: 30 };

function ImageCrop({
  file,
  setCroppedFile,
  setShowModal,
  setBlobdata,
  setCropConfig,
  cropConfig,
}: any) {
  const imgref = useRef<any>(null);
  const [flag, setFlag] = useState<boolean>(false);
  const [config, setConfig] = useState({
    width: cropConfig.alt ? Alt.width : Img.width,
    height: cropConfig.alt ? Alt.height : Img.height,
  });
  const [files, setFiles] = useState<any>("");

  const [crop, setCrop] = useState<any>({
    unit: "px",
    width: config.width,
    height: config.height,
    aspect: 1,
    x: 25,
    y: 25,
  });

  const handleclick = () => console.log(crop);

  useEffect(() => {
    if (file.image !== null) {
      setFiles(file.image);
      setFlag(true);
    } else if (file.altImage !== null) {
      setFiles(file.altImage);
      setFlag(false);
    }
  }, [
    file,
    cropConfig.img.height,
    cropConfig.img.width,
    cropConfig.alt.height,
    cropConfig.alt.width,
  ]);

  const getCroppedImage = () => {
    const timestamp = new Date().getTime();
    const fileName = `image_${timestamp}.jpg`;

    const image = imgref.current;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx: any = canvas.getContext("2d");
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const getBlob = (canvas: any): Promise<File | null> => {
      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob: any) => {
            if (blob) {
              const file = new File([blob], fileName, {
                type: "image/jpeg",
              });
              resolve(file);
            } else {
              reject(new Error("Failed to create blob."));
            }
          },
          "image/jpeg",
          0.9
        );
      });
    };

    getBlob(canvas)
      .then((file) => {
        if (file) {
          const blobValue = file;
          if (flag) {
            setBlobdata((prev: any) => ({ ...prev, img: file }));
          } else {
            setBlobdata((prev: any) => ({ ...prev, alt: file }));
          }
        } else {
          console.error("Failed to get blob.");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });

    const base64Image: any = canvas.toDataURL("image/jpeg");

    if (flag) {
      setCroppedFile((prev: any) => ({ ...prev, croppedImage: base64Image }));
    } else {
      setCroppedFile((prev: any) => ({
        ...prev,
        croppedAltImage: base64Image,
      }));
    }
    setShowModal((prev: any) => !prev);
    setCropConfig({ img: false, alt: false });
    setFlag(false);
  };
  return (
    <>
      <div className="d-flex flex-column justify-content-center gap-4 align-items-center">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactCrop
            crop={crop}
            aspect={16 / 9}
            onChange={(newCrop: any) => setCrop(newCrop)}
            locked
          >
            <img
              ref={imgref}
              src={files}
              alt=""
              onClick={handleclick}
            />
          </ReactCrop>
        </div>
        <div>
          <Button onClick={getCroppedImage}>Proceed</Button>
        </div>
      </div>
    </>
  );
}

export default ImageCrop;
