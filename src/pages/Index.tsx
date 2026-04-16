import { useState } from "react";
import Icon from "@/components/ui/icon";

const buses = [
  {
    number: "№ 101",
    route: "Деревня → Районный центр",
    scheduleOut: ["06:30", "11:00", "15:30", "18:00"],
    scheduleBack: ["08:15", "12:45", "17:10", "19:30"],
    days: "Пн–Пт",
    note: "В выходные не ходит",
    color: "#2d6a4f",
  },
  {
    number: "№ 104",
    route: "Деревня → Станция",
    scheduleOut: ["07:00", "13:20", "17:00"],
    scheduleBack: ["09:05", "14:55", "18:40"],
    days: "Ежедневно",
    note: "Проездной не действует",
    color: "#1a5c8a",
  },
  {
    number: "№ 117",
    route: "Деревня → Поликлиника",
    scheduleOut: ["08:00", "14:00"],
    scheduleBack: ["10:30", "16:15"],
    days: "Вт, Чт, Сб",
    note: null,
    color: "#8a4a1a",
  },
];

// Остановки на карте (координаты реального района Ключи–Сысерть)
const stops = [
  { name: "Д. Ключи (центр)", lat: 56.6012, lng: 60.8341, buses: ["№ 101", "№ 104", "№ 117"] },
  { name: "Ключи — въезд", lat: 56.6055, lng: 60.8290, buses: ["№ 101", "№ 104"] },
  { name: "Сысерть — автостанция", lat: 56.5097, lng: 60.8205, buses: ["№ 101", "№ 104", "№ 117"] },
  { name: "Сысерть — поликлиника", lat: 56.5130, lng: 60.8180, buses: ["№ 117"] },
  { name: "Станция Сысерть", lat: 56.5060, lng: 60.8310, buses: ["№ 104"] },
];

const now = new Date();
const currentTime = now.getHours() * 60 + now.getMinutes();

function timeToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function getNextDeparture(times: string[]) {
  return times.find((t) => timeToMinutes(t) > currentTime) || null;
}

