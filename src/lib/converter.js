import { writable, get } from 'svelte/store';

class Unit {
    /* Базовые единицы:
    масса - грамм,
    объем - миллилитр.
    */
    constructor(label, value, category) {
        this.label = label;
        this.value = value; // базовая единица
        this.category = category;
    }
}

export const unitStore = writable({
    mg: new Unit('мг', 0.001, 'weight'),
    g: new Unit('г', 1, 'weight'),
    kg: new Unit('кг', 1000, 'weight'),
    q: new Unit('центнеры', 100000, 'weight'),
    t: new Unit('тонны', 1000000, 'weight'),
    oz: new Unit('унции', 28.35, 'weight'),
    lb: new Unit('фунты', 453.59, 'weight'),
    ct: new Unit('караты', 0.2, 'weight'),
    ml: new Unit('мл', 1, 'volume'),
    l: new Unit('л', 1000, 'volume'),
    pt: new Unit('пинты', 568.26, 'volume'),
    tspn: new Unit('чайные ложки', 5, 'volume'),
    tbsp: new Unit('столовые ложки', 15, 'volume'),
    cup: new Unit('стаканы', 200, 'volume')
});

export class Converter {
    static addUnit(unitCode, args) {
        unitStore.update(units => {
            units[unitCode] = new Unit(...args);
            return units;
        });
    }

    static loadFromStorage() {
        for (let i = 0; i < localStorage.length; i++) {
            const unitCode = localStorage.key(i);
            const args = JSON.parse(localStorage.getItem(unitCode));
            this.addUnit(unitCode, args);
        }
    }

    static {
        this.loadFromStorage();
    }

    static convert(unit1Code, value1, unit2Code) {
        const units = get(unitStore);
        const unit1 = units[unit1Code];
        const unit2 = units[unit2Code];
        if (unit1.category != unit2.category) {
            return null;
        }
        return Number(value1) * unit1.value / unit2.value;
    }

    static addCustomUnit(label, value, category) {
        const args = [label, Number(value), category];
        const unitCode = crypto.randomUUID();
        localStorage.setItem(unitCode, JSON.stringify(args));
        this.addUnit(unitCode, args);
        return unitCode;
    }

    static removeCustomUnit(unitCode) {
        localStorage.removeItem(unitCode);
        unitStore.update(units => {
            delete units[unitCode];
            return units;
        });
    }

    static unitsInCategory(category) {
        const units = get(unitStore);
        return Object.keys(units).filter(key => units[key].category == category);
    }
}