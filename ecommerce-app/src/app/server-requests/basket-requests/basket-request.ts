import { Cart } from '@commercetools/platform-sdk';
import { apiRoot } from '../registration-form-request/clients';
import CustomerLoader from '../personal-info-request/getPersonalData';

const getProductByKey = async (productKey: string) => {
  try {
    const response = await apiRoot.products().withKey({ key: productKey }).get().execute();
    return response.body.id;
  } catch (err) {
    console.log('Такого товара не существует');
    throw new Error(`${err}`);
  }
};

const getCartByCustomerById = async (customerId: string) => {
  try {
    const response = await apiRoot
      .carts()
      .get({
        queryArgs: {
          where: `customerId="${customerId}" AND cartState="Active"`,
        },
      })
      .execute();

    return response.body.results[0];
  } catch {
    console.log('Корзины пока ещё нет');
    return null;
  }
};

const createCart = async (customerId: string) => {
  try {
    const response = await apiRoot
      .carts()
      .post({
        body: {
          currency: 'EUR',
          customerId,
        },
      })
      .execute();

    // console.log('КОРЗИНА СОЗДАНА');
    return response.body;
  } catch (error) {
    console.log('ОШИБКА ПРИ СОЗДАНИИ КОРЗИНЫ:', error);
    // return null;
    throw new Error(`${error}`);
  }
};

// const createOrGetCart = async (customerId: string) => {
// const createOrGetCart = () => {
//   // try {
//   return new Promise(() => {
//     return new CustomerLoader()
//       .getCustomerData()
//       .then(async (data) => {
//         try {
//           const { id: customerId } = data;
//           const existingCart = await getCartByCustomerById(customerId);

//           if (existingCart) {
//             console.log('КОРЗИНА УЖЕ СУЩЕСТВУЕТ:', existingCart);
//             return existingCart;
//           }
//           const newCart = await createCart(customerId);
//           console.log('НОВАЯ КОРЗИНА СОЗДАНА', newCart);
//           return newCart;
//         } catch (err) {
//           console.log('ОШИБКА ПРИ СОЗДАНИИ КОРЗИНЫ:', err);
//           return null;
//         }
//       })
//       .catch(() => null);
//   });
// };
const createOrGetCart = async () => {
  try {
    const data = await new CustomerLoader().getCustomerData();
    const { id: customerId }: { id: string } = data;

    const existingCart = await getCartByCustomerById(customerId);
    if (existingCart) {
      console.log('КОРЗИНА УЖЕ СУЩЕСТВУЕТ:', existingCart);
      return { cart: existingCart, customerId };
    }

    const newCart = await createCart(customerId);
    // if (newCart === null) {
    //   return new Error
    // }
    console.log('НОВАЯ КОРЗИНА СОЗДАНА', newCart);
    return { cart: newCart, customerId };
  } catch (err) {
    console.log('ОШИБКА ПРИ СОЗДАНИИ КОРЗИНЫ:', err);
    // return null;
    throw new Error(`${err}`);
  }
};

export default createOrGetCart;

// new CustomerLoader()
//   .getCustomerData()
//   .then(async (data) => {
//     try {
//       const { id: customerId } = data;
//       const existingCart = await getCartByCustomerById(customerId);

//       if (existingCart) {
//         console.log('КОРЗИНА УЖЕ СУЩЕСТВУЕТ:', existingCart);
//         return existingCart;
//       }
//       const newCart = await createCart(customerId);
//       console.log('НОВАЯ КОРЗИНА СОЗДАНА', newCart);
//       return newCart;
//     } catch (err) {
//       console.log('ОШИБКА ПРИ СОЗДАНИИ КОРЗИНЫ:', err);
//       return null;
//     }
//   })
//   .catch(() => null);
// const existingCart = await getCartByCustomerById(customerId);

// if (existingCart) {
//   console.log('КОРЗИНА УЖЕ СУЩЕСТВУЕТ:', existingCart);
//   return existingCart;
// }

// const newCart = await createCart(customerId);
// console.log('НОВАЯ КОРЗИНА СОЗДАНА', newCart);
// return newCart;
// } catch (err) {
//   console.log('ОШИБКА ПРИ СОЗДАНИИ КОРЗИНЫ:', err);
//   return null;
// }
// };

// export default createOrGetCart;

export const editLineItemToCart = async (cart: Cart, quantity: number, index: number) => {
  try {
    const { version, lineItems } = cart;
    const { id } = lineItems[index];
    // const productId = await getProductByKey(productKey);
    const response = await apiRoot
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: {
          version,
          actions: [
            {
              // action: 'addLineItem',
              action: 'changeLineItemQuantity',
              // productId,
              // variantId: 1,
              lineItemId: id,
              quantity,
            },
          ],
        },
      })
      .execute();

    return response.body;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const addLineItemToCart = async (cart: Cart, quantity: number) => {
  try {
    const { version } = cart;
    // const { id } = lineItems[index];
    const productKey = 'staff-5';
    const productId = await getProductByKey(productKey);
    const response = await apiRoot
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addLineItem',
              // action: 'changeLineItemQuantity',
              productId,
              variantId: 1,
              // lineItemId: id,
              quantity,
            },
          ],
        },
      })
      .execute();

    return response.body;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
