// import React, { useEffect } from 'react';
// import { doc, getDoc } from '@firebase/firestore';
// import { db } from '../../../config/firebaseConfig';

// export default function useFetchWishlist({ productIds, setProducts }) {
//   useEffect(() => {
//     const getProductsIdArray = async () => {
//       const wishlistRef = doc(db, 'wishlists', );
//       getDoc();
//     }

//     const fetchProducts = async () => {
//       // Use Promise.all to fetch multiple documents concurrently
//       const productPromises = productIds.map(async (productId) => {
//         const productDoc = await getDoc(doc(db, 'products', productId));

//         if (productDoc.exists) {
//           return { id: productDoc.id, ...productDoc.data() };
//         }
//         console.log(`Product with ID ${productId} not found.`);
//         return null;
//       });

//       const productsData = await Promise.all(productPromises);

//       // Filter out null values (products not found)
//       const validProducts = productsData.filter((product) => product !== null);

//       setProducts(validProducts);
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div>useFetchWishlist</div>
//   );
// }
