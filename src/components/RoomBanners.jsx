import { motion } from 'framer-motion';
import { ROOMS } from '../data/data';

export default function RoomBanners() {
  return (
    <section className="py-16 px-4 bg-[#f4f2ef] dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Shop by <span className="text-yellow-600">Room</span>
          </h2>
          <p className="text-gray-400 mt-2">Find the perfect furniture for every space</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ROOMS.map((room, i) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden group cursor-pointer h-80"
            >
              <img
                src={room.img}
                alt={room.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-white text-2xl font-bold mb-3">{room.name}</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold text-sm hover:bg-yellow-600 hover:text-white transition-colors duration-300"
                >
                  Shop Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}