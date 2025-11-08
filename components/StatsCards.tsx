export default function StatsCards({ stats }: { stats: any }) {
  const items = [
    { label: "Admins", value: stats.admins },
    { label: "Départements", value: stats.departments },
    { label: "Événements", value: stats.events }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((i) => (
        <div
          key={i.label}
          className="bg-white/10 p-6 rounded-xl text-center shadow"
        >
          <p className="text-sm">{i.label}</p>
          <h3 className="text-3xl font-semibold">{i.value}</h3>
        </div>
      ))}
    </div>
  );
}
