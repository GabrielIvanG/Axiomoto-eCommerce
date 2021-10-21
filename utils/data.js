import bcrypt from 'bcryptjs';
export const data = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Classic T-shirt',
      slug: 'classic-t-shirt',
      category: 'Shirts',
      image:
        'https://res.cloudinary.com/belliads/image/upload/v1634554130/Catalogo/tshirt_mockup_-_amremam_oc30jj.jpg',
      price: 100,
      brand: 'Axiomoto',
      rating: 4.5,
      numReviews: 10,
      description: ' High quality shirt ',
      countInStock: 5,
      isFeatured: true,
      featuredImage:
        'https://res.cloudinary.com/belliads/image/upload/v1634554130/Catalogo/tshirt_mockup_-_amremam_oc30jj.jpg',
    },
    {
      name: 'Classic Pants',
      slug: 'classic-pants',
      category: 'Pants',
      image:
        'https://res.cloudinary.com/belliads/image/upload/v1634554223/Catalogo/product-image-1194643454_1024x1024_d3uka4.jpg',
      isFeatured: true,
      featuredImage:
        'https://res.cloudinary.com/belliads/image/upload/v1634554223/Catalogo/product-image-1194643454_1024x1024_d3uka4.jpg',
      price: 150,
      brand: 'Axiomoto',
      rating: 5,
      numReviews: 13,
      description: ' High quality pants ',
      countInStock: 20,
    },
  ],
};
