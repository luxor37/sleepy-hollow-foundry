/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class SHActor extends Actor {
    /**
     * Augment the basic actor values with additional dynamic values.
     */
    prepareData() {
        super.prepareData();

    }

    // @override
    //prepareDerivedData() { 
    prepareBaseData() {
        const characterTypes = ["animal", "human", "npc"]
        if (characterTypes.includes(this.type)) {
            this._prepareActorData();
        }
        if (this.type == "vehicle") {
            this._prepareVehicleData();
        }
    }
    /**
     * Prepare Character type specific data
     */
    _prepareActorData() {
        // Update armor
        this.system.armorrating.value = 0;

        // Update encumbrance
        this.system.isEncumbered = "";
        this.system.encumbranceMax = parseInt(this.system.attributes.strength.max) * 2;

        // Pack Mule talent
        if ('items' in this) {
            const items = Array.from(this.items.values())
            const findPackMuleTalent = items.filter(item => (item.type === 'talent' && item.name === 'Pack Mule'))
            if (findPackMuleTalent.length === 1) {
                this.system.encumbranceMax += 2;
            }
        }
        let encumbranceBonus = (this.system.encumbranceBonus) ? this.system.encumbranceBonus : 0;
        this.system.encumbranceMax += encumbranceBonus;
        let _totalWeight = 0;
        // add items
        let physicalItems = this.items.filter(i => i.system.weight != undefined);
        let weightedItems = physicalItems.filter(_itm => _itm.system.weight > 0 && !_itm.system.stashed);
        var itemsWeight = weightedItems.reduce(function (accumulator, i) {
            return accumulator + (parseInt(i.system.quantity) * Number(i.system.weight));
        }, 0);
        _totalWeight += Number(itemsWeight);
        //add grub, water, booze and bullets
        try {
            _totalWeight += parseInt(this.system.resources.grub.value) / 4;
            _totalWeight += parseInt(this.system.resources.grubRot.value) / 4;
            _totalWeight += parseInt(this.system.resources.water.value) / 4;
            _totalWeight += parseInt(this.system.resources.waterRot.value) / 4;
            _totalWeight += parseFloat(this.system.resources.booze.value);
            _totalWeight += parseInt(this.system.resources.bullets.value) / 20;
        } catch (error) {
            console.error(error);
        }
        _totalWeight = Math.round((_totalWeight + Number.EPSILON) * 100) / 100
        this.system.itemsWeight = _totalWeight;
        if (_totalWeight > this.system.encumbranceMax) {
            this.system.isEncumbered = "encumbered";
        } else {
            this.system.isEncumbered = "";
        }
    }

    // ! VEHICLE METHODS
    /**
     * Prepare Vehicle type specific data
     */
    _prepareVehicleData() {
        console.warn('ITS VEHICLE')
    }

}
