import JSZip from "jszip";

const useDownload = () => {
  async function handleZip(images: any) {
    const zip = new JSZip();

    // Add Images to the zip file
    for (let i = 0; i < images.length; i++) {
      const response = await fetch(images[i]);
      const blob = await response.blob();
      zip.file(images[i].split("/").pop(), blob);
    }

    // Generate the zip file
    const zipData = await zip.generateAsync({
      type: "blob",
      streamFiles: true,
    });

    // Create a download link for the zip file
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(zipData);
    link.download = "name-zip-folder.zip";
    link.click();
  }

  return { handleZip };
};

export { useDownload };
