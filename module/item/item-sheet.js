/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class SHItemSheet extends ItemSheet {
    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["sleepy-hollow", "sheet", "item"],
            width: 520,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }],
        });
    }

    /** @override */
    get template() {
        const path = "systems/sleepy-hollow/templates/item";
        // Return a single sheet for all item types.
        // return `${path}/item-sheet.html`;
        // Alternatively, you could use the following return statement to do a
        // unique item sheet by type, like `weapon-sheet.html`.
        return `${path}/item-${this.item.type}-sheet.html`;
    }

    /* -------------------------------------------- */

    /** @override */
    async getData(options) {
        const context = await super.getData();
        const item = context.item;
        const source = item.toObject();

        foundry.utils.mergeObject(context, {
            source: source.system,
            system: item.system,
            isEmbedded: item.isEmbedded,
            type: item.type,
            flags: item.flags,
            descriptionHTML: await TextEditor.enrichHTML(item.system.description, {
                secrets: item.isOwner,
                async: true
            })
        });

        // Retrieve the roll data for TinyMCE editors.
        context.rollData = {};
        let actor = this.object?.parent ?? null;
        if (actor) {
            context.rollData = actor.getRollData();
        }

        context.SH = CONFIG.SH;
        context.creatureAttributes = Object.fromEntries(Object.keys(CONFIG.SH.ATTRIBUTES).map(k => [k, `${CONFIG.SH.ATTRIBUTES[k]}_${source.system.creatureType}`.toUpperCase()]));

        return context;
    }

    /* -------------------------------------------- */

    /** @override */
    setPosition(options = {}) {
        const position = super.setPosition(options);
        const sheetBody = this.element.find(".sheet-body");
        const bodyHeight = position.height - 192;
        sheetBody.css("height", bodyHeight);
        return position;
    }

    /* -------------------------------------------- */

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        // Roll handlers, click handlers, etc. would go here.
    }

    _getHeaderButtons() {
        let buttons = super._getHeaderButtons();
        return [{
            label: "",
            class: "header-chat-button",
            icon: "fas fa-comment",
            onclick: ev => this._onChatButton(ev)
        }].concat(buttons);

    }

    _onChatButton(ev) {
        //console.log(this.object.sendToChat());
    }
}
