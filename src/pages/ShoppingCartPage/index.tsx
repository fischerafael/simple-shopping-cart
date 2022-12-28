import React, { useState } from "react";

interface IBook {
  id: number;
  title: string;
  price: number;
}

interface IShoppingCartItem {
  product: IBook;
  quantity: number;
}

const books: IBook[] = [
  { id: 1, title: "Pragmatic Programmer", price: 10.99 },
  { id: 2, title: "Clean Code", price: 8.99 },
  { id: 3, title: "Clean Architecture", price: 17.99 },
];

export const ShoppingCartPage = () => {
  const [shoppingCart, setShoppingCart] = useState<IShoppingCartItem[]>([]);

  const handleAddToCart = (id: number) => {
    const book = books.find((book) => book.id === id);
    const alreadyInShoppingCart = shoppingCart.find(
      (item) => item.product.id === id
    );
    // if book is in the shopping cart
    if (alreadyInShoppingCart) {
      const newShoppingCart: IShoppingCartItem[] = shoppingCart.map((item) => {
        if (item.product.id === id)
          ({
            ...item,
            quantity: item.quantity++,
          });
        return item;
      });
      setShoppingCart(newShoppingCart);
      return;
    }
    // if book is not already in the shopping cart
    const cartItem: IShoppingCartItem = {
      product: book!,
      quantity: 1,
    };
    const newShoppingCart: IShoppingCartItem[] = [...shoppingCart, cartItem];
    setShoppingCart(newShoppingCart);
  };

  const handleRemoveFromCart = (id: number) => {
    const alreadyInShoppingCart = shoppingCart.find(
      (item) => item.product.id === id
    );

    if (alreadyInShoppingCart!.quantity > 1) {
      const newShoppingCart: IShoppingCartItem[] = shoppingCart.map((item) => {
        if (item.product.id === id)
          ({
            ...item,
            quantity: item.quantity--,
          });
        return item;
      });
      setShoppingCart(newShoppingCart);
      return;
    }

    // if there is only one item with the id in the cart
    const newShoppingCart: IShoppingCartItem[] = shoppingCart.filter(
      (item) => item.product.id !== id
    );
    setShoppingCart(newShoppingCart);
  };

  const handleCleanCart = () => {
    setShoppingCart([]);
  };

  const totalCart = shoppingCart.reduce((total, current) => {
    return total + current.product.price * current.quantity;
  }, 0);

  return (
    <div>
      <h2>Books Available</h2>
      <ul>
        {books.map((book) => (
          <li>
            <p>{book.title}</p>
            <p>{book.price}</p>
            <button onClick={() => handleAddToCart(book.id)}>
              Add To Cart
            </button>
          </li>
        ))}
      </ul>
      <h2>Shopping Cart ({totalCart})</h2>
      <button onClick={handleCleanCart}>Clean Cart</button>
      <ul>
        {shoppingCart.map((item) => (
          <li>
            <p>Book: {item.product.title}</p>
            <p>Price: {item.product.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: {item.quantity * item.product.price}</p>
            <button onClick={() => handleRemoveFromCart(item.product.id)}>
              Remove From Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
