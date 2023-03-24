class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  evaluate() {
    switch(this.name) {
      case 'Aged Brie':
        this.quality++;
        this.quality = this.sellIn < 0 ? this.quality + 1 : this.quality;
        this.sellIn = this.sellIn - 1;
        break;
      case 'Sulfuras':
        // no change to sell in or quality
        break;    
      case 'Backstage passes': 
        this.quality = this.sellIn > 10 ? this.quality + 1 : this.quality;
        this.quality = this.sellIn <= 10 && this.sellIn > 5 ? this.quality + 2 : this.quality;
        this.quality = this.sellIn <= 5 && this.sellIn >= 0 ? this.quality + 3 : this.quality;
        this.quality = this.sellIn < 0 ? 0 : this.quality;
        this.sellIn = this.sellIn - 1;
        break;
      case 'Conjured':
        this.quality = this.quality > 0 ? this.quality - 2 : this.quality;
        this.sellIn = this.sellIn - 1; 
        break;  
      default:
        this.quality = this.quality > 0 ? this.quality - 1 : 0;
        this.sellIn  = this.sellIn > 0 ? this.sellIn -1: 0;
    }
    this.quality = this.quality > 50 ? 50 : this.quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].evaluate();
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