export default function Index() {
  const [direction, setDirection] = useState<"out" | "back">("out");
  const [activeTab, setActiveTab] = useState<"schedule" | "map">("schedule");
  const [selectedBus, setSelectedBus] = useState<string | null>(null);

  const filteredStops = selectedBus
    ? stops.filter((s) => s.buses.includes(selectedBus))
    : stops;

  // Яндекс карта — iframe с центром на деревне Ключи
  const mapSrc = `https://yandex.ru/map-widget/v1/?ll=60.8341%2C56.6012&z=12&l=map&pt=${filteredStops
    .map((s, i) => `${s.lng},${s.lat},pm2rd${i + 1}`)
    .join("~")}`;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", fontFamily: "'Golos Text', sans-serif" }}>
      {/* Шапка */}
      <header className="px-6 pt-10 pb-5 max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">🚌</span>
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--muted-text)" }}>
            расписание автобусов
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight" style={{ color: "var(--title)", fontFamily: "'Oswald', sans-serif" }}>
          Д. Ключи — Сысерть
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-text)" }}>
          3 маршрута · Свердловская область
        </p>
      </header>

      {/* Навигация по вкладкам */}
      <div className="max-w-lg mx-auto px-6 mb-4">
        <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: "var(--card-border)" }}>
          <button
            onClick={() => setActiveTab("schedule")}
            className="flex-1 py-3 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              background: activeTab === "schedule" ? "var(--accent)" : "var(--card-bg)",
              color: activeTab === "schedule" ? "#fff" : "var(--muted-text)",
            }}
          >
            <Icon name="Clock" size={15} />
            Расписание
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className="flex-1 py-3 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              background: activeTab === "map" ? "var(--accent)" : "var(--card-bg)",
              color: activeTab === "map" ? "#fff" : "var(--muted-text)",
            }}
          >
            <Icon name="MapPin" size={15} />
            Остановки
          </button>
        </div>
      </div>

      {/* ВКЛАДКА: РАСПИСАНИЕ */}
      {activeTab === "schedule" && (
        <>
          {/* Направление */}
          <div className="max-w-lg mx-auto px-6 mb-5">
            <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: "var(--card-border)" }}>
              <button
                onClick={() => setDirection("out")}
                className="flex-1 py-2.5 text-sm font-medium transition-all duration-200"
                style={{
                  background: direction === "out" ? "#e8f5ee" : "var(--card-bg)",
                  color: direction === "out" ? "var(--accent)" : "var(--muted-text)",
                  borderRight: "1px solid var(--card-border)",
                }}
              >
                Из Ключей →
              </button>
              <button
                onClick={() => setDirection("back")}
                className="flex-1 py-2.5 text-sm font-medium transition-all duration-200"
                style={{
                  background: direction === "back" ? "#e8f5ee" : "var(--card-bg)",
                  color: direction === "back" ? "var(--accent)" : "var(--muted-text)",
                }}
              >
                ← В Ключи
              </button>
            </div>
          </div>

          <main className="max-w-lg mx-auto px-6 flex flex-col gap-4 pb-12">
            {buses.map((bus, i) => {
              const times = direction === "out" ? bus.scheduleOut : bus.scheduleBack;
              const next = getNextDeparture(times);

              return (
                <div
                  key={i}
                  className="rounded-2xl p-5 transition-all duration-300"
                  style={{
                    background: "var(--card-bg)",
                    border: "1.5px solid var(--card-border)",
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-md"
                          style={{ background: bus.color + "18", color: bus.color }}
                        >
                          {bus.number}
                        </span>
                        <span className="text-xs" style={{ color: "var(--muted-text)" }}>
                          {bus.days}
                        </span>
                      </div>
                      <p className="text-sm font-semibold" style={{ color: "var(--title)" }}>
                        {bus.route}
                      </p>
                      {bus.note && (
                        <p className="text-xs mt-0.5" style={{ color: "var(--muted-text)" }}>
                          {bus.note}
                        </p>
                      )}
                    </div>

                    {next ? (
                      <div className="text-right shrink-0 ml-4">
                        <p className="text-xs" style={{ color: "var(--muted-text)" }}>следующий</p>
                        <p className="text-xl font-bold" style={{ color: bus.color, fontFamily: "'Oswald', sans-serif" }}>
                          {next}
                        </p>
                      </div>
                    ) : (
                      <div className="text-right shrink-0 ml-4">
                        <p className="text-xs" style={{ color: "var(--muted-text)" }}>на сегодня</p>
                        <p className="text-sm font-semibold" style={{ color: "var(--muted-text)" }}>всё</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {times.map((t, j) => {
                      const isPast = timeToMinutes(t) <= currentTime;
                      const isNext = t === next;
                      return (
                        <span
                          key={j}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium"
                          style={{
                            background: isNext ? bus.color : isPast ? "var(--past-bg)" : "var(--time-bg)",
                            color: isNext ? "#fff" : isPast ? "var(--muted-text)" : "var(--title)",
                            opacity: isPast ? 0.45 : 1,
                            fontFamily: "'Oswald', sans-serif",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {t}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="flex items-center gap-2 mt-1 px-1">
              <Icon name="Info" size={13} />
              <p className="text-xs" style={{ color: "var(--muted-text)" }}>
                Выделено — ближайший рейс. Серые — уже прошли.
              </p>
            </div>
          </main>
        </>
      )}

      {/* ВКЛАДКА: КАРТА */}
      {activeTab === "map" && (
        <div className="max-w-lg mx-auto px-6 pb-12">
          {/* Фильтр по маршруту */}
          <div className="flex gap-2 flex-wrap mb-4">
            <button
              onClick={() => setSelectedBus(null)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: selectedBus === null ? "var(--accent)" : "var(--card-bg)",
                color: selectedBus === null ? "#fff" : "var(--muted-text)",
                border: "1.5px solid var(--card-border)",
              }}
            >
              Все маршруты
            </button>
            {buses.map((b) => (
              <button
                key={b.number}
                onClick={() => setSelectedBus(selectedBus === b.number ? null : b.number)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: selectedBus === b.number ? b.color : "var(--card-bg)",
                  color: selectedBus === b.number ? "#fff" : "var(--muted-text)",
                  border: `1.5px solid ${selectedBus === b.number ? b.color : "var(--card-border)"}`,
                }}
              >
                {b.number}
              </button>
            ))}
          </div>

          {/* Карта */}
          <div className="rounded-2xl overflow-hidden mb-4" style={{ border: "1.5px solid var(--card-border)" }}>
            <iframe
              src={mapSrc}
              width="100%"
              height="340"
              frameBorder="0"
              allowFullScreen
              title="Карта остановок"
              style={{ display: "block" }}
            />
          </div>

          {/* Список остановок */}
          <div className="flex flex-col gap-2">
            {filteredStops.map((stop, i) => (
              <div
                key={i}
                className="rounded-xl px-4 py-3 flex items-center gap-3"
                style={{ background: "var(--card-bg)", border: "1.5px solid var(--card-border)" }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{ background: "var(--badge-bg)", color: "var(--accent)" }}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: "var(--title)" }}>{stop.name}</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {stop.buses.map((bn) => {
                      const bus = buses.find((b) => b.number === bn);
                      return (
                        <span
                          key={bn}
                          className="text-xs px-1.5 py-0.5 rounded"
                          style={{ background: (bus?.color || "#888") + "18", color: bus?.color || "#888" }}
                        >
                          {bn}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <Icon name="MapPin" size={16} style={{ color: "var(--muted-text)" }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
