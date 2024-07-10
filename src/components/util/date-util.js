export const timeFormat=(date)=>{
    if(!date) return;
    const timeWithSeconds = date.split('T')[1].split('.')[0]; // Extract time part with seconds
    const timeOnly = timeWithSeconds.split(':').slice(0, 2).join(':'); 
    return timeOnly;
}