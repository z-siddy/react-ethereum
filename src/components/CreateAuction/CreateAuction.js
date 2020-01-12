import React, { useState } from "react";

export default function CreateAuction(props) {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [photo, setPhoto] = useState(null);

  function submitForm() {
    const ethPrice = window.web3.utils.toWei(price.toString(), "Ether");
    props.method(name, description, ethPrice, photo);
  }

  return (
    <div className="container">
      <form
        onSubmit={event => {
          event.preventDefault();
          submitForm();
        }}
      >
        <div class="form-group">
          <label for="name">
            <h1>Item name</h1>
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Air Jordan 1s"
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="description">
            <h1>Item description</h1>
          </label>
          <textarea class="form-control" id="description" rows="3" onChange={event => setDescription(event.target.value)}></textarea>
        </div>
        <div class="form-group">
          <label for="price">
            <h1>Item price (ETH)</h1>
          </label>
          <input
            type="number"
            class="form-control"
            id="price"
            placeholder="100"
            onChange={event => setPrice(event.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="photo">
            <h1>Item photo URL</h1>
          </label>
          <input
            type="text"
            class="form-control"
            id="photo"
            placeholder="https://randomsite.com/item.jpg"
            onChange={event => setPhoto(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-dark w-100">
          ADD TO AUCTION
        </button>
      </form>
    </div>
  );
}
