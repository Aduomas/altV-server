export function checkPermissions(player, perm)
{
    if(player.perm == perm)
        return true;
    else
    {
        alt.emitClient(player, 'showAlertBox', `Neturi ${perm} privilegijų.`, 'red', 3000);
        return false;
    }
}