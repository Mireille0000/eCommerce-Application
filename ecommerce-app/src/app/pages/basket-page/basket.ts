import { Cart, LineItem } from '@commercetools/platform-sdk';
import Page from '../../templates/page';
import {
  createButtonElement,
  createDivElement,
  createImage,
  createInputElement,
  createSpanElement,
} from '../../utils/functions';
import decrease from '../../../assets/images/decrease.svg';
import increase from '../../../assets/images/increase.svg';
import createOrGetCart, { editLineItemToCart } from '../../server-requests/basket-requests/basket-request';

interface LineItemCustom {
  id: string;
  name: {
    ['en-US']: string;
  };
  quantity: number;
}

class Basket extends Page {
  DataCart!: Cart;

  customerId!: string;

  clickTimeout: ReturnType<typeof setTimeout> | undefined;

  // CartItems!: LineItem[];
  CartItems!: LineItemCustom[];

  constructor(id: string) {
    super(id);
    this.pageWrapper.classList.add('wrapper--bskt');
    this.mainWrapper.classList.add('wrapper-main--bskt');
    this.headerWrapper.classList.add('header-bskt');
    this.CartItems = [];
  }

  // private addCartItems(cart: Cart) {
  //   cart.lineItems.forEach(({ id, name: currName, quantity }) => {
  //     const lineItem: LineItemCustom = {
  //       id,
  //       name: {
  //         'en-US': currName['en-US'],
  //       },
  //       quantity,
  //     };
  //     console.log('lineItem:', lineItem);
  //     this.CartItems.push(lineItem);
  //   });
  // }

  private addCartItems(cart: Cart) {
    if (!this.CartItems.length) {
      cart.lineItems.forEach(({ id, name: currName, quantity }) => {
        const lineItem: LineItemCustom = {
          id,
          name: {
            'en-US': currName['en-US'],
          },
          quantity,
        };
        this.CartItems.push(lineItem);
      });
    } else {
      this.DataCart.lineItems.forEach(({ quantity }, index) => {
        this.CartItems[index].quantity = quantity;
      });
    }
  }

  private updateTemplate(cart: Cart) {
    const totalPriceItems = Array.from(document.querySelectorAll('.bskt__price-total'));
    const totalCost = document.querySelector('.bskt__total-price-content') as HTMLElement;
    const { centAmount } = cart.totalPrice;
    totalCost.textContent = `${centAmount / 100} €`;

    totalPriceItems.forEach((totalPriceItem, index) => {
      const elemPrice = totalPriceItem;
      const currPrice = cart.lineItems[index].totalPrice.centAmount;
      elemPrice.textContent = `${currPrice / 100} €`;
    });
  }

  private editItemCount(index: number, editCount: number, event: Event) {
    event.preventDefault();
    if (editCount > 0) {
      editLineItemToCart(this.DataCart, editCount, index)
        .then((dataCart) => {
          console.log('Обновились данные:', dataCart);
          this.DataCart = dataCart;
          this.addCartItems(dataCart);
          this.updateTemplate(dataCart);
        })
        .catch((err) => console.log('Провал при обновлении данных', err));
    }
  }

  private handleButtonClick(index: number, editCount: number, event: Event) {
    event.preventDefault();

    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
    }

