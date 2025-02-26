import { SHActorSheet } from "./actor-sheet.js";

export class SHHumanSheet extends SHActorSheet {
    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["sleepy-hollow", "sheet", "actor"],
            template: "systems/sleepy-hollow/templates/actor/human-sheet.html",
            width: 720,
            height: 720,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "description",
                },
            ],
        });
    }
}
