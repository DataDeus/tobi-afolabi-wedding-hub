import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Toaster } from "sonner";
import { toast } from "sonner";

const ASSET = (p: string) => `${import.meta.env.BASE_URL}assets/${p}`;
const LOGO = ASSET("wedding-logo.png");
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
    date: new Date(2026, 8, 9),
    time: "9:00 AM",
    title: "Court Wedding",
    venue: "Ikoyi Marriage Registry",
    address: "Ikoyi, Lagos, Nigeria",
    start: "20260909T090000",
    end: "20260909T110000",
  },
  {
    key: "church",
    tag: "Day Two · Morning",
    date: new Date(2026, 8, 12),
    time: "9:00 AM",
    title: "Church Wedding",
    venue: "The Wisdom of God Church",
    address: "15 Siwoku Street, Kabowe Bus-stop, Meiran, Lagos",
    start: "20260912T090000",
    end: "20260912T113000",
  },
  {
    key: "trad",
    tag: "Day Two · Afternoon",
    date: new Date(2026, 8, 12),
    time: "12:00 PM",
    title: "Traditional Engagement",
    venue: "FF Merritage Event Center",
    address:
      "11 Agnes Adeniran Street (off Risikat Majaro Road, beside Heritage Mall), U-turn Bus-stop, Abule-Egba, Lagos",
    start: "20260912T120000",
    end: "20260912T143000",
  },
  {
    key: "reception",
    tag: "Day Two · Evening",
    date: new Date(2026, 8, 12),
    time: "3:00 PM",
    title: "Reception",
    venue: "FF Merritage Event Center",
    address:
      "11 Agnes Adeniran Street (off Risikat Majaro Road, beside Heritage Mall), U-turn Bus-stop, Abule-Egba, Lagos",
    start: "20260912T150000",
    end: "20260912T220000",
  },
];

const WEDDING_DATE = new Date("2026-09-12T09:00:00+01:00");

const ASOEBI_ITEMS = [
  { name: "Traditional Aso-Oke (Teal & Gold)", sub: "Complete Set · 4 Yards + Gele", price: "₦95,000", motif: "◈" },
  { name: "Reception French Lace", sub: "Premium · 5 Yards + Headtie", price: "₦75,000", motif: "❖" },
  { name: "Men's Atiku & Fila Set", sub: "Deep Teal · 4 Yards", price: "₦55,000", motif: "✦" },
];

export default function App() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Hero />
      <Story />
      <Events />
      <Maps />
      <Asoebi />
      <Registry />
      <Seating />
      <Footer />
      <Toaster theme="dark" position="top-center" />
    </div>
  );
}

function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-primary ${className}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
      <Heart className="h-3 w-3" />
      <span className="text-lg">✦</span>
      <Heart className="h-3 w-3" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
    </div>
  );
}

