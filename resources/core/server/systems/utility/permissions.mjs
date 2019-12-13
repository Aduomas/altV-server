import * as alt from 'alt';

export function checkPermissions(player, perm)
{
    if(player.perm.toLowerCase() == perm.toLowerCase())
        return true;
    else
    {
        alt.emitClient(player, 'showAlertBox', `Neturi ${perm} privilegijų.`, 'red', 3000);
        return false;
    }
}