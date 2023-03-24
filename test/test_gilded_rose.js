var { assert, expect } = require("chai");

var { Shop, Item } = require("../gilded_rose_v3.js");

function createItem(name = "", sellinDays = 0, qualityScore = 0) {
  return new Item(name, sellinDays, qualityScore);
}
function createShopInstance(items = []) {
  return new Shop(items);
}
describe("Aged Brie shop item", function () {
  it("Aged Brie should increase in quality as sellin days descrease by 1", function () {
    const currentSellinDays = 10;
    const currentQualityScore = 20;
    const item = createItem('Aged Brie', currentSellinDays, currentQualityScore);
    const shop = createShopInstance([item]);
    const updatedItems = shop.updateQuality();
    assert.equal(updatedItems[0].quality, currentQualityScore + 1);
    assert.equal(updatedItems[0].sellIn, currentSellinDays - 1); 
  });
  it("Aged Brie maxes out at 50 quality score", function () {
    const currentSellinDays = 10;
    const currentQualityScore = 50;
    const item = createItem('Aged Brie', currentSellinDays, currentQualityScore);
    const shop = createShopInstance([item]);
    assert.equal(shop.items[0].quality, currentQualityScore);
  });
  it("Aged Brie missed sellin day quality still increases by 2", function () {
    const currentSellinDays = -1;
    const currentQualityScore = 30;
    const item = createItem('Aged Brie', currentSellinDays, currentQualityScore);
    const shop = createShopInstance([item]);
    const updatedItems = shop.updateQuality();
    assert.equal(updatedItems[0].quality, currentQualityScore + 2);
    assert.equal(updatedItems[0].sellIn, currentSellinDays - 1);
  });
});

describe("Sulfuras shop item", function () {
  it('Sulfuras never has to be sold', function () {
    const currentSellinDays = 0;
    const currentQualityScore = 30;
    const item = createItem('Sulfuras', currentSellinDays, currentQualityScore);
    const shop = createShopInstance([item]);
    const updatedItems = shop.updateQuality();
    assert.equal(updatedItems[0].quality, currentQualityScore);
    assert.equal(updatedItems[0].sellIn, currentSellinDays);
  });
});

describe("Backstage passes", function () {
  it('Backstage passes increase in quality by 1 when sellin is greater than 10 days', function () {
    const currentSellinDays = 11;
    const currentQualityScore = 30;
    const item = createItem('Backstage passes', currentSellinDays, currentQualityScore);
    const shop = createShopInstance([item]);
    const updatedItems = shop.updateQuality();
    assert.equal(updatedItems[0].quality, currentQualityScore + 1);
  });

  it('Backstage passes increase in quality by 2 when sellin is 10 days', function () {
    const currentSellinDays = 10;
    const currentQualityScore = 30;
    const item = createItem('Backstage passes', currentSellinDays, currentQualityScore);
    const shop = createShopInstance([item]);
    const updatedItems = shop.updateQuality();
    assert.equal(updatedItems[0].quality, currentQualityScore + 2);
  });

  it('Backstage passes increase in quality by 3 when sellin is 5 days or less', function () {
    const currentSellinDays = 5;
    const currentQualityScore = 30;
    const item = createItem('Backstage passes', currentSellinDays, currentQualityScore);
    const shop = createShopInstance([item]);
    const updatedItems = shop.updateQuality();
    assert.equal(updatedItems[0].quality, currentQualityScore + 3);
  });

  it('Backstage passes increase in quality by 3 when sellin in day 0', function () {
    const currentSellinDays = 5;
    const currentQualityScore = 30;
    const item = createItem('Backstage passes', currentSellinDays, currentQualityScore);
    const shop = createShopInstance([item]);
    const updatedItems = shop.updateQuality();
    assert.equal(updatedItems[0].quality, currentQualityScore + 3);
  });

  it('Backstage passes have no quality when sellin in day is after the concert', function () {
    const currentSellinDays = -1;
    const currentQualityScore = 30;
    const item = createItem('Backstage passes', currentSellinDays, currentQualityScore);
    const shop = createShopInstance([item]);
    const updatedItems = shop.updateQuality();
    assert.equal(updatedItems[0].quality, 0);
  });
});

describe("Normal item", function () {
  it("Normal item quality decreased by 1", function () {
    const currentSellinDays = 30;
    const currentQualityScore = 30;
    const item = createItem("Normal item", currentSellinDays, currentQualityScore);
    const shop = createShopInstance([item]);
    const updatedItems = shop.updateQuality();
    assert.equal(updatedItems[0].quality, currentQualityScore - 1);
  });
});

describe("Conjured item", function () {
  it("Conjured item degrades quality value by 2", function () {
    const currentSellinDays = 30;
    const currentQualityScore = 30;
    const item = createItem("Conjured", currentSellinDays, currentQualityScore);
    const shop = createShopInstance([item]);
    const updatedItems = shop.updateQuality();
    assert.equal(updatedItems[0].quality, currentQualityScore - 2);
  });
});