function Heart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 21s-7.5-4.6-9.5-9.2C1.1 8.1 3.5 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.5 0 5.9 3.6 4.5 7.3C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function Hero() {
  const countdown = useCountdown(WEDDING_DATE);
  return (
    <header id="top" className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-midnight-deep via-background to-background" />
      <div className="absolute inset-0 -z-10 opacity-[0.08] pointer-events-none">
        <div className="absolute top-16 left-10 text-6xl text-primary">✦</div>
        <div className="absolute top-32 right-16 text-8xl text-primary">❖</div>
        <div className="absolute bottom-24 left-20 text-7xl text-primary">◈</div>
        <div className="absolute bottom-40 right-10 text-5xl text-primary">✦</div>
      </div>

      <div className="animate-fade-up flex flex-col items-center">
        <img src={LOGO} alt="Tobi & Adebola monogram" className="h-28 md:h-40 w-auto mb-6 drop-shadow-[0_4px_24px_rgba(225,164,66,0.35)]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] mb-6 block text-gold-light">
          Lagos, Nigeria · September 2026
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
  const oluwatobi1 = [
    "Every love story has a beginning, and ours began long before we knew it would become forever.",
    "We had been friends for a while: sharing conversations, laughter, and little moments that quietly laid the foundation for something deeper.",
    "Then one day, it started with a simple WhatsApp message.",
  ];
  const adebola1 = [
    "There was something special about her response.",
    "It wasn't just the calmness in her words or the gentle way she turned my question into one of her own; it was the swiftness, the unspoken certainty behind it, almost as if her reply carried the silent question:",
  ];
  const oluwatobi2 = [
    "Later that night, he called.",
    "I remember it vividly. There was no room for pretence, no beating around the bush. I asked the question that mattered most:",
  ];
  const adebola2 = [
    "At that moment, I knew this was it; the kind of moment you don't let slip away.",
    "Like the old saying goes, strike while the iron is hot.",
  ];

  return (
    <section id="story" className="max-w-3xl mx-auto py-28 px-6">
      <div className="text-center mb-14">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-4">Our Story</span>
        <h2 className="font-display text-5xl md:text-6xl italic mb-4 leading-tight">Story Time, Grab Some Popcorn 🍿</h2>
        <Ornament className="mt-6" />
      </div>

      <div className="space-y-10 text-pretty leading-relaxed text-foreground/85">
        <Voice name="Oluwatobi">
          {oluwatobi1.map((p, i) => <p key={i}>{p}</p>)}
          <p className="font-display italic text-2xl text-primary pt-2">"Would you like to go to the cinema with me?"</p>
          <p>he asked.</p>
          <p>I smiled and replied,</p>
          <p className="font-display italic text-2xl text-primary">"Are you saying you want to take me on a movie date?"</p>
        </Voice>

        <Divider />

        <Voice name="Adebola">
          {adebola1.map((p, i) => <p key={i}>{p}</p>)}
          <p className="font-display italic text-2xl text-primary pt-2">"What took you so long?"</p>
          <p>That was all the encouragement I needed.</p>
          <p className="font-display italic text-xl text-foreground/80">"Let's talk about it tonight. Will you call me?" she said.</p>
          <p className="font-display italic text-xl text-foreground/80">"Yes, I will," I replied.</p>
          <p>And I knew that call would change everything.</p>
        </Voice>

        <Divider />

        <Voice name="Oluwatobi">
          {oluwatobi2.map((p, i) => <p key={i}>{p}</p>)}
          <p className="font-display italic text-2xl text-primary pt-2">"Why do you like me?"</p>
          <p>He paused, and then answered with a sincerity I'll never forget:</p>
          <p className="font-display italic text-2xl text-primary">"To be honest, I like you… but I have no reason."</p>
          <p>Strangely enough, that was the perfect answer.</p>
          <p>Because sometimes love doesn't arrive with explanations. Sometimes, it simply is.</p>
        </Voice>

        <Divider />

        <Voice name="Adebola">
          {adebola2.map((p, i) => <p key={i}>{p}</p>)}
          <p className="font-display italic text-3xl text-primary pt-2">"Be my girlfriend."</p>
          <p>And without a second thought, she said yes.</p>
          <p>That "yes" was the beginning of our journey: a journey of love, growth, friendship, and choosing each other every day.</p>
          <p>And now, here we are… standing at the edge of forever, ready for the next chapter.</p>
          <p className="italic">
            Turns out, that simple trip to the cinema was never just a movie date after all. It was the opening scene of our forever story.{" "}
            <Heart className="inline h-4 w-4 text-primary" />
          </p>
        </Voice>
      </div>

      <Ornament className="mt-16" />
    </section>
  );
}

function Voice({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-primary/40 pl-6 md:pl-8">
      <p className="font-script text-4xl text-gold-shimmer mb-4 leading-none">{name}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2 text-primary/60">
      <span className="h-px w-16 bg-primary/30" />
      <Heart className="h-3 w-3" />
      <span className="h-px w-16 bg-primary/30" />
    </div>
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
                defaultMonth={new Date(2026, 8, 1)}
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
              <p className="text-sm opacity-60 italic pl-5">Try Sep 9 or Sep 12, 2026.</p>
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
    <section id="venue" className="px-6 py-28">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3 text-primary">Our Colours</p>
            <div className="flex gap-2">
              <span className="w-8 h-8 rounded-full bg-midnight border border-border" title="Midnight teal" />
              <span className="w-8 h-8 rounded-full bg-gradient-gold border border-border" title="Gold" />
              <span className="w-8 h-8 rounded-full bg-cream border border-border" title="Cream" />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 grid sm:grid-cols-3 gap-6">
          {ASOEBI_ITEMS.map((a) => (
            <div key={a.name} className="bg-background border border-border p-6 flex flex-col">
              <div className="aspect-square w-full mb-4 bg-gradient-to-br from-midnight-soft to-midnight-deep border border-border flex items-center justify-center">
                <span className="text-6xl text-gold-shimmer">{a.motif}</span>
              </div>
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
  const copy = (val: string, label: string) => {
    navigator.clipboard?.writeText(val);
    toast.success(`${label} copied`);
  };

  return (
    <section id="registry" className="py-28 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3 block">Gifts & Blessings</span>
        <h2 className="font-display text-5xl md:text-6xl italic mb-4">Your Presence is Our Gift</h2>
        <p className="text-sm opacity-70 max-w-lg mx-auto italic">
          Should you wish to honour us further, we have made a few options below.
        </p>
        <Ornament className="mt-8" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-10 bg-card border border-border flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-4">Naira Bank Transfer</span>
          <h3 className="font-display text-3xl italic mb-6 leading-tight">Wema Bank</h3>
          <dl className="text-sm space-y-3 mb-8 flex-1">
            <Row label="Currency" value="Naira" />
            <Row label="Account No." value="0263498932" mono />
            <Row label="Bank" value="Wema Bank" />
            <Row label="Account Name" value="Ajao Oluwatobi" />
          </dl>
          <button
            onClick={() => copy("0263498932", "Account number")}
            className="text-[10px] uppercase tracking-[0.22em] border-b border-primary pb-1 text-primary self-start hover:text-cream hover:border-cream transition-colors"
          >
            Copy Account →
          </button>
        </div>

        <div className="p-10 bg-card border border-border flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-4">International Bank Transfer</span>
          <h3 className="font-display text-3xl italic mb-6 leading-tight">Revolut Bank</h3>
          <dl className="text-sm space-y-3 mb-8 flex-1">
            <Row label="Currency" value="Euro" />
            <Row label="Beneficiary" value="Adebola Ojo" />
            <Row label="IBAN" value="LT33 3250 0910 0051 5428" mono />
            <Row label="BIC / SWIFT" value="REVOLT21" mono />
            <Row label="Bank" value="Revolut Bank" />
          </dl>
          <button
            onClick={() => copy("LT33 3250 0910 0051 5428", "IBAN")}
            className="text-[10px] uppercase tracking-[0.22em] border-b border-primary pb-1 text-primary self-start hover:text-cream hover:border-cream transition-colors"
          >
            Copy IBAN →
          </button>
        </div>

        <a
          href="https://www.paypal.me/Adebola100"
          target="_blank"
          rel="noreferrer"
          className="group p-10 bg-card border border-border flex flex-col hover:bg-bronze-deep hover:border-primary transition-colors"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-4">PayPal</span>
          <h3 className="font-display text-3xl italic mb-6 leading-tight">Give to us</h3>
          <p className="text-sm opacity-75 mb-8 leading-relaxed flex-1">
            Send us a gift via PayPal — quick, simple, and from anywhere in the world.
          </p>
          <span className="font-mono text-xs text-primary group-hover:text-cream break-all mb-3">paypal.me/Adebola100</span>
          <span className="inline-block text-[10px] uppercase tracking-[0.22em] border-b border-primary pb-1 text-primary self-start group-hover:text-cream group-hover:border-cream transition-colors">
            Open PayPal →
          </span>
        </a>
      </div>
    </section>
  );
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between items-baseline gap-4 border-b border-border/50 pb-2">
      <dt className="font-mono text-[9px] uppercase tracking-[0.22em] opacity-60 shrink-0">{label}</dt>
      <dd className={`text-right ${mono ? "font-mono text-xs" : "text-sm"}`}>{value}</dd>
    </div>
  );
}

function Seating() {
  return (
    <section id="seating" className="py-28 px-6 bg-card border-y border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3 block">Seating Chart</span>
          <h2 className="font-display text-5xl md:text-6xl italic mb-4">The Reception Floor Plan</h2>
          <Ornament className="mt-6" />
        </div>

        <div className="mt-4">
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
