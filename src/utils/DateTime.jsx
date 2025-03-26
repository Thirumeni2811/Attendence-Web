import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc); // Extend UTC plugin
dayjs.extend(timezone); // Extend Timezone plugin

//format time
export const formatTimeToUTC = (time) => {
    return dayjs.utc(time).toISOString(); // Converts to UTC and formats as ISO 8601
};

//format date
export const formatDate = (date) => {
    return dayjs(date).format("DD-MM-YYYY"); // Format date in dd-mm-yyyy
};

// format time for table
export const formatTimeToIST = (time) => {
    const utcTime = formatTimeToUTC(time); // Get UTC time
    return dayjs(utcTime).tz("Asia/Kolkata").format("hh:mm A"); // Convert to IST and format as hh:mm AM/PM
};