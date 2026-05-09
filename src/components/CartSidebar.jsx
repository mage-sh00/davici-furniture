import { motion, AnimatePresence } from 'framer-motion';

export default function CartSidebar({
  open, onClose, cartItems, onRemove, onChangeQty, totalCount, totalPrice
}) {
  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: open ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h3 className="text-xl font-bold dark:text-white">
            🛒 My Cart ({totalCount})
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <div className="text-6xl mb-4">🛒</div>
              <p className="font-semibold text-lg">Your cart is empty!</p>
              <p className="text-sm mt-2">Add some furniture 😊</p>
            </div>
          ) : (
            cartItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="flex gap-3 p-3 rounded-xl border dark:border-gray-700 dark:bg-gray-800"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm dark:text-white line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-yellow-600 font-bold mt-1">{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onChangeQty(item.id, -1)}
                      className="w-7 h-7 rounded-full border dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white font-bold"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-semibold dark:text-white">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onChangeQty(item.id, 1)}
                      className="w-7 h-7 rounded-full border dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-400 hover:text-red-600 self-start text-lg"
                >
                  🗑
                </button>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t dark:border-gray-700">
            <div className="flex justify-between mb-4">
              <span className="font-semibold dark:text-white">Total</span>
              <span className="font-bold text-xl text-yellow-600">
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 rounded-xl transition-colors duration-200">
              Proceed to Checkout →
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}