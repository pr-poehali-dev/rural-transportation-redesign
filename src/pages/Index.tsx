import { useState } from "react";
import Icon from "@/components/ui/icon";

const buses = [
  {
    number: "109",
    from: "Двуреченск",
    to: "Автостанция Сысерть",
    stops: ["Двуреченск", "Ключи", "Фомино", "Черданцево", "Кашино", "Сысерть"],
    scheduleOut: ["06:23", "08:10", "11:40", "14:55", "17:30"],
    scheduleBack: ["07:30", "09:50", "13:00", "16:10", "18:45"],
    days: "Ежедневно",
    color: "#2d6a4f",
  },
  {
    number: "182",
    from: "Двуреченск",
    to: "Екатеринбург",
    stops: ["Двуреченск", "Ключи", "Фомино", "Бобровский", "Арамиль", "Екатеринбург"],
    scheduleOut: ["05:50", "09:20", "13:10", "16:40"],
    scheduleBack: ["08:00", "11:30", "15:20", "18:50"],
    days: "Ежедневно",
    color: "#1a5c8a",
  },
  {
    number: "133",
    from: "Двуреченск",
    to: "Екатеринбург",
    stops: ["Двуреченск", "Ключи", "Фомино", "Черданцево", "Арамиль", "Екатеринбург"],
    scheduleOut: ["06:09", "10:05", "14:00", "17:15"],
    scheduleBack: ["08:30", "12:20", "16:00", "19:10"],
    days: "Ежедневно",
    color: "#8a4a1a",
  },
];

