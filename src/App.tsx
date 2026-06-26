import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Toaster } from "sonner";
import { toast } from "sonner";

import heroCouple from "@/assets/hero-couple.jpg";
import storyImg from "@/assets/story.jpg";
import fabricAsooke from "@/assets/fabric-asooke.jpg";
import fabricLace from "@/assets/fabric-lace.jpg";
import fabricFila from "@/assets/fabric-fila.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";

const ASSET = (p: string) => `${import.meta.env.BASE_URL}assets/${p}`;
const LOGO = ASSET("wedding-logo.png");
const WEDDING_PARTY = ASSET("wedding-party.png");
const SEATING_PNG = ASSET("seating-chart.png");
const SEATING_PDF = ASSET("seating-chart.pdf");

const HASHTAG = "#WithLoveAT26";

type Ev = {
  key: string;
  tag: string;
  date: Date;
  time: string;
  title: string;
  venue: string;
  address: string;
  start: string;
  end: string;
};

const EVENTS: Ev[] = [
  {
    key: "court",
    tag: "Day One",
    date: new Date(2026, 11, 9),
    time: "9:00 AM",
    title: "Court Wedding",
    venue: "Ikoyi Marriage Registry",
    address: "Ikoyi, Lagos, Nigeria",
    start: "20261209T090000",
    end: "20261209T110000",
  },
  {
    key: "church",
    tag: "Day Two · Morning",
    date: new Date(2026, 11, 12),
    time: "9:00 AM",
    title: "Church Wedding",
    venue: "The Wisdom of God Church",
    address: "15 Siwoku Street, Kabowe Bus-stop, Meiran, Lagos",
    start: "20261212T090000",
    end: "20261212T113000",
  },
  {
    key: "trad",
    tag: "Day Two · Afternoon",
    date: new Date(2026, 11, 12),
    time: "12:00 PM",
    title: "Traditional Engagement",
    venue: "FF Merritage Event Center",
    address:
      "11 Agnes Adeniran Street (off Risikat Majaro Road, beside Heritage Mall), U-turn Bus-stop, Abule-Egba, Lagos",
    start: "20261212T120000",
    end: "20261212T143000",
  },
  {
    key: "reception",
    tag: "Day Two · Evening",
    date: new Date(2026, 11, 12),
    time: "3:00 PM",
    title: "Reception",
    venue: "FF Merritage Event Center",
    address:
      "11 Agnes Adeniran Street (off Risikat Majaro Road, beside Heritage Mall), U-turn Bus-stop, Abule-Egba, Lagos",
    start: "20261212T150000",
    end: "20261212T220000",
  },
];

const WEDDING_DATE = new Date("2026-12-12T09:00:00+01:00");

const ASOEBI = [
  { img: fabricAsooke, name: "Traditional Aso-Oke (Teal & Gold)", sub: "Complete Set · 4 Yards + Gele", price: "₦95,000" },
  { img: fabricLace, name: "Reception French Lace", sub: "Premium · 5 Yards + Headtie", price: "₦75,000" },
  { img: fabricFila, name: "Men's Atiku & Fila Set", sub: "Deep Teal · 4 Yards", price: "₦55,000" },
];

const SEATING: Record<string, { table: string; hall: string }> = {
  "adunni okafor": { table: "Table 4 · Coral", hall: "Reception Hall — Front Right" },
  "tunde balogun": { table: "Table 11 · Bronze", hall: "Reception Hall — Center" },
  "kemi adewale": { table: "Table 7 · Ivory", hall: "Reception Hall — Front Left" },
  "ifeanyi obi": { table: "Table 15 · Midnight", hall: "Reception Hall — Back Center" },
};

const GALLERY = [
  { src: g1, h: "row-span-2" },
  { src: g3, h: "" },
  { src: g4, h: "row-span-2" },
  { src: g2, h: "" },
];

export default function App() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Hero />
      <Story />
      <Events />
      <WeddingParty />
      <Maps />
      <Asoebi />
      <Registry />
      <Seating />
      <Gallery />
      <Footer />
      <Toaster theme="dark" position="top-center" />
    </div>
  );
}

