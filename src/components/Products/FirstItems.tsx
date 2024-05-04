import { useContext, useState } from 'react'
import { CartContext } from '../../contexts/CartContext.tsx'

export default function FirstItems({ products }) {
  const { addCart } = useContext(CartContext);
  const [colors, setColors] = useState([]);

  const handleAddColor = (color, index, productId) => {
    const existingColorIndex = colors.findIndex((c) => c.id === productId);
    if (existingColorIndex !== -1) {
      const updatedColors = [...colors];
      updatedColors[existingColorIndex].data = { id: index, color };
      setColors(updatedColors);
    } else {
      setColors([...colors, { id: productId, data: { id: index, color } }]);
    }
  };
  //console.log(colors)

  const handleAddCart = (product) => {
    if (!colors.some((c) => c.id === product.id)) {
      alert('Выберите цвет');
      return false;
    }
    const colorsProduct = colors.find((c) => c.id === product.id);
    const updateProduct = { ...product, color: colorsProduct.data.color };
    addCart(updateProduct, colorsProduct);
  }

  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="group relative">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700 relative">
                <a href={product.href}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </a>
              </h3>
              <div className='flex gap-1'>
                {product.color.map((color, index) => (
                  <p key={index} className="mt-1 text-sm text-gray-500" onClick={() => handleAddColor(color, index, product.id)}>{color}</p>
                ))}
              </div>
              {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
            </div>
            <p className="text-sm font-medium text-gray-900">{product.price}</p>
          </div>
          <button onClick={() => handleAddCart(product)} className="mt-5 w-full bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            В корзину
          </button>
        </div>
      ))}
    </>

  )
}