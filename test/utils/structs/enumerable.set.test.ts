/* eslint-disable no-unused-expressions */

import { expect } from "chai";
import { run } from "hardhat";
import { EnumerableSetDemo } from "../../../typechain";
import { deploy, randomAddresses } from "./enumberable.set.data";

let enumerableSetDemo: EnumerableSetDemo;

describe("Utils/Structs/EnumerableSet", function () {
  before(async () => {
    await run("compile");
  });

  beforeEach(async () => {
    ({ enumerableSetDemo } = await deploy());
  });

  it("Should return empty array at the beginning", async function () {
    // No items at start
    await enumerableSetDemo
      .getItems()
      .then((itemsArray: string[]) => expect(itemsArray).to.be.empty);
  });

  it("Should successfully add items", async function () {
    // Add items
    await enumerableSetDemo.addItems(randomAddresses);

    // Confirm added items
    await enumerableSetDemo
      .getItems()
      .then((itemsArray: string[]) =>
        expect(itemsArray).to.deep.equal(randomAddresses)
      );
  });

  it("Should fail to add duplicates", async function () {
    // Add duplicate items
    await expect(
      enumerableSetDemo.addItems(randomAddresses.concat(randomAddresses))
    ).to.be.revertedWith("EnumerableSetDemo: DUPLICATE_ITEM");
  });

  it("Should successfully remove items", async function () {
    // Add items
    await enumerableSetDemo.addItems(randomAddresses);

    // Remove the first added item
    await enumerableSetDemo.removeItems([randomAddresses[0]]);

    // Confirm removed item
    await enumerableSetDemo.getItems().then((itemsArray: string[]) => {
      expect(itemsArray.length).to.be.equal(randomAddresses.length - 1);
      expect(itemsArray).to.not.include(randomAddresses[0]);
    });
  });

  it("Should fail to remove nonexistent item", async function () {
    // Try to remove nonexistent item
    await expect(
      enumerableSetDemo.removeItems([randomAddresses[0]])
    ).to.be.revertedWith("EnumerableSetDemo: NONEXISTENT_ITEM");
  });
});
