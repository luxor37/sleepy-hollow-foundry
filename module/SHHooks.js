export default class SHHooks {

    static async onCreateActor(actor, options, userId) {
        // Set creatureType and use it for building NPCS and PCs
        // NPCs should have type=npc and ceratureType = animal/human
        // PCs should have type=animal/human and ceratureType = animal/human
        if (game.user.id !== userId)
            return;
        let updateData = {};
        updateData["token.disposition"] = CONST.TOKEN_DISPOSITIONS.NEUTRAL;
        updateData["token.vision"] = true;
        if (actor.type != "npc") {
            updateData["system.creatureType"] = actor.type;
            updateData["token.actorLink"] = true;
            updateData["img"] = `systems/sleepy-hollow/assets/ico/img-${actor.type}.svg`
        }
        if (actor.type == "npc") {
            if (actor.system.creatureType == "")
                updateData["system.creatureType"] = actor.type;
        }
        await actor.update(updateData, { renderSheet: true });

        //IF ACTOR IS ARK DON'T DO ANYTHING ELSE
        if (actor.type == "vehicle") return;

        if (actor.type != "npc") {
            const actorCoreSkills = actor.system.coreSkills;
            // Check if skill allready exists by some chance
            const existingSkills = actor.items.filter((i) => i.type === 'skill').map((i) => i.system.skillKey);
            const skillsToAdd = actorCoreSkills.filter((s) => !existingSkills.includes(s));
            // Load Core Skills Compendium skills
            let skillIndex = await game.packs.get("sleepy-hollow.core-skills").getDocuments();
            // TRY TO GET THE OFFICIAL SKILL CONTENT IF IT IS PRESENT
            const errMsgOfficialSkills = 'No official skill compendium found, reverting to the free content.';
            if (actor.system.creatureType == 'animal') {
                try {
                    skillIndex = await game.packs.get("sh-genlab-alpha.sh-genlab-skills").getDocuments();
                } catch (e) {
                    console.log(errMsgOfficialSkills);
                }
            }
            if (actor.system.creatureType == 'human') {
                try {
                    // TODO what is elysium?
                    skillIndex = await game.packs.get("sh-elysium.sh-elysium-skills").getDocuments();
                } catch (e) {
                    console.log(errMsgOfficialSkills);
                }
            }

            // Filter skillIndex array to include only skills for Actor Type.
            let _skillsList = skillIndex.filter((i) => skillsToAdd.includes(i.system.skillKey));
            // Add ACTOR TYPE and CORE to each skill in _skillsList before you assign it to the actor;
            let _sl = [];
            _skillsList.forEach((s) => {
                s.system["creatureType"] = actor.type;
                s.system["coreSkill"] = true;
                _sl.push(s);
            });
            await actor.createEmbeddedDocuments("Item", _sl);
        }
    }

    static onUpdateOwnedItem(item, updateData, option, _id) {
        // UPDATING OWNED ITEM        
        if (!item.parent) return;

        // ! MAKE SURE OWNED SKILLS/ABILITIES/TALENTS ARE OF THE SAME TYPE AS THE ACTOR
        if (item.type == "skill" || item.type == "ability" || item.type == "talent") {
            updateData.system.creatureType = item.actor.system.creatureType;
        }
    }

    static onPreCreateItem(item, updateData, options) {
        // CREATING OWNED ITEM
        if (!item.parent) return;

        if (item.type == "skill" || item.type == "ability" || item.type == "talent") {
            item.updateSource({ "system.creatureType": item.actor.system.creatureType })
        }
    }
}