    this.clickTimeout = setTimeout(() => {
      this.editItemCount(index, editCount, event);
    }, 500);
  }

  private editOneItem(countInput: HTMLInputElement, index: number, numbEdit: number, event: Event) {
    const editInput = countInput;
    const { quantity } = this.CartItems[index];
    const quantityCount = quantity + numbEdit;
    console.log('quantityCountOne:', quantityCount);
    if (!(numbEdit < 0 && Number(editInput.value) === 1)) {
      this.CartItems[index].quantity = quantityCount;
      editInput.value = `${quantityCount}`;
      this.handleButtonClick(index, quantityCount, event);
    }
  }

  private addOneItem(countInput: HTMLInputElement, index: number, event: Event) {
    const numbEdit = 1;
    // console.log('addOneIndx:', index);
    this.editOneItem(countInput, index, numbEdit, event);
  }

  private removeOneItem(countInput: HTMLInputElement, index: number, event: Event) {
    const numbEdit = -1;
    // console.log('removeOneIndx:', index);
    this.editOneItem(countInput, index, numbEdit, event);
  }

  private editInputItem(countInput: HTMLInputElement, index: number, event: Event) {
    const editCountItem = countInput;
    const editCountValue = Number(countInput.value);
    if (editCountValue !== 0) {
      this.editItemCount(index, editCountValue, event);
    } else {
      editCountItem.value = `${this.CartItems[index].quantity}`;
    }
  }

  private createProductContainer(
    imgUrl: string,
    imgName: string,
    totalCurrPrice: number,
    countProduct: number,
    price: number,
    index: number
  ) {
    const prdctContainer = createDivElement('bskt__product-container');

    const imgWrapProduct = createDivElement('bskt__img-wrap-product');
    const imgProduct = createImage(imgUrl, imgName, 'img-product');
    imgWrapProduct.appendChild(imgProduct);

    const dscrContProduct = createDivElement('bskt__dscr-container-product');
    const nameWrapProduct = createDivElement('bskt__name-wrap-product');
    const nameProduct = createSpanElement('bskt__name-product', imgName);
    nameWrapProduct.appendChild(nameProduct);
    const dscrWrapProduct = createDivElement('bskt__dscr-wrap-product');
    const dscrProduct = createSpanElement('bskt__dscr-product');
    dscrWrapProduct.appendChild(dscrProduct);
    dscrContProduct.append(nameWrapProduct, dscrWrapProduct);

    const priceContProduct = createDivElement('bskt__price-cont-product');
    const priceWrapProduct = createDivElement('bskt__price-wrap-product');
    const priceTotalProduct = createDivElement('bskt__price-total-product');
    const priceTotalContent = createSpanElement('bskt__price-total', `${totalCurrPrice / 100} €`);
    priceTotalProduct.appendChild(priceTotalContent);
    const countTotalProductWrap = createDivElement('bskt__count-product-wrap');
    const countTotalProductInput = createInputElement('bskt__count-product-input', '', [
      { name: 'value', value: `${countProduct}` },
      { name: 'type', value: 'number' },
    ]);
    countTotalProductInput.addEventListener('blur', this.editInputItem.bind(this, countTotalProductInput, index));
    countTotalProductWrap.appendChild(countTotalProductInput);
    const countTotalProduct = createDivElement('bskt__count-total-product');
    const decreaseTotalProductBtn = createButtonElement('bskt__count-total-product__decrease-btn');
    decreaseTotalProductBtn.addEventListener('click', this.removeOneItem.bind(this, countTotalProductInput, index));
    const decreaseTotalProductBtnImg = createImage(decrease, 'decrease-total-product', 'decrease-total-product-img');
    decreaseTotalProductBtn.appendChild(decreaseTotalProductBtnImg);
    const increaseTotalProductBtn = createButtonElement('bskt__count-total-product__increase-btn');
    increaseTotalProductBtn.addEventListener('click', this.addOneItem.bind(this, countTotalProductInput, index));
    const increaseTotalProductBtnImg = createImage(increase, 'increase-total-product', 'increase-total-product-img');
    increaseTotalProductBtn.appendChild(increaseTotalProductBtnImg);
    countTotalProduct.append(decreaseTotalProductBtn, countTotalProductWrap, increaseTotalProductBtn);

    const priceWrapOne = createDivElement('bskt__price-wrap-one');
    const priceOne = createSpanElement('bskt__price-one', `${price / 100} €/pc`);
    priceWrapOne.appendChild(priceOne);
    priceWrapProduct.append(priceTotalProduct, countTotalProduct, priceWrapOne);

    priceContProduct.append(priceWrapProduct, priceWrapOne);
    prdctContainer.append(imgWrapProduct, dscrContProduct, priceContProduct);
    return prdctContainer;
  }

  private createProductsContainer(lineItems: LineItem[]) {
    // TODO: добавить описание продукта
    const prdctsContainer = createDivElement('bskt__products-container');
    lineItems.forEach(({ variant, name, totalPrice, quantity, price }, index) => {
      const imgUrl = variant.images ? variant.images[0].url : '';
      const imgName = name['en-US'];
      const totalCurrPrice = totalPrice.centAmount;
      const countProduct = quantity;
      const currPrice = price.value.centAmount;
      const currProduct = this.createProductContainer(imgUrl, imgName, totalCurrPrice, countProduct, currPrice, index);
      prdctsContainer.appendChild(currProduct);
    });
    return prdctsContainer;
  }

  private createTotalPriceContainer(totalCost: number) {
    const totalPriceContainer = createDivElement('bskt__total-price-container');

    const titleTotalPriceWrap = createDivElement('bskt__total-price-title-wrap');
    const titleTotalPrice = createSpanElement('bskt__total-price-title', 'Total cost:');
    titleTotalPriceWrap.appendChild(titleTotalPrice);
    const totalPriceCntntWrap = createDivElement('bskt__total-price-content-wrap');
    const totalPriceCntnt = createDivElement('bskt__total-price-content', `${totalCost / 100} €`);
    totalPriceCntntWrap.appendChild(totalPriceCntnt);

    totalPriceContainer.append(titleTotalPriceWrap, totalPriceCntntWrap);
    return totalPriceContainer;
  }

  render(cart: { cart: Cart; customerId: string }) {
    this.DataCart = cart.cart;
    this.customerId = cart.customerId;
    console.log('this.customerId:', this.customerId);
    this.addCartItems(cart.cart);
    const { lineItems, totalPrice } = cart.cart;
    const { centAmount: totalCost } = totalPrice;

    const productsContainer = this.createProductsContainer(lineItems);
    const totalPriceContainer = this.createTotalPriceContainer(totalCost);

    this.mainWrapper.append(productsContainer, totalPriceContainer);
    this.main.appendChild(this.mainWrapper);
    this.pageWrapper.append(this.main);
    document.body.appendChild(this.pageWrapper);
  }

  renderPage() {
    createOrGetCart()
      .then((cart) => {
        console.log('Данные корзины:', cart);
        this.render(cart);
      })
      .catch((err) => console.log('Ошибка получения корзины:', err));

    return this.pageWrapper;
  }
}

export default Basket;
