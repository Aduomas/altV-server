export function leftTime(banned)
{
    if(banned.toLowerCase() == 'perm')
        return 'Nuolatinis';

    const bannedDate = new Date(banned);
    const currentDate = new Date();
    const newDate = new Date(bannedDate - currentDate);
    

    let message = ' ';
    if(newDate.getMonth() > 0)
        message += newDate.getMonth() + ' mėnesiai ';
    if(newDate.getDate() > 0)
        message += newDate.getDate() + ' dienos ';
    if(newDate.getHours() > 0)
        message += newDate.getHours() + ' valandos ';
    if(newDate.getMinutes() > 0)
        message += newDate.getMinutes() + ' minutės ';

    return message;
}
