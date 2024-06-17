import { Attribute, Cart, LineItem } from '@commercetools/platform-sdk';
import Page from '../../templates/page';
import {
  createButtonElement,
  createDivElement,
  createH2Element,
  createImage,
  createInputElement,
  createSpanElement,
} from '../../utils/functions';
import decrease from '../../../assets/images/decrease.svg';
import increase from '../../../assets/images/increase.svg';
import createOrGetCart, {
  addDiscountCode,
  editLineItemToCart,
  removeAllLineItemsFromCart,
} from '../../server-requests/basket-requests/basket-request';
import deleteProduct from '../../../assets/images/delete_address_copy.svg';
import { createMsgRegAcc } from '../registration-page/utils-registration/functions-registration';
import promoCode from '../../../assets/images/promo_code.svg';
import HeaderComponent from '../../components/header';
import { routes } from '../main-page/main';

interface LineItemCustom {
  id: string;
  name: {
    ['en-US']: string;
  };
  quantity: number;
}

class Basket extends Page {
  pageTitle: HTMLHeadingElement;

  DataCart!: Cart;

  customerId!: string;

  clickTimeout: ReturnType<typeof setTimeout> | undefined;

  CartItems!: LineItemCustom[];

  constructor(id: string) {
    super(id);
    this.pageWrapper.classList.add('wrapper--bskt');
    this.mainWrapper.classList.add('wrapper-main--bskt');
    this.headerWrapper.classList.add('header-bskt');
    this.pageTitle = createH2Element('basket-page-title', 'Basket');
    this.CartItems = [];
  }

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
      });
    }
  }

  private hasDiscountPrice(attributes: Attribute[]) {
    let isDiscount = false;
    for (let i = 0; i < attributes.length; i += 1) {
      const { name: nameAttr, value } = attributes[i];
      if (nameAttr === 'discount-attribute') {
        isDiscount = value as boolean;
        break;
      }
    }
    return isDiscount;
  }

  private getTotalCost(cart: Cart) {
    const { lineItems, discountCodes, totalPrice: total } = cart;
    const { centAmount: totalCent } = total;
    let totalCost = 0;
    if (discountCodes.length) {
      totalCost = totalCent;
    } else {
      lineItems.forEach(({ variant, totalPrice }) => {
        const { attributes } = variant;
        const { centAmount } = totalPrice;
        const isDiscount = attributes ? this.hasDiscountPrice(attributes) : false;

        const currPrice = isDiscount ? Math.floor(centAmount * 0.7) : centAmount;
        totalCost += currPrice;
      });
    }
    return totalCost;
  }

  private updatePromoDiscount(discountTotal: number, ownDiscount: number) {
    const totalPriceWrap = document.querySelector('.bskt__total-price-wrap') as HTMLElement;
    const totalDiscountWrap = totalPriceWrap.querySelector('.bskt__total-price-promo-discount-wrap');
    const contentDiscount = document.querySelector('.bskt__total-price-promo-discount-content');
    const discountCent = discountTotal - ownDiscount;

    if (!totalDiscountWrap) {
      const totalDiscountWrapElem = createDivElement('bskt__total-price-promo-discount-wrap');
      const titleDiscount = createSpanElement('bskt__total-price-promo-discount-title', 'Promo code discount (30%)');
      const discountElem = createSpanElement('bskt__total-price-promo-discount-content', `${discountCent / 100} €`);
      totalDiscountWrapElem.append(titleDiscount, discountElem);
      totalPriceWrap.prepend(totalDiscountWrapElem);
    } else if (contentDiscount) {
      contentDiscount.textContent = `${discountCent / 100} €`;
    }
  }

  private updateStartPrice(totalCostPrice: number, discountTotal: number, ownDiscount: number) {
    const totalPriceWrap = document.querySelector('.bskt__total-price-wrap');

    const totalStartPriceContent = document.querySelector('.bskt__total-start-price-content');
    const totalStartPrice = `${(totalCostPrice + discountTotal - ownDiscount) / 100} €`;

    if (totalStartPriceContent) {
      totalStartPriceContent.textContent = totalStartPrice;
    } else if (totalPriceWrap) {
      const totalStartPriceWrap = createDivElement('bskt__total-start-price-wrap');
      const totalStartPriceTitle = createSpanElement('bskt__total-start-price-title', 'Products');
      const totalStartPriceContentElem = createSpanElement('bskt__total-start-price-content', totalStartPrice);
      totalStartPriceWrap.append(totalStartPriceTitle, totalStartPriceContentElem);
      totalPriceWrap.prepend(totalStartPriceWrap);
    }
  }

  private updateTemplate(cart: Cart) {
    const { discountOnTotalPrice } = cart;

    const totalCost = document.querySelector('.bskt__total-price-content') as HTMLElement;
    const totalPriceItems = Array.from(document.querySelectorAll('.bskt__price-total'));
    const totalPriceBeforeDiscrount = Array.from(document.querySelectorAll('.bskt__price-total-before-discount'));
    const discountItemsLength = totalPriceBeforeDiscrount.length;
    let currDiscountIndex = 0;
    let ownDiscount = 0;
    const totalCostPrice = this.getTotalCost(cart);
    totalCost.textContent = `${totalCostPrice / 100} €`;

    totalPriceItems.forEach((totalPriceItem, index) => {
      const { variant, totalPrice } = cart.lineItems[index];
      const { attributes } = variant;
      const isDiscount = attributes ? this.hasDiscountPrice(attributes) : false;
      const elemPrice = totalPriceItem;
      const currPrice = isDiscount ? Math.round(totalPrice.centAmount * 0.7) : totalPrice.centAmount;
      elemPrice.textContent = `${currPrice / 100} €`;
      if (currDiscountIndex < discountItemsLength && isDiscount) {
        totalPriceBeforeDiscrount[currDiscountIndex].textContent = `${totalPrice.centAmount / 100} €`;
        currDiscountIndex += 1;
        ownDiscount += totalPrice.centAmount - currPrice;
      }
    });

    if (discountOnTotalPrice) {
      this.updatePromoDiscount(discountOnTotalPrice.discountedAmount.centAmount, ownDiscount);
      this.updateStartPrice(totalCostPrice, discountOnTotalPrice.discountedAmount.centAmount, ownDiscount);
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
    const isEmpty = document.querySelector('.bskt__empty-cart-container');

    const itemsContainer = document.querySelector('.bskt__products-container');
    const totalCostContainer = document.querySelector('.bskt__total-price-container');
    const templateEmptycart = this.createTemplateEmptyCart();

    this.DataCart = cart;
    this.addCartItems(cart);
    this.updateTemplate(cart);
    if (!this.DataCart.lineItems.length) {
      itemsContainer?.remove();
      totalCostContainer?.remove();
      if (!isEmpty) this.mainWrapper.appendChild(templateEmptycart);
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
    editLineItemToCart(this.DataCart, editCount, itemIndex)
      .then((dataCart) => this.updateSuccesEditItemCount(dataCart))
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
    isDiscount: boolean,
    index: number
  ) {
    const currPrice = isDiscount ? Math.round(price * 0.7) : price;

    const prdctContainer = createDivElement('bskt__product-container');

    const imgWrapProduct = createDivElement('bskt__img-wrap-product');
    const imgProduct = createImage(imgUrl, imgName, 'img-product');
    imgWrapProduct.appendChild(imgProduct);

    const dscrContProduct = createDivElement('bskt__dscr-container-product');
    const nameWrapProduct = createDivElement('bskt__name-wrap-product');
    const nameProduct = createSpanElement('bskt__name-product', imgName);
    nameWrapProduct.appendChild(nameProduct);
    dscrContProduct.append(nameWrapProduct);

    const priceContProduct = createDivElement('bskt__price-cont-product');
    const priceWrapProduct = createDivElement('bskt__price-wrap-product');
    const priceTotalProduct = createDivElement('bskt__price-total-product');
    const priceTotalContent = createSpanElement('bskt__price-total', `${totalCurrPrice / 100} €`);
    priceTotalProduct.append(priceTotalContent);

    if (isDiscount) {
      const totalCurr = isDiscount ? Math.round(totalCurrPrice * 0.7) : totalCurrPrice;
      priceTotalContent.textContent = `${totalCurr / 100} €`;
      const priceBeforeDiscount = createSpanElement('bskt__price-total-before-discount', `${totalCurrPrice / 100} €`);
      priceTotalProduct.append(priceBeforeDiscount);
    }

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
    const priceOne = createSpanElement('bskt__price-one', `${currPrice / 100} €/pc`);
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
  }

  private handlerCancelDeleteItems(containerDelete: HTMLDivElement, event: Event) {
    event.preventDefault();
    containerDelete.remove();
  }

  private deleteTemplateProducts(containerDelete: HTMLDivElement) {
    const isEmpty = document.querySelector('.bskt__empty-cart-container');

    const itemsContainer = document.querySelector('.bskt__products-container');
    const totalCostContainer = document.querySelector('.bskt__total-price-container');
    itemsContainer?.remove();
    totalCostContainer?.remove();
    containerDelete.remove();

    if (!isEmpty) {
      const templateEmptycart = this.createTemplateEmptyCart();
      this.mainWrapper.appendChild(templateEmptycart);
    }
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
    const prdctsContainer = createDivElement('bskt__products-container');
    const deleteAllProducts = createDivElement('bskt__delete-products');
    const deleteAllProductsBtn = createButtonElement('bskt__delete-products-btn', 'Clear Shopping Cart');
    deleteAllProductsBtn.addEventListener('click', this.handleClearCart.bind(this));
    deleteAllProducts.appendChild(deleteAllProductsBtn);
    prdctsContainer.appendChild(deleteAllProducts);

    lineItems.forEach(({ variant, name, totalPrice, quantity, price }, index) => {
      const { attributes } = variant;
      const isDisc = attributes ? this.hasDiscountPrice(attributes) : false;

      const imgUrl = variant.images ? variant.images[0].url : '';
      const imgName = name['en-US'];
      const total = totalPrice.centAmount;
      const countProduct = quantity;
      const currPrice = price.value.centAmount;
      const currProduct = this.createProductContainer(imgUrl, imgName, total, countProduct, currPrice, isDisc, index);
      prdctsContainer.appendChild(currProduct);
    });
    return prdctsContainer;
  }

  private handlePromoCode(inputCode: HTMLInputElement, event: Event) {
    event.preventDefault();
    const code = inputCode.value;
    const invalidCode = ['Failure', 'The promo code you entered is not valid. Please check the code and try again.'];
    const validCode = ['Success!', 'The promotional code you entered was successfully applied.'];

    addDiscountCode(code, this.DataCart)
      .then((cart) => {
        this.DataCart = cart;
        this.addCartItems(cart);
        createMsgRegAcc(validCode);
        this.updateTemplate(cart);
      })
      .catch(() => createMsgRegAcc(invalidCode));
  }

  private createTotalPriceContainer(totalCost: number) {
    const totalPriceContainer = createDivElement('bskt__total-price-container');

    const totalPriceWrap = createDivElement('bskt__total-price-wrap');
    const totalCostWrap = createDivElement('bskt__total-cost-wrap');

    const titleTotalPriceWrap = createDivElement('bskt__total-price-title-wrap');
    const titleTotalPrice = createSpanElement('bskt__total-price-title', 'Total cost');
    titleTotalPriceWrap.appendChild(titleTotalPrice);
    const totalPriceCntntWrap = createDivElement('bskt__total-price-content-wrap');
    const totalPriceCntnt = createDivElement('bskt__total-price-content', `${totalCost / 100} €`);
    totalPriceCntntWrap.appendChild(totalPriceCntnt);

    const promoCodeWrap = createDivElement('bskt__promo-code-wrap');
    const titlePromoCodeContainer = createDivElement('bskt__promo-code-title-container');
    const titlePromoCodeWrap = createDivElement('bskt__promo-code-title-wrap');

    const promoCodeImgWrap = createDivElement('bskt__promo-code-img-wrap');
    const promoCodeImg = createImage(promoCode, 'promo-code', 'bskt__promo-code-img');
    promoCodeImgWrap.append(promoCodeImg);

    const titlePromoCode = createSpanElement('bskt__promo-code-title', 'Enter a promotional code or certificate *');
    titlePromoCodeWrap.append(promoCodeImgWrap, titlePromoCode);

    const descrPromoCodeWrap = createDivElement('bskt__promo-code-descr-wrap');
    const descrPromoCode = createSpanElement(
      'bskt__promo-code-descr',
      'The promotional code does not apply to products that already have a discount.'
    );
    descrPromoCodeWrap.append(descrPromoCode);

    titlePromoCodeContainer.append(titlePromoCodeWrap, descrPromoCodeWrap);

    const inputPromoCodeWrap = createDivElement('bskt__promo-code-input-wrap');
    const inputPromoCode = createInputElement('bskt__promo-code-input', '', [
      { name: 'placeholder', value: 'Enter a code' },
    ]);
    inputPromoCodeWrap.append(inputPromoCode);

    const promoCodeEnterBtn = createButtonElement('bskt__promo-code-btn', 'Apply Promo Code');
    promoCodeEnterBtn.addEventListener('click', this.handlePromoCode.bind(this, inputPromoCode));
    promoCodeWrap.append(titlePromoCodeContainer, inputPromoCodeWrap, promoCodeEnterBtn);

    totalCostWrap.append(titleTotalPriceWrap, totalPriceCntntWrap);
    totalPriceWrap.append(totalCostWrap);
    totalPriceContainer.append(totalPriceWrap, promoCodeWrap);
    return totalPriceContainer;
  }

  private renderBasketFromAnonim() {
    window.location.hash = 'basket-page';
    const isEmpty = document.querySelector('.bskt__empty-cart-container');

    const templateEmptycart = this.createTemplateEmptyCart();
    if (!isEmpty) {
      this.mainWrapper.appendChild(templateEmptycart);
      this.main.appendChild(this.mainWrapper);
    }
    this.pageWrapper.append(this.header, this.main);
    this.createHeader();
    document.body.appendChild(this.pageWrapper);
  }

  private updateDiscountPrice(cart: Cart) {
    const { discountOnTotalPrice } = cart;

    const totalPriceItems = Array.from(document.querySelectorAll('.bskt__price-total'));
    const totalPriceBeforeDiscrount = Array.from(document.querySelectorAll('.bskt__price-total-before-discount'));
    const discountItemsLength = totalPriceBeforeDiscrount.length;
    let currDiscountIndex = 0;
    let ownDiscount = 0;
    const totalCostPrice = this.getTotalCost(cart);

    totalPriceItems.forEach((_, index) => {
      const { variant, totalPrice } = cart.lineItems[index];
      const { attributes } = variant;
      const isDiscount = attributes ? this.hasDiscountPrice(attributes) : false;
      const currPrice = isDiscount ? Math.round(totalPrice.centAmount * 0.7) : totalPrice.centAmount;
      if (currDiscountIndex < discountItemsLength && isDiscount) {
        currDiscountIndex += 1;
        ownDiscount += totalPrice.centAmount - currPrice;
      }
    });

    if (discountOnTotalPrice) {
      this.updatePromoDiscount(discountOnTotalPrice.discountedAmount.centAmount, ownDiscount);
      this.updateStartPrice(totalCostPrice, discountOnTotalPrice.discountedAmount.centAmount, ownDiscount);
    }
  }

  private createHeader() {
    const catalogPageHeader = new HeaderComponent();
    const { appName, logoContainer, logo, navBar, navigation, navItem, link } = catalogPageHeader;
    this.addElemsToHeader(appName, logoContainer, this.pageTitle, navBar);
    logoContainer.append(logo);
    navBar.className = 'nav-bar-catalog-page';
    navBar.append(navigation);
    const isUserLoggedIn = localStorage.getItem('data') && JSON.parse(localStorage.getItem('data') as string);
    const logLink = isUserLoggedIn ? 'Log out' : 'Log in';
    const profileLink = isUserLoggedIn ? 'Profile' : false;
    const linkName = [logLink, 'Register', 'Catalog', 'Profile', 'Back to main'];

    navigation.append(navItem);
    navItem.className = 'nav-item';
    for (let i = 0; i < 2; i += 1) {
      navigation.appendChild(navItem.cloneNode(true));
    }

    if (profileLink) {
      navigation.append(navItem.cloneNode(true));
    }
    const navListItemsArr = Array.from(document.querySelectorAll('.nav-item'));

    for (let i = 0; i < navListItemsArr.length; i += 1) {
      navListItemsArr[i].appendChild(link.cloneNode(true));
    }
    const navLinksArr = Array.from(document.querySelectorAll('.nav-item a'));

    for (let i = 0; i < navLinksArr.length; i += 1) {
      navLinksArr[i].innerHTML = linkName[i];
      navLinksArr[i].setAttribute('href', routes[i]);
    }

    const logInLink = navLinksArr[0];

    logInLink.addEventListener('click', (event) => {
      event.preventDefault();
      if (isUserLoggedIn) {
        localStorage.clear();
        window.location.hash = '';
        window.location.hash = 'main-page';
      } else {
        window.location.hash = 'log-in-page';
      }
    });
    appName.innerHTML = 'Ultimate ScriptSmith';
  }

  render(cart: { cart: Cart; customerId: string }) {
    console.log('cart:', cart.cart);
    window.location.hash = 'basket-page';
    this.DataCart = cart.cart;
    this.customerId = cart.customerId;
    this.addCartItems(cart.cart);
    const { lineItems } = cart.cart;
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
    this.pageWrapper.append(this.header, this.main);
    document.body.appendChild(this.pageWrapper);
    this.updateDiscountPrice(cart.cart);
    this.createHeader();
  }

  renderPage() {
    createOrGetCart()
      .then((cart) => this.render(cart))
      .catch(() => this.renderBasketFromAnonim());

    return this.pageWrapper;
  }
}

export default Basket;
