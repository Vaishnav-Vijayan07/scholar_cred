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
