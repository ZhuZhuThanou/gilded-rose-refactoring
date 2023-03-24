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
  evaluateQualityBasedOnItemNames(item) {
    if (item.name !== "Aged Brie" &&
      item.name !== "Backstage passes") {
      if (item.quality > 0) {
        if (item.name != "Sulfuras") {
          item.quality = item.quality - 1;
          // take additional quality value off for Conjoured
          if (item.name === "Conjured") {
            item.quality = item.quality - 1;
          }
        }
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
        if (item.name === "Backstage passes") {
          if (item.sellIn < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
        }
      }
    }
  }
  evaluateQualityBasedOnSellInDays(item) {
    if (item.sellIn < 0) {
      if (item.name !== "Aged Brie") {
        if (item.name !== "Backstage passes") {
          if (item.quality > 0) {
            if (item.name !== "Sulfuras") {
              item.quality = item.quality - 1;
            }
          }
        } else {
          item.quality = item.quality - item.quality;
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      this.evaluateQualityBasedOnItemNames(this.items[i]);
      if (this.items[i].name !== "Sulfuras") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      this.evaluateQualityBasedOnSellInDays(this.items[i]);
    }
    return this.items;
  }
}
module.exports = {
  Item,
  Shop,
};