function Hero() {
  const countdown = useCountdown(WEDDING_DATE);
  return (
    <header id="top" className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={heroCouple} alt="Oluwatobi and Adebola" className="w-full h-full object-cover object-center opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      </div>

      <div className="animate-fade-up flex flex-col items-center">
        <img src={LOGO} alt="Tobi & Adebola monogram" className="h-28 md:h-36 w-auto mb-6 drop-shadow-[0_4px_24px_rgba(225,164,66,0.35)]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] mb-6 block text-gold-light">
          Lagos, Nigeria · December 2026
        </span>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl italic leading-[0.9] text-balance mb-6">
          Oluwatobi <br className="md:hidden" />
          <span className="text-gold-shimmer not-italic">&</span> Adebola
        </h1>
        <p className="font-display italic text-lg md:text-xl text-foreground/70 max-w-xl mx-auto">
          Two families. Three ceremonies. A lifetime of love.
        </p>
        <p className="mt-6 font-mono text-xs tracking-[0.3em] uppercase text-gold-shimmer">{HASHTAG}</p>
      </div>

      <div className="mt-12 flex gap-6 md:gap-12 border-y border-border py-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
        {[
          ["Days", countdown.d],
          ["Hours", countdown.h],
          ["Mins", countdown.m],
          ["Secs", countdown.s],
        ].map(([label, v]) => (
          <div key={label as string} className="flex flex-col min-w-[60px]">
            <span className="font-display text-4xl md:text-5xl tabular-nums">{String(v).padStart(2, "0")}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-60 mt-1">{label}</span>
          </div>
        ))}
      </div>

      <div className="absolute -bottom-8 left-0 w-full opacity-[0.05] select-none pointer-events-none">
        <span className="text-[18vw] font-display italic whitespace-nowrap text-primary">{HASHTAG}</span>
      </div>
    </header>
  );
}

function Story() {
  return (
    <section id="story" className="max-w-5xl mx-auto py-28 px-6 grid md:grid-cols-2 gap-16 items-center">
      <img src={storyImg} alt="The couple at golden hour" loading="lazy" className="aspect-[4/5] w-full object-cover" />
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-4">Our Story</span>
        <h2 className="font-display text-5xl italic mb-8 leading-tight">A Decade in the Making</h2>
        <div className="space-y-5 text-pretty leading-relaxed text-foreground/80">
          <p>It began in the quiet halls of the University of Lagos, where a borrowed textbook turned into a four-hour conversation at the faculty lounge.</p>
          <p>From Lagos to London and back again, we've grown through every season — always finding our way back to the simple joy of each other's company.</p>
          <p className="font-display text-2xl italic text-primary pt-2">"I found the one my soul loves."</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">— Song of Solomon 3:4</p>
        </div>
      </div>
    </section>
  );
}

