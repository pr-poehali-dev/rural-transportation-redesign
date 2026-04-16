import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const places = [
  {
    id: "church",
    name: "Преображенская церковь",
    category: "Архитектура",
    categoryIcon: "Church",
    emoji: "⛪",
    description:
      "Православная церковь Преображения Господня — духовное сердце посёлка. Красивое здание с историей, открыто для посещения. Рядом тихий сквер, где можно посидеть в тишине.",
    tags: ["Архитектура", "История", "Тишина"],
    season: "Круглый год",
    color: "#7c5c2e",
    image:
      "https://cdn.poehali.dev/projects/60bf6a92-443a-4290-a9f2-d7aae8d046dc/files/c50cf7a2-1311-429b-98d5-6334ea9d565d.jpg",
  },
  {
    id: "spring",
    name: "Родник Ключик",
    category: "Природа",
    categoryIcon: "Droplets",
    emoji: "💧",
    description:
      "Чистейший природный родник, давший название посёлку. Вода ледяная даже в жару. Местные жители набирают воду для питья — считается очень чистой. Место тихое и умиротворяющее.",
    tags: ["Природа", "Вода", "Прогулка"],
    season: "Круглый год",
    color: "#1a6fa8",
    image:
      "https://cdn.poehali.dev/projects/60bf6a92-443a-4290-a9f2-d7aae8d046dc/files/2b0c1385-1adb-4e67-be38-16bbef633711.jpg",
  },
  {
    id: "river",
    name: "Берега Исети и реки Ключик",
    category: "Природа",
    categoryIcon: "Waves",
    emoji: "🌊",
    description:
      "Живописные берега двух рек — Исети и небольшой речки Ключик. Летом здесь купаются и рыбачат, осенью красиво гулять вдоль воды. Хорошие места для пикника с видом на реку.",
    tags: ["Рыбалка", "Купание", "Пикник"],
    season: "Лето · Осень",
    color: "#2d6a8a",
    image:
      "https://cdn.poehali.dev/projects/60bf6a92-443a-4290-a9f2-d7aae8d046dc/files/cfc2194b-2fb7-45d2-9e90-6f50596c0450.jpg",
  },
  {
    id: "forest",
    name: "Сосновый бор",
    category: "Природа",
    categoryIcon: "Trees",
    emoji: "🌲",
    description:
      "Настоящий уральский сосновый бор прямо у посёлка. Воздух пропитан смолой, тихо, чисто. Летом собирают грибы и ягоды, зимой ходят на лыжах. Отличное место для прогулки всей семьёй.",
    tags: ["Грибы", "Лыжи", "Прогулка"],
    season: "Круглый год",
    color: "#2d6a4f",
    image:
      "https://cdn.poehali.dev/projects/60bf6a92-443a-4290-a9f2-d7aae8d046dc/files/02cd31e7-8454-4ee0-a502-317cce69d21a.jpg",
  },
  {
    id: "shop",
    name: "Пятёрочка",
    category: "Магазин",
    categoryIcon: "ShoppingBag",
    emoji: "🛒",
    description:
      "Продуктовый магазин Пятёрочка — основной магазин посёлка. Есть всё необходимое: продукты, бытовая химия, напитки. Удобная остановка перед поездкой или прогулкой.",
    tags: ["Продукты", "Удобно", "Рядом"],
    season: "Круглый год",
    color: "#c0392b",
    image: null,
  },
];

const seasonColors: Record<string, string> = {
  "Круглый год": "#2d6a4f",
  "Лето · Осень": "#e67e22",
  Лето: "#e67e22",
  Зима: "#1a6fa8",
};

export default function Places() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)", fontFamily: "'Golos Text', sans-serif" }}
    >
      {/* Шапка */}
      <header className="px-6 pt-10 pb-6 max-w-lg mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 mb-5 text-sm font-medium"
          style={{ color: "var(--muted-text)" }}
        >
          <Icon name="ChevronLeft" size={16} />
          Назад
        </button>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">📍</span>
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "var(--muted-text)" }}
          >
            посёлок Ключи
          </span>
        </div>
        <h1
          className="text-3xl font-bold"
          style={{ color: "var(--title)", fontFamily: "'Oswald', sans-serif" }}
        >
          Куда сходить
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-text)" }}>
          {places.length} мест · Свердловская область
        </p>
      </header>

      {/* Карта */}
      <div className="max-w-lg mx-auto px-6 mb-6">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1.5px solid var(--card-border)" }}
        >
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=60.8320%2C56.5997&z=14&l=map&pt=60.8310%2C56.6010%2Cpm2bl1~60.8330%2C56.6005%2Cpm2bl2~60.8280%2C56.5970%2Cpm2bl3~60.8350%2C56.6030%2Cpm2bl4~60.8300%2C56.5990%2Cpm2bl5"
            width="100%"
            height="260"
            frameBorder="0"
            allowFullScreen
            title="Карта мест"
            style={{ display: "block" }}
          />
        </div>
        {/* Легенда */}
        <div className="flex flex-wrap gap-2 mt-3">
          {places.map((p, i) => (
            <div key={p.id} className="flex items-center gap-1.5">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                style={{ background: p.color }}
              >
                {i + 1}
              </span>
              <span className="text-xs" style={{ color: "var(--muted-text)" }}>{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Карточки */}
      <main className="max-w-lg mx-auto px-6 flex flex-col gap-4 pb-12">
        {places.map((place) => (
          <div
            key={place.id}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "var(--card-bg)",
              border: "1.5px solid var(--card-border)",
            }}
          >
            {/* Фото */}
            {place.image ? (
              <div className="relative h-44 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.45) 100%)",
                  }}
                />
                <span
                  className="absolute bottom-3 left-4 text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(6px)" }}
                >
                  {place.category}
                </span>
              </div>
            ) : (
              <div
                className="h-24 flex items-center justify-center text-5xl"
                style={{ background: place.color + "12" }}
              >
                {place.emoji}
              </div>
            )}

            {/* Контент */}
            <div className="px-5 py-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h2
                  className="text-lg font-bold leading-tight"
                  style={{ color: "var(--title)", fontFamily: "'Oswald', sans-serif" }}
                >
                  {place.name}
                </h2>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 mt-0.5"
                  style={{
                    background: (seasonColors[place.season] || "#888") + "18",
                    color: seasonColors[place.season] || "#888",
                  }}
                >
                  {place.season}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted-text)" }}>
                {place.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {place.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-lg font-medium"
                    style={{ background: "var(--time-bg)", color: "var(--title)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div
          className="rounded-2xl px-5 py-4 flex items-center gap-3"
          style={{ background: "var(--badge-bg)", border: "1.5px solid var(--card-border)" }}
        >
          <Icon name="MapPin" size={18} />
          <p className="text-sm" style={{ color: "var(--accent)" }}>
            Все места находятся в шаговой доступности или в паре минут езды от центра посёлка.
          </p>
        </div>
      </main>
    </div>
  );
}