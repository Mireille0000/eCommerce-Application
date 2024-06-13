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
import createOrGetCart, {
  editLineItemToCart,
  removeAllLineItemsFromCart,
} from '../../server-requests/basket-requests/basket-request';
import deleteProduct from '../../../assets/images/delete_address_copy.svg';
import { createMsgRegAcc } from '../registration-page/utils-registration/functions-registration';

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
      this.DataCart.lineItems.forEach(({ quantity, id }, index) => {
        for (let i = 0; i < this.CartItems.length; i += 1) {
          if (this.CartItems[i].id === id) {
            this.CartItems[index].quantity = quantity;
            break;
          }
        }
        // this.CartItems[index].quantity = quantity;
      });
    }
  }

  private updateTemplate(cart: Cart) {
    const totalPriceItems = Array.from(document.querySelectorAll('.bskt__price-total'));
    const totalCost = document.querySelector('.bskt__total-price-content') as HTMLElement;
    const { centAmount } = cart.totalPrice;
    let isDiscountCurr = false;
    let currPriceUpdate = 0;

    totalPriceItems.forEach((totalPriceItem, index) => {
      const { variant, totalPrice } = cart.lineItems[index];
      const isDiscount = variant.attributes ? variant.attributes[4].value : false;
      if (!isDiscountCurr) {
        isDiscountCurr = isDiscount;
      }
      const elemPrice = totalPriceItem;
      const currPrice = isDiscount ? totalPrice.centAmount * 0.7 : totalPrice.centAmount;
      currPriceUpdate += currPrice;
      elemPrice.textContent = `${currPrice / 100} €`;
    });

    if (isDiscountCurr) {
      totalCost.textContent = `${currPriceUpdate / 100} €`;
    } else {
      totalCost.textContent = `${centAmount / 100} €`;
    }
  }

  private createTemplateEmptyCart() {
    const containerEmptyCart = createDivElement('bskt__empty-cart-container');
    const emptyTitleWrap = createDivElement('bskt__empty-title-wrap');
    const emptyTitle = createSpanElement('bskt__empty-title', 'Cart is empty');
    emptyTitleWrap.appendChild(emptyTitle);

    const emptyDescrWrap = createDivElement('bskt__empty-descr-wrap');
    const emptyDescr = createSpanElement('bskt__empty-descr', 'Go to the catalog page to find everything you need');
    emptyDescrWrap.appendChild(emptyDescr);

    const emptyGoCatalogBtn = createButtonElement('bskt__empty-go-catalog-btn', 'Start shopping');
    emptyGoCatalogBtn.addEventListener('click', this.GoCatalogBtn);

    containerEmptyCart.append(emptyTitleWrap, emptyDescrWrap, emptyGoCatalogBtn);
    return containerEmptyCart;
  }

  private updateSuccesEditItemCount(cart: Cart) {
    const itemsContainer = document.querySelector('.bskt__products-container');
    const totalCostContainer = document.querySelector('.bskt__total-price-container');
    const templateEmptycart = this.createTemplateEmptyCart();

    this.DataCart = cart;
    this.addCartItems(cart);
    this.updateTemplate(cart);
    if (!this.DataCart.lineItems.length) {
      itemsContainer?.remove();
      totalCostContainer?.remove();
      this.mainWrapper.appendChild(templateEmptycart);
    }
  }

  private editItemCount(index: number, editCount: number, event: Event) {
    event.preventDefault();
    let itemIndex = index;
    const itemId = this.CartItems[index].id;
    for (let i = 0; i < this.DataCart.lineItems.length; i += 1) {
      if (this.DataCart.lineItems[i].id === itemId) {
        itemIndex = i;
      }
    }
    console.log('itemIndex:', itemIndex);
    editLineItemToCart(this.DataCart, editCount, itemIndex)
      .then((dataCart) => {
        console.log('Обновились данные:', dataCart);
        this.updateSuccesEditItemCount(dataCart);
      })
      .catch((err) => console.log('Провал при обновлении данных', err));
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
    this.editOneItem(countInput, index, numbEdit, event);
  }

  private removeOneItem(countInput: HTMLInputElement, index: number, event: Event) {
    const numbEdit = -1;
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

  private deleteProduct(productContainer: HTMLDivElement, index: number, event: Event) {
    this.editItemCount(index, 0, event);
    productContainer.remove();
    const descrMsg = ['Success!', 'Product removed from cart'];
    createMsgRegAcc(descrMsg);
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

    const wrapDeleteProductBtn = createDivElement('bskt__delete-product-wrap');
    const deleteProductBtn = createButtonElement('bskt__delete-product-btn');
    deleteProductBtn.addEventListener('click', this.deleteProduct.bind(this, prdctContainer, index));
    const imageBtnDelete = createImage(deleteProduct, 'delete-current-product', 'delete-current-product-img');
    deleteProductBtn.appendChild(imageBtnDelete);
    wrapDeleteProductBtn.appendChild(deleteProductBtn);

    priceContProduct.append(priceWrapProduct, priceWrapOne, wrapDeleteProductBtn);
    prdctContainer.append(imgWrapProduct, dscrContProduct, priceContProduct);
    return prdctContainer;
  }

  private GoCatalogBtn(event: Event) {
    event.preventDefault();
    window.location.hash = 'catalog-product-page';
    // new CatalogProductPage('catalog-product-page').renderPage();
    // this.pageWrapper.remove();
  }

  private handlerCancelDeleteItems(containerDelete: HTMLDivElement, event: Event) {
    event.preventDefault();
    containerDelete.remove();
  }

  private deleteTemplateProducts(containerDelete: HTMLDivElement) {
    const itemsContainer = document.querySelector('.bskt__products-container');
    const totalCostContainer = document.querySelector('.bskt__total-price-container');
    itemsContainer?.remove();
    totalCostContainer?.remove();
    containerDelete.remove();

    const templateEmptycart = this.createTemplateEmptyCart();
    this.mainWrapper.appendChild(templateEmptycart);
  }

  private handleDeleteAllItems(containerDelete: HTMLDivElement, event: Event) {
    event.preventDefault();
    removeAllLineItemsFromCart(this.DataCart)
      .then(() => this.deleteTemplateProducts(containerDelete))
      .catch();
  }

  private createMsgClearCart() {
    const windowconfirmDelete = createDivElement('bskt__window-confirm-delete');
    const bsktDeleteWrap = createDivElement('bskt__delete-wrap');
    const cancelDeleteBtn = createButtonElement('bskt__cancel-delete-btn');
    cancelDeleteBtn.addEventListener('click', this.handlerCancelDeleteItems.bind(this, windowconfirmDelete));
    const confirmDeleteWrap = createDivElement('bskt__confirm-delete-wrap');
    const titleConfirmDelete = createDivElement('bskt__confirm-delete-title', 'Remove products');
    const descrConfirmDelete = createDivElement(
      'bskt__confirm-delete-descr',
      'Are you sure you want to remove all items from your cart? It will be impossible to cancel this action.'
    );

    const confirmDelete = createDivElement('bskt__confirm-delete');
    const confirmDeleteBtn = createButtonElement('bskt__confirm-delete-btn', 'Delete');
    confirmDelete.addEventListener('click', this.handleDeleteAllItems.bind(this, windowconfirmDelete));
    confirmDelete.appendChild(confirmDeleteBtn);
    confirmDeleteWrap.append(titleConfirmDelete, descrConfirmDelete, confirmDelete);

    bsktDeleteWrap.append(cancelDeleteBtn, confirmDeleteWrap);
    windowconfirmDelete.append(bsktDeleteWrap);
    document.body.appendChild(windowconfirmDelete);
  }

  private handleClearCart(event: Event) {
    event.preventDefault();
    this.createMsgClearCart();
  }

  private createProductsContainer(lineItems: LineItem[]) {
    // TODO: добавить описание продукта
    const prdctsContainer = createDivElement('bskt__products-container');
    const deleteAllProducts = createDivElement('bskt__delete-products');
    const deleteAllProductsBtn = createButtonElement('bskt__delete-products-btn', 'Clear Shopping Cart');
    deleteAllProductsBtn.addEventListener('click', this.handleClearCart.bind(this));
    deleteAllProducts.appendChild(deleteAllProductsBtn);
    prdctsContainer.appendChild(deleteAllProducts);

    lineItems.forEach(({ variant, name, totalPrice, quantity, price }, index) => {
      const { attributes } = variant;
      const isDiscount: boolean = attributes ? attributes[4].value : false;
      const imgUrl = variant.images ? variant.images[0].url : '';
      const imgName = name['en-US'];
      const totalCurrPrice = isDiscount ? totalPrice.centAmount * 0.7 : totalPrice.centAmount;
      const countProduct = quantity;
      const currPrice = isDiscount ? price.value.centAmount * 0.7 : price.value.centAmount;
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

  private renderBasketFromAnonim() {
    window.location.hash = 'basket-page';
    const templateEmptycart = this.createTemplateEmptyCart();
    this.mainWrapper.appendChild(templateEmptycart);
    this.main.appendChild(this.mainWrapper);
    this.pageWrapper.append(this.main);
    document.body.appendChild(this.pageWrapper);
  }

  private getTotalCost(cart: Cart) {
    const { lineItems } = cart;
    let totalCost = 0;
    lineItems.forEach(({ variant, totalPrice }) => {
      const { attributes } = variant;
      const { centAmount } = totalPrice;
      const isDiscount: boolean = attributes ? attributes[4].value : false;
      const currPrice = isDiscount ? centAmount * 0.7 : centAmount;
      totalCost += currPrice;
    });
    return totalCost;
  }

  render(cart: { cart: Cart; customerId: string }) {
    window.location.hash = 'basket-page';
    this.DataCart = cart.cart;
    this.customerId = cart.customerId;
    console.log('this.customerId:', this.customerId);
    this.addCartItems(cart.cart);
    const { lineItems } = cart.cart;
    // const { centAmount: totalCost } = totalPrice;
    const totalCost = this.getTotalCost(cart.cart);

    if (lineItems.length) {
      const productsContainer = this.createProductsContainer(lineItems);
      const totalPriceContainer = this.createTotalPriceContainer(totalCost);
      this.mainWrapper.append(productsContainer, totalPriceContainer);
    } else {
      const templateEmptycart = this.createTemplateEmptyCart();
      this.mainWrapper.appendChild(templateEmptycart);
    }

    this.main.appendChild(this.mainWrapper);
    this.pageWrapper.append(this.main);
    document.body.appendChild(this.pageWrapper);
  }

  renderPage() {
    createOrGetCart()
      .then((cart) => {
        console.log('Данные корзины:', cart);
        this.render(cart);
        // addLineItemToCart(cart.cart, 2);
      })
      .catch(() => this.renderBasketFromAnonim());

    return this.pageWrapper;
  }
}

export default Basket;
