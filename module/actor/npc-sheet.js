import { SHActorSheet } from "./actor-sheet.js";

export class SHNpcSheet extends SHActorSheet {
    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["sleepy-hollow", "sheet", "actor"],
            template: "systems/sleepy-hollow/templates/actor/npc-sheet.html",
            width: 600,
            height: 615,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }],
        });
    }
}
