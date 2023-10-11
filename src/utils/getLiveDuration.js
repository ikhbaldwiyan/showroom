export const getLiveDuration = (start, end) => {
  // Given start and end dates
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Calculate the duration in milliseconds
  const duration = endDate - startDate;
  // Convert the duration to hours, minutes, and seconds
  const hours = Math.floor(duration / 3600000);
  const minutes = Math.floor((duration % 3600000) / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);

  // Output the live time duration
  let durationString = ``;
  if (hours > 0) {
    durationString += `${hours} hours, `;
  }
  durationString += `${minutes} minutes, ${seconds} seconds.`;
  
  return durationString
};

export const getLiveDurationMinutes = (duration) => {
  const minutes = Math.floor(duration / 60000);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} minutes`;
  } else {
    return `${hours} hours ${remainingMinutes} minutes`;
  }
};
