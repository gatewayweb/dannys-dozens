import useStore from '@/lib/store';

export default function OrderItem({ cartItem, index }) {
  const updateQuantity = useStore((state) => state.updateCartItemQuantity);
  const removeItem = useStore((state) => state.removeFromCart);

  const { item, size, quantity } = cartItem;
  return (
    <div className="bg-white border border-gray-300 rounded-lg mb-5 px-6 py-4 flex flex-col md:flex-row items-center justify-between transition-all duration-200 hover:shadow-lg">
      <h3 className="font-bold leading-tight text-center md:text-xl md:text-left">
        {item.name}
        <div className="mt-1 md:mt-0">
          <div
            className={`text-sm font tracking-widest uppercase text-white border-b-2 ${
              size === 'Half Dozen' ? 'bg-blue-600 border-blue-900' : 'bg-green-600 border-green-800'
            } px-4 py-1 rounded-full inline-block`}
          >
            {size}
          </div>
        </div>
      </h3>
      <div className="flex flex-col w-full justify-center items-center sm:flex-row sm:justify-between md:w-auto">
        <div className="flex mt-3 md:mt-0">
          <button
            onClick={() => {
              const newQuantity = parseInt(quantity) - 1;
              if (newQuantity <= 0) {
                removeItem(index);
              } else {
                updateQuantity(item, size, newQuantity);
              }
            }}
            className="rounded-full px-2 border border-gray-300 hover:bg-gray-100"
          >
            -
          </button>
          <span className="font-bold text-xl px-3">{quantity}</span>
          <button
            onClick={() => updateQuantity(item, size, parseInt(quantity) + 1)}
            className="rounded-full px-2 border border-gray-300 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        <button
          onClick={() => removeItem(index)}
          className="rounded-full px-4 py-1 sm:ml-6 border border-gray-300 text-sm uppercase text-gray-500 mt-5 sm:mt-3 md:mt-0 hover:bg-gray-100"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
