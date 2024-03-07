export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + "...";
  }
};

export function calculateTimeAgo(createdAt: number): string {
  const createdAtDate: Date = new Date(createdAt);
  const currentDateTime: Date = new Date();

  const timeDifference: number = currentDateTime.getTime() - createdAtDate.getTime();
  const minutesAgo: number = Math.floor(timeDifference / (1000 * 60));

  if (minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo !== 1 ? "s" : ""} ago`;
  } else {
    const hoursAgo: number = Math.floor(minutesAgo / 60);

    if (hoursAgo < 24) {
      return `${hoursAgo} hour${hoursAgo !== 1 ? "s" : ""} ago`;
    } else {
      const daysAgo: number = Math.floor(hoursAgo / 24);
      return `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
    }
  }
}

export const getFileExtension = (key: string) => {
  const fileName = key.split("\\").pop(); // Extract the file name from the path
  if (!fileName) return "txt"; // Default to txt extension if file name is not present

  const fileParts = fileName.split("."); // Split file name into parts using the dot (.) separator
  if (fileParts.length < 2) return "txt"; // If there is no file extension, default to txt

  const fileExtension = fileParts.pop()!.toLowerCase(); // Get the last part as the file extension
  switch (fileExtension) {
    case "jpg":
    case "jpeg":
      return "jpeg"; // You can choose to handle jpg and jpeg as the same extension
    case "pdf":
    case "xlsx":
    case "png":
      return fileExtension;
    default:
      return "txt"; // Default to txt extension for unknown file types
  }
};
