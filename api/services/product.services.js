
const { faker } = require('@faker-js/faker');
const boom =  require('@hapi/boom')

class ProductService {

  constructor(){/*  */
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100; /* inicia con 100 productos */
    for (let index = 0; index < limit; index++) {
    this.products.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
      isBlock: faker.datatype.boolean(),
    });
  }

  }

  async create(data) { /* crear un producto */
    const newProduct =  {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  async find() { /* buscar productos */
  return new Promise((resolve, reject) =>{
    setTimeout(() => {
      resolve(this.products)
    }, 5000);
  })
  }

  async findOne(id) { /* encontrar 1 id particular */
    const product = this.products.find(item => item.id === id);/* FIND en este caso es un metodo para trabajar con arrays */
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');/* conflict//notfound palabra reservada de boom */
    }
    return product;
  }

  async update(id, changes) {/* actualizar = patch */
    const index = this.products.findIndex(item => item.id === id);/* findIndex = muestra poscision donde esta el elemento del array */
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) { /* eliminar id/id's  */
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);/* splice enviar una poscicion  para poder eliminarla. ,1 , osea 1*/
    return { id };
  }

}

module.exports = ProductService
