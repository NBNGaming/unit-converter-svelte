import { vi, expect, test, afterEach } from 'vitest';
import { unitStore, Converter } from '../src/lib/converter.js';
import { get } from 'svelte/store';

const crypto = require('crypto');
vi.stubGlobal('crypto', crypto);

const initUnits = {...get(unitStore)};
afterEach(() => {
    unitStore.set({...initUnits});
    localStorage.clear();
});

test('basic convert', () => {
    expect(Converter.convert('kg', 5, 'mg')).toBe(5000000);
});

test('different categories', () => {
    expect(Converter.convert('kg', 5, 'l')).toBeNull();
});

test('NaN', () => {
    expect(Converter.convert('kg', 'test', 'mg')).toBeNaN();
});

test('same unit', () => {
    expect(Converter.convert('kg', 5, 'kg')).toBe(5);
});

test('same base unit', () => {
    expect(Converter.convert('g', 5, 'g')).toBe(5);
});

test('add custom unit - convert', () => {
    const unitCode = Converter.addCustomUnit('стаканы сахара', 160, 'weight');
    expect(Converter.convert(unitCode, 2, 'g')).toBe(320);
});

test('add custom unit - save', () => {
    const unitCode = Converter.addCustomUnit('стаканы сахара', 160, 'weight');
    expect(localStorage.getItem(unitCode)).toBe('["стаканы сахара",160,"weight"]');
});

test('add custom unit - load', () => {
    const unitCode = 'test';
    localStorage.setItem(unitCode, '["стаканы сахара",160,"weight"]');
    Converter.loadFromStorage();
    expect(get(unitStore)[unitCode]).toEqual({
        label: 'стаканы сахара',
        value: 160,
        category: 'weight'
    });
});

test('remove custom unit', () => {
    const unitCode = Converter.addCustomUnit('стаканы сахара', 160, 'weight');
    Converter.removeCustomUnit(unitCode);
    expect(unitCode in get(unitStore)).toBeFalsy();
    expect(localStorage.getItem(unitCode)).toBeNull();
});

test('units in category', () => {
    expect(Converter.unitsInCategory('volume')).toEqual(
        ['ml', 'l', 'pt', 'tspn', 'tbsp', 'cup']
    );
});