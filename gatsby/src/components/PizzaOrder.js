import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

export default function PizzaOrder({
  order = [],
  pizzas,
  removeFromOrder,
  plainImage,
}) {
  return order.map((singleOrder, index) => {
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleOrder.id
    );
    return (
      <MenuItemStyles key={`order-${index}`}>
        <Img fluid={pizza.image.asset.fluid} />
        <h2>{pizza.name}</h2>
        <p>
          {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
          <button
            type="button"
            className="remove"
            title={`Remove ${singleOrder.size} ${pizza.name}`}
            onClick={() => removeFromOrder(index)}
          >
            &times;
          </button>
        </p>
      </MenuItemStyles>
    );
  });
}
