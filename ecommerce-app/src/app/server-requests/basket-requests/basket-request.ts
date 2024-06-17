import { Cart, CartUpdateAction } from '@commercetools/platform-sdk';
import { apiRoot } from '../registration-form-request/clients';
import CustomerLoader from '../personal-info-request/getPersonalData';

export const getOneProductByKey = async (productKey: string) => {
  try {
    const response = await apiRoot.products().withKey({ key: productKey }).get().execute();
    return response.body;
  } catch (err) {
    throw new Error(`${err}`);
  }
};
const getProductByKey = async (productKey: string) => {
  try {
    const response = await apiRoot.products().withKey({ key: productKey }).get().execute();
    return response.body.id;
  } catch (err) {
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

    return response.body;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getCartById = async () => {
  try {
    const cartIdSession = sessionStorage.getItem('cartDataAnon');
    let cartId = '';
    if (cartIdSession) {
      cartId = JSON.parse(cartIdSession).id;
    }
    const response = await apiRoot.carts().withId({ ID: cartId }).get().execute();

    return response.body;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const createOrGetCart = async () => {
  try {
    if (localStorage.getItem('data')) {
      const data = await new CustomerLoader().getCustomerData();
      // console.log('DATA_USER:', data);
      const { id: customerId }: { id: string } = data;

      const existingCart = await getCartByCustomerById(customerId);
      if (existingCart) {
        // console.log('КОРЗИНА УЖЕ СУЩЕСТВУЕТ:', existingCart);
        return { cart: existingCart, customerId };
      }

      const newCart = await createCart(customerId);
      // console.log('НОВАЯ КОРЗИНА СОЗДАНА', newCart);
      return { cart: newCart, customerId };
    }
    const dataCart = await getCartById();
    return { cart: dataCart, customerId: '' };
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export default createOrGetCart;

export const editLineItemToCart = async (cart: Cart, quantity: number, index: number) => {
  try {
    const { version, lineItems } = cart;
    const { id } = lineItems[index];
    const response = await apiRoot
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'changeLineItemQuantity',
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

export const removeAllLineItemsFromCart = async (cart: Cart) => {
  try {
    const { version, lineItems } = cart;

    const actions: CartUpdateAction[] = lineItems.map((lineItem) => ({
      action: 'removeLineItem',
      lineItemId: lineItem.id,
    }));

    const response = await apiRoot
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: {
          version,
          actions,
        },
      })
      .execute();

    return response.body;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const addLineItemToCart = async (cart: Cart, productKey: string, quantity: number) => {
  try {
    const { version } = cart;
    // const productKey = 'staff-2';
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
              productId,
              variantId: 1,
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

export const addDiscountCode = async (code: string, cart: Cart) => {
  try {
    const { version, id } = cart;
    const response = await apiRoot
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addDiscountCode',
              code,
            },
          ],
        },
      })
      .execute();

    return response.body;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const removeDiscountCode = async (code: string, cart: Cart) => {
  try {
    const { version, id } = cart;
    const response = await apiRoot
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'removeDiscountCode',
              discountCode: {
                typeId: 'discount-code',
                id: 'f05a57eb-03dc-46b0-8872-08cf76b92999',
              },
            },
          ],
        },
      })
      .execute();

    return response.body;
  } catch (err) {
    throw new Error(`${err}`);
  }
};
