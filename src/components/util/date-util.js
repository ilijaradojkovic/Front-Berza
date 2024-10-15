export const timeFormat = (date, casinoConfiguration) => {
    if (!date || !casinoConfiguration) return;

    const timeWithSeconds = date.split('T')[1].split('.')[0];
    const timeOnly = timeWithSeconds.split(':').slice(0, 2).join(':'); 

//    console.log(casinoConfiguration)
    if (casinoConfiguration.zone === "UTC") {
        return timeOnly;
    }

  
    const dateObject = new Date(date); 
    const formattedTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: casinoConfiguration.zone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(dateObject);

    return formattedTime;
}