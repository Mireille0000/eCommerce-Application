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
import createOrGetCart from '../../server-requests/basket-requests/basket-request';

class Basket extends Page {
  constructor(id: string) {
    super(id);
    this.pageWrapper.classList.add('wrapper--bskt');
    this.mainWrapper.classList.add('wrapper-main--bskt');
    this.headerWrapper.classList.add('header-bskt');
  }

  private createProductContainer(
    imgUrl: string,
    imgName: string,
    totalCurrPrice: number,
    countProduct: number,
    price: number
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
    const countTotalProduct = createDivElement('bskt__count-total-product');
    const decreaseTotalProductBtn = createButtonElement('bskt__count-total-product__decrease-btn');
    const decreaseTotalProductBtnImg = createImage(decrease, 'decrease-total-product', 'decrease-total-product-img');
    decreaseTotalProductBtn.appendChild(decreaseTotalProductBtnImg);
    const countTotalProductWrap = createDivElement('bskt__count-product-wrap');
    const countTotalProductInput = createInputElement('bskt__count-product-input', '', [
      { name: 'value', value: `${countProduct}` },
    ]);
    countTotalProductWrap.appendChild(countTotalProductInput);
    const increaseTotalProductBtn = createButtonElement('bskt__count-total-product__increase-btn');
    const increaseTotalProductBtnImg = createImage(increase, 'increase-total-product', 'increase-total-product-img');
    increaseTotalProductBtn.appendChild(increaseTotalProductBtnImg);
    countTotalProduct.append(decreaseTotalProductBtn, countTotalProductWrap, increaseTotalProductBtn);

    const priceWrapOne = createDivElement('bskt__price-wrap-one');
    const priceOne = createSpanElement('bskt__price-one', `${price / 100} €/pc`);
    priceWrapOne.appendChild(priceOne);
    priceWrapProduct.append(priceTotalProduct, countTotalProduct, priceWrapOne);

    // сюда добавь
    priceContProduct.append(priceWrapProduct, priceWrapOne);
    prdctContainer.append(imgWrapProduct, dscrContProduct, priceContProduct);
    return prdctContainer;
  }

  private createProductsContainer(lineItems: LineItem[]) {
    // TODO: добавить описание продукта
    const prdctsContainer = createDivElement('bskt__products-container');
    lineItems.forEach(({ variant, name, totalPrice, quantity, price }) => {
      const imgUrl = variant.images ? variant.images[0].url : '';
      const imgName = name['en-US'];
      const totalCurrPrice = totalPrice.centAmount;
      const countProduct = quantity;
      const currPrice = price.value.centAmount;
      const currProduct = this.createProductContainer(imgUrl, imgName, totalCurrPrice, countProduct, currPrice);
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

  render(cart: Cart) {
    const { lineItems, totalPrice } = cart;
    const { centAmount: totalCost } = totalPrice;
    // totalCost.centAmount

    const productsContainer = this.createProductsContainer(lineItems);
    const totalPriceContainer = this.createTotalPriceContainer(totalCost);

    this.mainWrapper.append(productsContainer, totalPriceContainer);
    this.main.appendChild(this.mainWrapper);
    this.pageWrapper.append(this.main);
    document.body.appendChild(this.pageWrapper);
  }

  renderPage() {
    // new CustomerLoader()
    //     .getCustomerData()
    //     .then((data) => this.render(data))
    //     .catch(console.log);
    // createOrGetCart()
    //   .then((data) => console.log('Данные корзины:', data))
    //   .catch((err) => console.log('Ошибка:', err));

    // this.Cart = createOrGetCart()
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
