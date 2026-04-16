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
  },
  {
    number: "№ 104",
    route: "Деревня → Станция",
    scheduleOut: ["07:00", "13:20", "17:00"],
    scheduleBack: ["09:05", "14:55", "18:40"],
    days: "Ежедневно",
    note: "Проездной не действует",
  },
  {
    number: "№ 117",
    route: "Деревня → Поликлиника",
    scheduleOut: ["08:00", "14:00"],
    scheduleBack: ["10:30", "16:15"],
    days: "Вт, Чт, Сб",
    note: null,
  },
];

const now = new Date();
const currentTime = now.getHours() * 60 + now.getMinutes();

function timeToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function getNextDeparture(times: string[]) {
  const upcoming = times.find((t) => timeToMinutes(t) > currentTime);
  return upcoming || null;
}

export default function Index() {
  const [direction, setDirection] = useState<"out" | "back">("out");

  return (
    <div className="min-h-screen font-golos" style={{ background: "var(--bg)" }}>
      {/* Шапка */}
      <header className="px-6 pt-10 pb-6 max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">🚌</span>
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--muted-text)" }}>
            расписание автобусов
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight" style={{ color: "var(--title)", fontFamily: "'Oswald', sans-serif" }}>
          Транспорт деревни
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-text)" }}>
          3 маршрута · обновлено вручную
        </p>
      </header>

      {/* Переключатель направления */}
      <div className="max-w-lg mx-auto px-6 mb-6">
        <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: "var(--card-border)" }}>
          <button
            onClick={() => setDirection("out")}
            className="flex-1 py-3 text-sm font-semibold transition-all duration-200"
            style={{
              background: direction === "out" ? "var(--accent)" : "var(--card-bg)",
              color: direction === "out" ? "#fff" : "var(--muted-text)",
            }}
          >
            Из деревни
          </button>
          <button
            onClick={() => setDirection("back")}
            className="flex-1 py-3 text-sm font-semibold transition-all duration-200"
            style={{
              background: direction === "back" ? "var(--accent)" : "var(--card-bg)",
              color: direction === "back" ? "#fff" : "var(--muted-text)",
            }}
          >
            В деревню
          </button>
        </div>
      </div>

      {/* Карточки маршрутов */}
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
                animationDelay: `${i * 80}ms`,
              }}
            >
              {/* Шапка карточки */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-md"
                      style={{ background: "var(--badge-bg)", color: "var(--accent)" }}
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

                {/* Следующий рейс */}
                {next ? (
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-xs" style={{ color: "var(--muted-text)" }}>
                      следующий
                    </p>
                    <p className="text-xl font-bold" style={{ color: "var(--accent)", fontFamily: "'Oswald', sans-serif" }}>
                      {next}
                    </p>
                  </div>
                ) : (
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-xs" style={{ color: "var(--muted-text)" }}>
                      на сегодня
                    </p>
                    <p className="text-sm font-semibold" style={{ color: "var(--muted-text)" }}>
                      всё
                    </p>
                  </div>
                )}
              </div>

              {/* Все рейсы */}
              <div className="flex flex-wrap gap-2">
                {times.map((t, j) => {
                  const isPast = timeToMinutes(t) <= currentTime;
                  const isNext = t === next;
                  return (
                    <span
                      key={j}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                      style={{
                        background: isNext
                          ? "var(--accent)"
                          : isPast
                          ? "var(--past-bg)"
                          : "var(--time-bg)",
                        color: isNext
                          ? "#fff"
                          : isPast
                          ? "var(--muted-text)"
                          : "var(--title)",
                        opacity: isPast ? 0.5 : 1,
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

        {/* Подсказка */}
        <div className="flex items-center gap-2 mt-2 px-1">
          <Icon name="Info" size={14} />
          <p className="text-xs" style={{ color: "var(--muted-text)" }}>
            Выделено — ближайший рейс. Серые — уже прошли.
          </p>
        </div>
      </main>
    </div>
  );
}
