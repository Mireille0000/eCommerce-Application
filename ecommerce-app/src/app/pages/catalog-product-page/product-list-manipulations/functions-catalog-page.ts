import createHtmlElement from '../../../utils/functions';

export default function productContainerElem(elemToAppend: HTMLElement) {
  const productContainer = createHtmlElement('div', 'product-container');
  const imageElem = createHtmlElement('div', 'product-image');
  const image = createHtmlElement('img');
  const productCardInfoContent = createHtmlElement('div', 'product-card-info');
  const productDetails = createHtmlElement('div', 'product-details');
  const productName = createHtmlElement('h3', 'product-name');
  const productDescription = createHtmlElement('div', 'product-description');
  const productPrices = createHtmlElement('div', 'product-prices');
  const price = createHtmlElement('span', 'price');
  const discount = createHtmlElement('span', 'discount');
  const discountPrice = createHtmlElement('span', 'discount-price');

  const addToCartButton = createHtmlElement('button', 'add-to-cart-button', 'Add to Cart');

  const iconCart = createHtmlElement('i', 'fa-solid fa-hand-sparkles');

  elemToAppend.append(productContainer);
  productContainer.append(productCardInfoContent, addToCartButton);
  addToCartButton.append(iconCart);
  productCardInfoContent.append(imageElem, productDetails, productPrices);
  productDetails.append(productName, productDescription);
  productPrices.append(price, discount, discountPrice);
  imageElem.append(image);
}
