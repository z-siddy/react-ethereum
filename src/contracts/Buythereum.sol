pragma solidity ^0.5.0;

contract Buythereum {
  string public name;

  uint public itemCount = 0;
  mapping(uint => Item) public items;

  struct Item {
    uint id;
    string name;
    string description;
    uint price;
    string photo;
    address payable master;
    bool sold;
  }

  event ItemAdded(
    uint id,
    string name,
    string description,
    uint price,
    string photo,
    address payable master,
    bool sold
  );
  
  event ItemSold(
    uint id,
    string name,
    string description,
    uint price,
    string photo,
    address payable master,
    bool sold
  );

  constructor() public {
    name = "Buythereum";
  }

  function addItem(string memory _name, string memory _description, uint _price, string memory _photo) public {
    require(bytes(_name).length > 0);
    require(bytes(_description).length > 0);
    require(_price > 0);
    require(bytes(_photo).length > 0);
    itemCount++;
    items[itemCount] = Item(itemCount, _name, _description, _price, _photo, msg.sender, false);
    emit ItemAdded(itemCount, _name, _description, _price, _photo, msg.sender, false);
  }

  function buyItem(uint id) public payable {
    Item memory item = items[id];
    address payable master = item.master;

    require(item.id > 0 && item.id <= itemCount);
    require(msg.value >= item.price);
    require(!item.sold);
    require(master != msg.sender);

    item.master = msg.sender;
    item.sold = true;
    items[id] = item;

    address(master).transfer(msg.value);

    emit ItemSold(itemCount, item.name, item.description, item.price, item.photo, msg.sender, true);
  }
}
