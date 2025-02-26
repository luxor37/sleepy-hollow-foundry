export class SH {
    static SKILLKEYS = [
        "ANIMALHANDLING",
        "CRAFTING",
        "FORCE",
        "HEALING",
        "INSIGHT",
        "LEADERSHIP",
        "LOREKNOWLEDGE",
        "MARKSMANSHIP",
        "MELEE",
        "MOBILITY",
        "OBSERVATION",
        "PERFORMANCE",
        "PERSUASION",
        "STEALTH",
        "STAMINA",
        "SURVIVAL"
    ]

    static CREATURE_TYPES = {
        "human": "SH.HUMAN"
    }

    static ATTRIBUTES = {
        "strength": "SH.ATTRIBUTE_STRENGTH_HUMAN",
        "agility": "SH.ATTRIBUTE_AGILITY_HUMAN",
        "wits": "SH.ATTRIBUTE_WITS_HUMAN",
        "empathy": "SH.ATTRIBUTE_EMPATHY_HUMAN"
    }

    static RANGES = {
        "range_engaged": "SH.RANGE_ENGAGED",
        "range_short": "SH.RANGE_SHORT",
        "range_medium": "SH.RANGE_MEDIUM",
        "range_long": "SH.RANGE_LONG",
        "range_extreme": "SH.RANGE_EXTREME"
    }

    static ITEM_SIZES = {
        "0.00": "SH.WEIGHT_TINY",
        "0.25": "SH.WEIGHT_QUARTER",
        "0.50": "SH.WEIGHT_LIGHT",
        "1.00": "SH.WEIGHT_REGULAR",
        "2.00": "SH.WEIGHT_HEAVY"
    }

    static WEAPON_CATEGORIES = {
        "melee": "SH.WEAPON_MELEE",
        "ranged": "SH.WEAPON_RANGED"
    }

    static ARMOR_TYPES = {
        "armor": "SH.ARMOR_BODY",
        "shield": "SH.ARMOR_SHIELD",
    }

    static TALENT_CREATURE_TYPES = {
        "human": "SH.TALENT_HUMAN",
        "animal": "SH.TALENT_ANIMAL"
    }
}