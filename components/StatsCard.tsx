export default function StatsCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-green-700 mt-2">{value}</p>
    </div>
  );
}
