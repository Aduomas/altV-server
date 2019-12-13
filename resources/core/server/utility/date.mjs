export function leftTime(banned)
{
    if(banned.toLowerCase() == 'perm')
        return 'Nuolatinis';

    const bannedDate = new Date(banned);
    const currentDate = new Date();

    return bannedDate - currentDate;
}
