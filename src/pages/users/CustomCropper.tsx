import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Cropper from "react-easy-crop";

const Img = 3 / 1;
const Alt = 1 / 1;



export const CustomCropper = ({
    file,
    setCroppedFile,
    setShowModal,
    setBlobdata,
    setCropConfig,
    cropConfig,
}: any) => {

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [flag, setFlag] = useState<boolean>(false);
    const [files, setFiles] = useState<any>("");

    const imgref = useRef<any>(null);

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

    const cropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const getCroppedImage = () => {
        const timestamp = new Date().getTime();
        const fileName = `image_${timestamp}.jpg`;

        const image = imgref.current.current;

        const canvas = document.createElement("canvas");
        const ctx: any = canvas.getContext("2d");

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;


        ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
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

    const setImageRef = (ref: any) => {
        imgref.current = ref;
    };


    return (
        <>
            <div className="d-flex flex-column justify-content-center gap-4 align-items-center">
                <div
                    style={{
                        height: 400,
                        position: "relative",
                        width: 'auto',
                        minWidth: 400,
                    }}
                >
                    <Cropper
                        image={files}
                        setImageRef={setImageRef}
                        crop={crop}
                        zoom={zoom}
                        aspect={cropConfig.alt ? Alt : Img}

                        onZoomChange={setZoom}
                        onCropChange={setCrop}
                        onCropComplete={cropComplete}
                        objectFit={"contain"}
                    />
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <Button onClick={getCroppedImage}>Proceed</Button>
            </div>
        </>

    );
}


