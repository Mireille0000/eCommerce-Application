import createHtmlElement from '../../../utils/functions';

export default function productContainerElem(elemToAppend: HTMLElement) {
  const productContainer = createHtmlElement('div', 'product-container');
  const imageElem = createHtmlElement('div', 'product-image');
  const image = createHtmlElement('img');
  const productDetails = createHtmlElement('div', 'product-details');
  const productName = createHtmlElement('h3', 'product-name');
  const productDescription = createHtmlElement('div', 'product-description');
  const productPrices = createHtmlElement('div', 'product-prices');
  const price = createHtmlElement('span', 'price');
  const discount = createHtmlElement('span', 'discount');
  const discountPrice = createHtmlElement('span', 'discount-price');

  elemToAppend.append(productContainer);
  productContainer.append(imageElem, productDetails, productPrices);
  productDetails.append(productName, productDescription);
  productPrices.append(price, discount, discountPrice);
  imageElem.append(image);
}
