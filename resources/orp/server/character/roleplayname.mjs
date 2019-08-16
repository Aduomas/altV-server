import * as alt from 'alt';
import SQL from '../../../postgres-wrapper/database.mjs';

const db = new SQL();

console.log('Loaded: character->roleplayname.mjs');

export function setRoleplayName(player, roleplayName) {
    db.selectData('Character', ['name'], results => {
        if (results === undefined) {
            player.data.name = roleplayName;
            player.save();
            alt.emitClient(player, 'closeRoleplayNameDialog');
            player.setSyncedMeta('name', player.data.name);
            return;
        }

        var result = results.find(
            dbData => dbData.name.toLowerCase() === roleplayName.toLowerCase()
        );

        if (result !== undefined) {
            alt.emitClient(player, 'roleplayNameTaken');
            return;
        }

        player.data.name = roleplayName;
        player.save();

        alt.emitClient(player, 'closeRoleplayNameDialog');
        player.setSyncedMeta('name', player.data.name);
    });
}
