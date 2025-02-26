/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class SHItem extends Item {

    async _preCreate(createData, options, userId) {
        await super._preCreate(createData, options, userId);
        if (this.img == 'icons/svg/item-bag.svg') {
            let _itemImg = '';
            if (this.parent && this.type == 'talent') {
                _itemImg = `systems/sleepy-hollow/assets/ico/${this.type}_${this.parent.system.creatureType}.svg`;
            } else {
                _itemImg = `systems/sleepy-hollow/assets/ico/${this.type}.svg`;
            }
            this.updateSource({ "img": _itemImg })
        }
    }
    /**
     * Augment the basic Item values model with additional dynamic values.
     */
    prepareData() {
        super.prepareData();
        this.system.itemType = this.type;
        this.system.default_attributes = CONFIG.SH.attributes; // ? WHAT IS THIS FOR ?
        this.system.skillKeysList = CONFIG.SH.SKILLKEYS;
    }


    async sendToChat() {
        const itemData = duplicate(this.system);
        itemData.name = this.name;
        itemData.img = this.img;
        itemData.isWeapon = this.type === "weapon";
        itemData.isArmor = this.type === "armor";
        itemData.isCritical = this.type === "critical";
        itemData.isGear = this.type === "gear";
        itemData.isTalent = this.type === "talent";
        itemData.isSkill = this.type === "skill";
        if (this.parent)
            itemData.creatureType = this.actor.system.creatureType;

        const html = await renderTemplate("systems/sleepy-hollow/templates/chat/item.html", itemData);
        const chatData = {
            user: game.user.id,
            rollMode: game.settings.get("core", "rollMode"),
            content: html,
        };
        if (["gmroll", "blindroll"].includes(chatData.rollMode)) {
            chatData.whisper = ChatMessage.getWhisperRecipients("GM");
        } else if (chatData.rollMode === "selfroll") {
            chatData.whisper = [game.user];
        }
        ChatMessage.create(chatData);
    }
}