const mapStops = [
  {
    name: "Ключи-2",
    address: "ул. 9-й Пятилетки, 9",
    lat: 56.6018,
    lng: 60.8348,
    buses: ["109", "182", "133"],
  },
  {
    name: "Ключи-1",
    address: "ул. Ленина, 5/1",
    lat: 56.5998,
    lng: 60.8320,
    buses: ["109", "182", "133"],
  },
  {
    name: "Поворот на Ключи",
    address: "с трассы 65К-2511000",
    lat: 56.5975,
    lng: 60.8290,
    buses: ["109", "182", "133"],
  },
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
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedBus, setSelectedBus] = useState<string | null>(null);

  const filteredStops = selectedBus
    ? mapStops.filter((s) => s.buses.includes(selectedBus))
    : mapStops;

  const mapSrc = `https://yandex.ru/map-widget/v1/?ll=60.8320%2C56.5997&z=14&l=map&pt=${filteredStops
    .map((s, i) => `${s.lng},${s.lat},pm2rd${i + 1}`)
    .join("~")}`;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", fontFamily: "'Golos Text', sans-serif" }}>
      {/* Шапка */}
      <header className="px-6 pt-10 pb-5 max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🚌</span>
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--muted-text)" }}>
            пригородные автобусы
          </span>
        </div>
        <h1 className="text-3xl font-bold" style={{ color: "var(--title)", fontFamily: "'Oswald', sans-serif" }}>
          Д. Ключи — Сысерть
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-text)" }}>
          3 маршрута · Свердловская область
        </p>

      </header>

      {/* Вкладки */}
      <div className="max-w-lg mx-auto px-6 mb-4">
        <div className="flex rounded-xl overflow-hidden" style={{ border: "1.5px solid var(--card-border)" }}>
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

      {/* РАСПИСАНИЕ */}
      {activeTab === "schedule" && (
        <>
          <div className="max-w-lg mx-auto px-6 mb-5">
            <div className="flex rounded-xl overflow-hidden" style={{ border: "1.5px solid var(--card-border)" }}>
              <button
                onClick={() => setDirection("out")}
                className="flex-1 py-2.5 text-sm font-medium transition-all duration-200"
                style={{
                  background: direction === "out" ? "#e8f5ee" : "var(--card-bg)",
                  color: direction === "out" ? "var(--accent)" : "var(--muted-text)",
                  borderRight: "1.5px solid var(--card-border)",
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

          <main className="max-w-lg mx-auto px-6 flex flex-col gap-3 pb-12">
            {buses.map((bus) => {
              const times = direction === "out" ? bus.scheduleOut : bus.scheduleBack;
              const next = getNextDeparture(times);
              const isOpen = expanded === bus.number;

              return (
                <div
                  key={bus.number}
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{ background: "var(--card-bg)", border: "1.5px solid var(--card-border)" }}
                >
                  <button
                    className="w-full text-left px-5 pt-5 pb-4"
                    onClick={() => setExpanded(isOpen ? null : bus.number)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div
                          className="text-2xl font-black leading-none px-2 py-1 rounded-lg shrink-0"
                          style={{
                            fontFamily: "'Oswald', sans-serif",
                            background: bus.color + "18",
                            color: bus.color,
                          }}
                        >
                          {bus.number}
                        </div>
                        <div>
                          <p className="text-sm font-bold leading-tight" style={{ color: "var(--title)" }}>
                            {bus.from} — {bus.to}
                          </p>
                          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--muted-text)" }}>
                            {bus.stops.join(" → ")}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: "var(--muted-text)" }}>{bus.days}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0 ml-3">
                        {next ? (
                          <>
                            <p className="text-[10px] uppercase tracking-wide" style={{ color: "var(--muted-text)" }}>
                              ближайший
                            </p>
                            <p
                              className="text-2xl font-black leading-tight"
                              style={{ color: bus.color, fontFamily: "'Oswald', sans-serif" }}
                            >
                              {next}
                            </p>
                            <p className="text-[10px]" style={{ color: "var(--muted-text)" }}>
                              {direction === "out" ? "из Ключей" : "в Ключи"}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-[10px] uppercase tracking-wide" style={{ color: "var(--muted-text)" }}>
                              сегодня
                            </p>
                            <p className="text-sm font-semibold" style={{ color: "var(--muted-text)" }}>всё</p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {times.map((t, j) => {
                        const isPast = timeToMinutes(t) <= currentTime;
                        const isNext = t === next;
                        return (
                          <span
                            key={j}
                            className="px-2.5 py-1 rounded-lg text-sm font-semibold"
                            style={{
                              fontFamily: "'Oswald', sans-serif",
                              background: isNext ? bus.color : isPast ? "var(--past-bg)" : "var(--time-bg)",
                              color: isNext ? "#fff" : isPast ? "var(--muted-text)" : "var(--title)",
                              opacity: isPast ? 0.4 : 1,
                              letterSpacing: "0.03em",
                            }}
                          >
                            {t}
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-1 mt-3" style={{ color: "var(--muted-text)" }}>
                      <span className="text-xs">{isOpen ? "Скрыть маршрут" : "Все остановки"}</span>
                      <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={14} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1" style={{ borderTop: "1px solid var(--card-border)" }}>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-text)" }}>
                        Маршрут
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {bus.stops.map((stop, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                              style={{ background: bus.color + "20", color: bus.color }}
                            >
                              {idx + 1}
                            </div>
                            <span
                              className="text-sm"
                              style={{
                                color: stop === "Ключи" ? bus.color : "var(--title)",
                                fontWeight: stop === "Ключи" ? 700 : 400,
                              }}
                            >
                              {stop}
                              {stop === "Ключи" && (
                                <span className="ml-1 text-xs" style={{ color: "var(--muted-text)" }}>← вы здесь</span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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

      {/* КАРТА */}
      {activeTab === "map" && (
        <div className="max-w-lg mx-auto px-6 pb-12">
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
              Все
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
                № {b.number}
              </button>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden mb-4" style={{ border: "1.5px solid var(--card-border)" }}>
            <iframe
              src={mapSrc}
              width="100%"
              height="320"
              frameBorder="0"
              allowFullScreen
              title="Карта остановок"
              style={{ display: "block" }}
            />
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider mb-3 px-1" style={{ color: "var(--muted-text)" }}>
            Места остановок в Ключах
          </p>
          <div className="flex flex-col gap-2">
            {filteredStops.map((stop, i) => (
              <div
                key={i}
                className="rounded-xl px-4 py-3 flex items-center gap-3"
                style={{ background: "var(--card-bg)", border: "1.5px solid var(--card-border)" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                  style={{ background: "var(--badge-bg)", color: "var(--accent)", fontFamily: "'Oswald', sans-serif" }}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: "var(--title)" }}>{stop.name}</p>
                  <p className="text-xs" style={{ color: "var(--muted-text)" }}>{stop.address}</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {stop.buses.map((bn) => {
                      const bus = buses.find((b) => b.number === bn);
                      return (
                        <span
                          key={bn}
                          className="text-xs px-1.5 py-0.5 rounded font-semibold"
                          style={{ background: (bus?.color || "#888") + "18", color: bus?.color || "#888" }}
                        >
                          № {bn}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <Icon name="MapPin" size={16} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}