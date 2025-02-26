import { DiceRoller } from "../component/dice-roller.js";

export class RollDialog {
    /**
     * Display roll dialog and execute the roll.
     *
     * @param  {string}        rollName
     * @param  {string}       [attributeName]  The key of the used attribute (for push data)
     * @param  {string}       [itemId]         The ID of the used item (for push data)
     * @param  {object|number} attribute
     * @param  {object|number} skill
     * @param  {number}        gear
     * @param  {number}        modifierDefault
     * @param  {number}        damage
     * @param  {DiceRoller}    diceRoller
     * @param  {callback}      [onAfterRoll]
     */
    static async prepareRollDialog({
        rollName = "",
        attributeName = null,
        itemId = null,
        attribute = { default: 0, total: 0 },
        skill = { default: 0, total: 0 },
        gear = { default: 0, total: 0 },
        modifierDefault = 0,
        damage = 0,
        diceRoller = null,
        onAfterRoll = null,
        applyedModifiers = null,
        actor = null,
        skillItem = null } = {}) {
        if (!diceRoller) {
            throw new Error("DiceRoller object must be passed to prepareRollDialog()");
        }
        onAfterRoll = onAfterRoll || function () { };

        let htmlData = {
            attribute: {
                name: "SH.DICE_ATTRIBUTE",
                type: "attribute",
                total: attribute.total,
                default: attribute.default,
                modifiers: attribute.modifiers
            },
            skill: {
                name: "SH.DICE_SKILL",
                type: "skill",
                total: skill.total,
                default: skill.default,
                modifiers: skill.modifiers
            },
            gear: {
                name: "SH.DICE_GEAR",
                type: "gear",
                total: gear.total,
                default: gear.default,
                modifiers: gear.modifiers
            },
            modifier: {
                name: "SH.MODIFIER",
                type: "modifier",
                value: modifierDefault
            },
            applyedModifiers: applyedModifiers
        };

        const htmlContent = await renderTemplate("systems/sleepy-hollow/templates/app/roll-dialog.html", htmlData);
        return new Promise((resolve) => {
            let d = new Dialog({
                title: `${game.i18n.localize("SH.ROLL")} : ${game.i18n.localize(rollName)}`,
                content: htmlContent,
                buttons: {
                    roll: {
                        icon: '<i class="fas fa-check"></i>',
                        label: `${game.i18n.localize("SH.ROLL")}`,
                        callback: (html) => {
                            let attribute = html.find("#attribute")[0].value;
                            let skill = html.find("#skill")[0].value;
                            let gear = html.find("#gear")[0].value;
                            let modifier = html.find("#modifier")[0].value;
                            diceRoller.preparePushData(attributeName, itemId);
                            diceRoller.roll({
                                rollName: rollName,
                                attribute: parseInt(attribute, 10),
                                skill: parseInt(skill, 10),
                                gear: parseInt(gear, 10),
                                modifier: parseInt(modifier, 10),
                                damage: parseInt(damage, 10),
                                actor: actor,
                                skillItem: skillItem
                            });
                            onAfterRoll(diceRoller);
                        },
                    },
                },
                default: "roll",
                close: () => { },
            });
            d.render(true);
        });
    }

}
