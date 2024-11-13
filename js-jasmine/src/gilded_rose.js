class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      if (item.name === "Sulfuras, Hand of Ragnaros") continue;

      if (item.name.startsWith("Conjured")) {
        this.updateConjuredItem(item);
      } else if (item.name === "Aged Brie") {
        this.updateAgedBrie(item);
      } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        this.updateBackstagePass(item);
      } else {
        this.updateStandardItem(item);
      }

      item.sellIn -= 1;
    }
    return this.items;
  }

  updateAgedBrie(item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
  }

  updateBackstagePass(item) {
    if (item.sellIn > 10) {
      item.quality += 1;
    } else if (item.sellIn > 5) {
      item.quality += 2;
    } else if (item.sellIn > 0) {
      item.quality += 3;
    } else {
      item.quality = 0;
    }
    if (item.quality > 50) {
      item.quality = 50;
    }
  }

  updateConjuredItem(item) {
    item.quality = Math.max(0, item.quality - 2);
  }

  updateStandardItem(item) {
    item.quality = item.sellIn <= 0 ? Math.max(0, item.quality - 2) : Math.max(0, item.quality - 1);
  }
}

module.exports = {
  Item,
  Shop
};
