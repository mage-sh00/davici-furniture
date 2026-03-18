import { ROOMS } from '../data/data';
function RoomBanners() {
  return (
    <section className="section" style={{ background:'#f4f2ef' }}>
      <div className="rooms-grid">
        {ROOMS.map(room => (
          <div key={room.name} className="room-card">
            <img src={room.img} alt={room.name} />
            <div className="room-overlay">
              <h3>{room.name}</h3>
              <button className="room-btn">Shop Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default RoomBanners;