function Events() {
  const eventDates = useMemo(() => EVENTS.map((e) => e.date), []);
  const [selected, setSelected] = useState<Date | undefined>(EVENTS[0].date);

  const selectedEvents = useMemo(() => {
    if (!selected) return [];
    return EVENTS.filter(
      (e) =>
        e.date.getFullYear() === selected.getFullYear() &&
        e.date.getMonth() === selected.getMonth() &&
        e.date.getDate() === selected.getDate(),
    );
  }, [selected]);

  return (
    <section id="events" className="relative py-28 px-6 border-y border-border bg-card">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3 block">The Calendar</span>
          <h2 className="font-display text-5xl md:text-6xl italic">Mark Your Dates</h2>
          <p className="mt-4 text-sm opacity-70 italic max-w-md mx-auto">
            Click a highlighted date to see the event details.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="flex justify-center">
            <div className="bg-background border border-border p-6 shadow-2xl">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                defaultMonth={new Date(2026, 11, 1)}
                modifiers={{ event: eventDates }}
                modifiersClassNames={{
                  event: "event-day",
                  selected: "selected-day",
                }}
                classNames={{
                  root: "rdp-custom",
                }}
              />
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border text-[10px] uppercase tracking-[0.22em] opacity-70">
                <span className="inline-block w-3 h-3 rounded-full bg-gradient-gold" />
                Wedding event date
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-l-2 border-primary pl-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-2">
                {selected
                  ? selected.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
                  : "Select a date"}
              </span>
              <h3 className="font-display text-3xl italic">
                {selectedEvents.length === 0
                  ? "No events on this day"
                  : selectedEvents.length === 1
                    ? selectedEvents[0].title
                    : `${selectedEvents.length} ceremonies on this day`}
              </h3>
            </div>

            {selectedEvents.length === 0 ? (
              <p className="text-sm opacity-60 italic pl-5">Try Dec 9 or Dec 12, 2026.</p>
            ) : (
              selectedEvents.map((e) => (
                <article key={e.key} className="bg-background border border-border p-6 animate-fade-up">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{e.tag}</span>
                    <span className="font-mono text-xs text-foreground/70">{e.time}</span>
                  </div>
                  <h4 className="font-display text-2xl italic mb-2">{e.title}</h4>
                  <p className="text-sm text-foreground/80 font-medium">{e.venue}</p>
                  <p className="text-xs text-foreground/60 italic mt-1">{e.address}</p>
                  <a
                    href={makeIcs(`Oluwatobi & Adebola — ${e.title}`, `${e.venue}, ${e.address}`, e.start, e.end)}
                    download={`${e.title}.ics`}
                    className="mt-5 inline-block text-[10px] uppercase tracking-[0.22em] border border-border px-4 py-2.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                  >
                    Add to Calendar
                  </a>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function WeddingParty() {
  return (
    <section id="dress-code" className="py-28 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3 block">Our Aso-Ebi Family</span>
          <h2 className="font-display text-5xl md:text-6xl italic mb-6 leading-tight">Wear Our Colours</h2>
          <p className="text-base opacity-80 leading-relaxed mb-4">
            Our family and friends will be glowing in tones of <span className="text-primary italic">teal, emerald</span>,
            and <span className="text-primary italic">gold</span> across both wedding days.
          </p>
          <p className="text-sm opacity-60 italic">
            Order your aso-ebi fabric below to join the family portrait.
          </p>
        </div>
        <div className="border border-border bg-card p-3">
          <img
            src={WEDDING_PARTY}
            alt="Wedding party in teal and gold aso-ebi"
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Maps() {
  const venues = [
    {
      tag: "Day Two · Morning",
      title: "Church Wedding",
      name: "The Wisdom of God Church",
      address: "15 Siwoku Street, Kabowe Bus-stop, Meiran, Lagos",
      query: "15 Siwoku Street, Meiran, Lagos",
    },
    {
      tag: "Day Two · Afternoon & Evening",
      title: "Traditional Engagement & Reception",
      name: "FF Merritage Event Center",
      address: "11 Agnes Adeniran Street (off Risikat Majaro Road), U-turn Bus-stop, Abule-Egba, Lagos",
      query: "11 Agnes Adeniran Street, Abule Egba, Lagos",
    },
  ];

  return (
    <section id="venue" className="px-6 pb-28">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3 block">The Venues</span>
          <h2 className="font-display text-5xl md:text-6xl italic">Find Your Way</h2>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {venues.map((v) => (
            <div key={v.title} className="border border-border bg-card flex flex-col">
              <div className="p-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2 block">{v.tag}</span>
                <h3 className="font-display text-3xl italic mb-3 leading-tight">{v.title}</h3>
                <p className="text-sm font-medium">{v.name}</p>
                <p className="text-sm opacity-70 italic mt-1 mb-4">{v.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.query)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary font-mono text-[10px] uppercase tracking-[0.22em] underline decoration-primary/40 underline-offset-4"
                >
                  Open in Google Maps →
                </a>
              </div>
              <div className="min-h-[320px] bg-muted">
                <iframe
                  title={`Map — ${v.title}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(v.query)}&output=embed`}
                  className="w-full h-full min-h-[320px] grayscale-[0.4] contrast-[0.95]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Asoebi() {
  const whatsapp = (item: string) =>
    `https://wa.me/2348000000000?text=${encodeURIComponent(`Hi! I'd like to order: ${item}`)}`;

  return (
    <section id="asoebi" className="bg-card py-28 px-6 border-y border-border">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3 block">Aso-Ebi Shop</span>
          <h2 className="font-display text-5xl italic mb-6 leading-tight">Join Our Family in Fabric</h2>
          <p className="text-sm leading-relaxed mb-8 opacity-70">
            Hand-picked fabrics for the traditional engagement and reception. Place your order via WhatsApp and pay on confirmation.
          </p>
          <div className="p-6 bg-background border border-border">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3 text-primary">Payment Details</p>
            <p className="text-sm font-medium">GTBank · Adebola & Tobi</p>
            <p className="text-sm tabular-nums opacity-80">0123 456 789</p>
          </div>
        </div>

        <div className="md:col-span-2 grid sm:grid-cols-3 gap-6">
          {ASOEBI.map((a) => (
            <div key={a.name} className="bg-background border border-border p-4 flex flex-col">
              <img src={a.img} alt={a.name} loading="lazy" className="aspect-square w-full object-cover mb-4" />
              <h4 className="font-display text-xl italic leading-tight">{a.name}</h4>
              <p className="text-[10px] uppercase tracking-widest opacity-50 mt-1 mb-3">{a.sub}</p>
              <p className="font-mono text-sm text-primary mb-4">{a.price}</p>
              <a
                href={whatsapp(a.name)}
                target="_blank"
                rel="noreferrer"
                className="mt-auto block text-center py-3 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.22em] font-semibold hover:bg-bronze-deep hover:text-cream transition-colors"
              >
                Order via WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Registry() {
  return (
    <section id="registry" className="py-28 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3 block">Gifts & Blessings</span>
        <h2 className="font-display text-5xl md:text-6xl italic mb-4">Your Presence is Our Gift</h2>
        <p className="text-sm opacity-70 max-w-lg mx-auto italic">
          Should you wish to honour us further, we have made a few options below.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <GiftCard tag="Honeymoon Fund" title="A Trip to Zanzibar" body="Help us toast our new chapter on a quiet East African beach." cta="Contribute" href="#registry" />
        <GiftCard tag="Home Registry" title="Our First Home" body="Curated essentials for the Lagos apartment we're building together." cta="View Registry" href="https://www.amazon.com/wedding" />
        <GiftCard
          tag="Direct Gift"
          title="Bank Transfer"
          body={
            <span className="block font-mono text-xs leading-relaxed">
              GTBank<br />
              0123 456 789<br />
              Adebola & Tobi
            </span>
          }
          cta="Copy Account"
          onClick={() => {
            navigator.clipboard?.writeText("0123456789");
            toast.success("Account number copied");
          }}
        />
      </div>
    </section>
  );
}

function GiftCard({ tag, title, body, cta, href, onClick }: { tag: string; title: string; body: React.ReactNode; cta: string; href?: string; onClick?: () => void }) {
  const inner = (
    <>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-4">{tag}</span>
      <h3 className="font-display text-3xl italic mb-4 leading-tight">{title}</h3>
      <div className="text-sm opacity-75 mb-8 leading-relaxed">{body}</div>
      <span className="inline-block text-[10px] uppercase tracking-[0.22em] border-b border-primary pb-1 text-primary group-hover:text-cream group-hover:border-cream transition-colors">{cta} →</span>
    </>
  );
  const className = "group block p-10 bg-card border border-border hover:bg-bronze-deep hover:border-primary transition-colors";
  if (onClick) return <button onClick={onClick} className={`${className} text-left`}>{inner}</button>;
  return <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={className}>{inner}</a>;
}

function Seating() {
  const [query, setQuery] = useState("");
  const result = useMemo<null | "missing" | { table: string; hall: string }>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const match = SEATING[q];
    return match ?? "missing";
  }, [query]);

  return (
    <section id="seating" className="py-28 px-6 bg-card border-y border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3 block">Seating Chart</span>
          <h2 className="font-display text-5xl md:text-6xl italic mb-4">The Reception Floor Plan</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={(e) => e.preventDefault()} className="relative mb-6">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search your name…"
              className="w-full border-b border-border py-4 bg-transparent focus:outline-none focus:border-primary font-display italic text-2xl text-center placeholder:opacity-30"
            />
          </form>

          <div className="min-h-[80px] text-center">
            {result === "missing" && (
              <p className="text-sm text-foreground/60 italic">
                We couldn't find that name. Please check your invitation or reach out to the bridal party.
              </p>
            )}
            {result && result !== "missing" && (
              <div className="border border-primary/40 p-6 bg-background animate-fade-up">
                <p className="font-display text-3xl italic text-primary">{result.table}</p>
                <p className="text-xs opacity-70 mt-2 uppercase tracking-[0.2em]">{result.hall}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-20">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-2">Reception Floor Plan</span>
              <h3 className="font-display text-3xl italic">The Hall, At a Glance</h3>
            </div>
            <a
              href={SEATING_PDF}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] uppercase tracking-[0.22em] border border-border px-4 py-2.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              Download PDF →
            </a>
          </div>
          <div className="border border-border bg-cream p-4 md:p-6">
            <img
              src={SEATING_PNG}
              alt="Reception seating chart and floor plan for Tobi and Adebola's wedding"
              loading="lazy"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="py-28 px-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3 block">Moments</span>
          <h2 className="font-display text-5xl md:text-6xl italic">The Gallery</h2>
        </div>
        <p className="hidden md:block text-sm opacity-60 italic max-w-xs text-right">Pre-wedding glimpses of our journey so far.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 auto-rows-[200px] md:auto-rows-[220px]">
        {GALLERY.map((g, i) => (
          <div key={i} className={`overflow-hidden ${g.h}`}>
            <img src={g.src} alt="" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 border-t border-border text-center px-6">
      <img src={LOGO} alt="Tobi & Adebola monogram" className="h-16 w-auto mx-auto mb-4 opacity-90" />
      <p className="font-display italic text-3xl text-gold-shimmer mb-2">{HASHTAG}</p>
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-50 text-balance max-w-md mx-auto mt-4">
        With deep gratitude to our parents, family, and dear friends who have walked this road with us.
      </p>
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-30 mt-8">
        Lagos · Nigeria · MMXXVI
      </p>
    </footer>
  );
}

/* ---------- helpers ---------- */

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

function makeIcs(title: string, location: string, start: string, end: string) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tobi & Adebola//EN",
    "BEGIN:VEVENT",
    `UID:${start}-${title.replace(/\s+/g, "")}@withloveat26`,
    `DTSTAMP:${start}Z`,
    `DTSTART;TZID=Africa/Lagos:${start}`,
    `DTEND;TZID=Africa/Lagos:${end}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
