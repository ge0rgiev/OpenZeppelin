// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract EnumerableSetDemo {
    using EnumerableSet for EnumerableSet.AddressSet;

    EnumerableSet.AddressSet private items;

    function addItems(address[] memory _items) private {
        uint256 itemsLength = _items.length;
        for (uint256 i = 0; i < itemsLength; ) {
            require(items.add(_items[i]), "EnumerableSetDemo: DUPLICATE_ITEM");
            unchecked {
                ++i;
            }
        }
    }

    function removeItems(address[] memory _items) private {
        uint256 itemsLength = _items.length;
        for (uint256 i = 0; i < itemsLength; ) {
            require(
                items.remove(_items[i]),
                "EnumerableSetDemo: NONEXISTENT_ITEM"
            );
            unchecked {
                ++i;
            }
        }
    }

    function getItems() external view returns(address[] memory) {
        return items.values();
    }
    
}
