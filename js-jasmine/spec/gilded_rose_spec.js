const { Shop, Item } = require('../src/gilded_rose.js');

describe("Gilded Rose", function () {

  it("should decrease quality by 1 for standard items before sellIn date", () => {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(19);
    expect(items[0].sellIn).toBe(9);
  });

  it("should increase quality by 1 for 'Aged Brie' before sellIn date", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
    expect(items[0].sellIn).toBe(1);
  });

  it("should not change quality of 'Sulfuras'", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(0);
  });

  it("should increase quality by 2 for 'Backstage passes' with 10 days or less", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 45)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(47);
    expect(items[0].sellIn).toBe(9);
  });

  it("should increase quality by 3 for 'Backstage passes' with 5 days or less", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 45)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(48);
    expect(items[0].sellIn).toBe(4);
  });

  it("should drop quality to 0 for 'Backstage passes' after the concert", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  it("should decrease quality twice as fast after expiration", () => {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
    expect(items[0].sellIn).toBe(-1);
  });

  it("should decrease quality twice as fast for 'Conjured' items", () => {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
    expect(items[0].sellIn).toBe(2);
  });

  it("should not allow quality to exceed 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(1);
  });
});
