export default function EventCard({ event }: { event: any }) {
  return (
    <div className="bg-white/10 p-4 rounded-xl shadow hover:bg-white/20 transition">
      <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
      <p className="text-sm text-white/80 mb-3">{event.description}</p>
      <p className="text-xs text-white/60">
        {new Date(event.date).toLocaleDateString()}
      </p>
    </div>
  );
}
