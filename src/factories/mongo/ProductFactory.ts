import { faker } from "@faker-js/faker";
import IProduct from "../../components/product/model/IProduct";
import Product from "../../components/product/model/Product";

const makeGalley = (count: number = 3) => {
  let gallery = []
  for (let index = 1; index <= count; index++) {
    const galleryItem = faker.string.uuid()
    gallery.push(galleryItem)
  }
  return gallery
}


const makeAttributes = (count: number = 1) => {
  let attribute = []
  for (let index = 1; index <= count; index++) {
    const attributeGroup = {
      title: 'information',
      attributes: [{title: 'cpu', slug: 'i3 12100', value: 'intel',filtrable: true, hasPrice: true},
        {title: 'ram', slug: '2x 8 3200', value: 'corsair',filtrable: true, hasPrice: false},
        {title: 'ssd', slug: '256', value: 'samsung',filtrable: true, hasPrice: true}]
    }
    attribute.push(attributeGroup)
  }
  return attribute
}


export async function createProduct(count: number = 1) {
  const products: IProduct[] = []
  for (let index = 0; index < count; index++) {
    const productParams = {
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      thumbnail: faker.string.uuid(),
      gallery: makeGalley(),
      category: faker.database.mongodbObjectId(),
      attributes: makeAttributes(),
      stock: 30,
    }

    const newProduct = new Product(productParams)
    await newProduct.save()
    await newProduct.save()
    products.push()
  }
  return products
}