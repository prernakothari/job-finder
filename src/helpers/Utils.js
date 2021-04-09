export function TimeAgo(created_at, currentTime = undefined) {
    created_at = created_at.split(" ")
    let month = {
        "Jan": 0,
        "Feb": 1,
        "Mar": 2,
        "Apr": 3,
        "May": 4,
        "Jun": 5,
        "Jul": 6,
        "Aug": 7,
        "Sep": 8,
        "Oct": 9,
        "Nov": 10,
        "Dec": 11
    }
    let minutes = 1000 * 60;
    let hours = minutes * 60;
    let days = hours * 24;
    let months = days * 30;
    let years = days * 365;
    let createdDayTime = created_at[3].split(":").map(it => Number(it))
    if (currentTime === undefined)
        currentTime = new Date().getTime()

    let createdDate = Date.UTC(Number(created_at[5]), month[created_at[1]], Number(created_at[2]), createdDayTime[0], createdDayTime[1], createdDayTime[2]);
    let deltaT = currentTime - createdDate

    if (deltaT < 1000 * 60)
        return "Just now"
    else if (deltaT > minutes && deltaT < hours)
        return `${Math.floor(deltaT / minutes)} min ago`
    else if (deltaT > hours && deltaT < days)
        return `${Math.floor(deltaT / hours)}h ago`
    else if (deltaT > days && deltaT < months)
        return `${Math.floor(deltaT / days)}d ago`
    else if (deltaT > months && deltaT < years)
        return `${Math.floor(deltaT / months)} months ago`
    else
        return `${Math.floor(deltaT / years)}yr ago`
}


