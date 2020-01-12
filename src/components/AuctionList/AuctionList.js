import React from "react";
import "./AuctionList.css";

export default function AuctionList(props) {
  return (
    <div className="item-container">
      {props.items ? props.items.map(item => {
        return (
          <div class="product">
            <img src={item.photo} alt="Auction item" />
            <h2 class="header">{item.name}</h2>
            <p class="description">{item.description}</p>
            {!item.sold ? (
              <>
                <button
                  type="submit"
                  name={item.id}
                  value={item.price}
                  onClick={event => {
                    props.method(item.id, item.price);
                  }}
                  className="btn"
                >
                  BUY
                </button>
                <div class="quickview">
                  {window.web3.utils.fromWei(item.price.toString(), "Ether")}{" "}
                  ETH
                </div>
              </>
            ) : (
              <div class="quickview" style={{fontSize: '12px'}}>
                This item was bought by: {item.master}
              </div>
            )}
          </div>
        );
      }) : <h1>There are no auction items!</h1>}
    </div>
  );
}
