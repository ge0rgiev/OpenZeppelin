// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract EnumerableSetDemo {
    using EnumerableSet for EnumerableSet.AddressSet;

    EnumerableSet.AddressSet private addressSet;

    function addItems(address[] memory _items) external {
        uint256 itemsLength = _items.length;
        for (uint256 i = 0; i < itemsLength; ) {
            require(
                addressSet.add(_items[i]),
                "EnumerableSetDemo: DUPLICATE_ITEM"
            );
            unchecked { ++i; }
        }
    }

    function removeItems(address[] memory _items) external {
        uint256 itemsLength = _items.length;
        for (uint256 i = 0; i < itemsLength; ) {
            require(
                addressSet.remove(_items[i]),
                "EnumerableSetDemo: NONEXISTENT_ITEM"
            );
            unchecked { ++i; }
        }
    }

    function getItems() external view returns(address[] memory) {
        return addressSet.values();
    }
    
}
