import Bowerman from '../js/Bowerman';
import Swordsman from '../js/Swordsman';
import Magician from '../js/Magician';
import Undead from '../js/Undead';
import Zombie from '../js/Zombie';
import Daemon from '../js/Daemon';
import Character from '../js/Character';

test.each([
  [Bowerman, 'Bowman', 25, 25],
  [Swordsman, 'Swordsman', 40, 10],
  [Magician, 'Magician', 10, 40],
  [Undead, 'Undead', 25, 25],
  [Zombie, 'Zombie', 40, 10],
  [Daemon, 'Daemon', 10, 40],
])('should create %s', (Class, type, attack, defence) => {
  const character = new Class('Test');
  expect(character).toEqual({
    name: 'Test', type, health: 100, level: 1, attack, defence,
  });
});

test('should throw error for short name', () => {
  expect(() => new Bowerman('A')).toThrow('min 2 max 10');
});

test('should throw error for long name', () => {
  expect(() => new Bowerman('length of the name')).toThrow('min 2 max 10');
});

test('should throw error for invalid type', () => {
  expect(() => new Character('Test', 'Invalid')).toThrow('incorrect type');
});

describe('levelUp method', () => {
  test('should increase level, attack, defence and restore health', () => {
    const character = new Bowerman('Test');
    character.health = 50;
    character.level = 1;
    character.attack = 25;
    character.defence = 25;

    character.levelUp();

    expect(character.level).toBe(2);
    expect(character.attack).toBe(30);
    expect(character.defence).toBe(30);
    expect(character.health).toBe(100);
  });

  test('should throw error if health = 0', () => {
    const character = new Bowerman('Test');
    character.health = 0;

    expect(() => character.levelUp()).toThrow('you cant level up a dead character');
  });

  test('should throw error if health < 0', () => {
    const character = new Bowerman('Test');
    character.health = -10;

    expect(() => character.levelUp()).toThrow('you cant level up a dead character');
  });
});

describe('damage method', () => {
  test('should reduce health correctly with defence', () => {
    const character = new Bowerman('Test');
    character.health = 100;
    character.defence = 25;

    character.damage(40);

    expect(character.health).toBe(70);
  });

  test('should not reduce health below 0', () => {
    const character = new Bowerman('Test');
    character.health = 20;
    character.defence = 25;

    character.damage(40);

    expect(character.health).toBe(0);
  });

  test('should do nothing if health already 0', () => {
    const character = new Bowerman('Test');
    character.health = 0;
    character.defence = 25;

    character.damage(40);

    expect(character.health).toBe(0);
  });

  test('should work with different defence values', () => {
    const character = new Magician('Test');
    character.health = 100;
    character.defence = 40;

    character.damage(50);

    expect(character.health).toBe(70);
  });
});
