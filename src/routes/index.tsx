import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import heroCouple from "@/assets/hero-couple.jpg";
import storyImg from "@/assets/story.jpg";
import fabricAsooke from "@/assets/fabric-asooke.jpg";
import fabricLace from "@/assets/fabric-lace.jpg";
import fabricFila from "@/assets/fabric-fila.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import logoAsset from "@/assets/wedding-logo.png.asset.json";
import seatingChartAsset from "@/assets/seating-chart.png.asset.json";
import seatingChartPdfAsset from "@/assets/seating-chart.pdf.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tobi & Adebola — #withloveat26" },
      { name: "description", content: "Celebrating the union of Oluwatobi & Adebola. Court, traditional, and church weddings in Lagos. #withloveat26" },
      { property: "og:title", content: "Tobi & Adebola — #withloveat26" },
      { property: "og:description", content: "Three days of joy in Lagos. RSVP, aso-ebi, registry, seating chart and more." },
    ],
  }),
  component: Index,
});

// Main wedding date used for hero countdown (Church Wedding)
const WEDDING_DATE = new Date("2026-12-12T11:00:00+01:00");

const EVENTS = [
  {
    tag: "Day One",
    date: "Wed, Dec 9, 2026",
    time: "10:00 AM",
    title: "Court Wedding",
    venue: "Ikoyi Marriage Registry, Lagos",
    cta: "Add to Calendar",
    ics: makeIcs("Oluwatobi & Afolabi — Court Wedding", "Ikoyi Marriage Registry, Lagos", "20261209T100000", "20261209T120000"),
  },
  {
    tag: "Day Two",
    date: "Fri, Dec 11, 2026",
    time: "12:00 PM",
    title: "Traditional Engagement",
    venue: "The Grand Atrium, Abule-Egba, Lagos",
    cta: "Add to Calendar",
    ics: makeIcs("Oluwatobi & Afolabi — Traditional Engagement", "The Grand Atrium, Abule-Egba, Lagos", "20261211T120000", "20261211T180000"),
  },
  {
    tag: "Day Three",
    date: "Sat, Dec 12, 2026",
    time: "11:00 AM",
    title: "Church Wedding & Reception",
    venue: "RCCG City of David, Victoria Island, Lagos",
    cta: "Add to Calendar",
    ics: makeIcs("Oluwatobi & Afolabi — Church Wedding & Reception", "RCCG City of David, Victoria Island, Lagos", "20261212T110000", "20261212T220000"),
  },
];

const DRESS_CODE = [
  { name: "Champagne Bronze", hex: "#C28840", role: "Bride's Family" },
  { name: "Royal Burgundy", hex: "#5D1B1B", role: "Groom's Family" },
  { name: "Midnight Navy", hex: "#0F1830", role: "Friends of Couple" },
  { name: "Ivory Silk", hex: "#F4ECDC", role: "General Guests" },
];

const ASOEBI = [
  { img: fabricAsooke, name: "Traditional Aso-Oke (Bronze)", sub: "Complete Set · 4 Yards + Gele", price: "₦95,000" },
  { img: fabricLace, name: "Reception French Lace", sub: "Premium · 5 Yards + Headtie", price: "₦75,000" },
  { img: fabricFila, name: "Men's Atiku & Fila Set", sub: "Midnight Navy · 4 Yards", price: "₦55,000" },
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

function Index() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Nav />
      <Hero />
      <Story />
      <Events />
      <DressCode />
      <Venue />
      <Asoebi />
      <Registry />
      <Seating />
      <Gallery />
      <RSVP />
      <Footer />
      <Toaster theme="dark" position="top-center" />
    </div>
  );
}

/* ---------- Sections ---------- */

function Nav() {
  const links = [
    ["Story", "story"],
    ["Events", "events"],
    ["Dress Code", "dress-code"],
    ["Venue", "venue"],
    ["Aso-Ebi", "asoebi"],
    ["Gifts", "registry"],
    ["Seating", "seating"],
    ["Gallery", "gallery"],
  ];
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Tobi & Adebola monogram" className="h-12 w-12 object-contain" />
          <span className="hidden sm:block font-display italic text-xl text-gold-shimmer tracking-tight">Tobi &amp; Adebola</span>
        </a>
        <div className="hidden lg:flex gap-7 text-[11px] uppercase tracking-[0.22em] font-medium text-foreground/70">
          {links.map(([l, h]) => (
            <a key={h} href={`#${h}`} className="hover:text-primary transition-colors">{l}</a>
          ))}
        </div>
        <a href="#rsvp" className="px-5 py-2.5 bg-gradient-gold text-midnight text-[10px] uppercase tracking-[0.22em] font-semibold hover:opacity-90 transition-opacity">
          RSVP
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const countdown = useCountdown(WEDDING_DATE);
  return (
    <header id="top" className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={heroCouple} alt="Oluwatobi and Adebola" width={1280} height={1600} className="w-full h-full object-cover object-center opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      </div>

      <div className="animate-fade-up flex flex-col items-center">
        <img src={logoAsset.url} alt="Tobi & Adebola monogram" className="h-28 md:h-36 w-auto mb-6 drop-shadow-[0_4px_24px_rgba(225,164,66,0.35)]" />
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
        <p className="mt-6 font-mono text-xs tracking-[0.3em] uppercase text-gold-shimmer">#withloveat26</p>
      </div>

      <div className="mt-12 flex gap-6 md:gap-12 border-y border-border py-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
        {[
          ["Days", countdown.d],
          ["Hours", countdown.h],
          ["Mins", countdown.m],
          ["Secs", countdown.s],
        ].map(([label, v]) => (
          <div key={label} className="flex flex-col min-w-[60px]">
            <span className="font-display text-4xl md:text-5xl tabular-nums">{String(v).padStart(2, "0")}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-60 mt-1">{label}</span>
          </div>
        ))}
      </div>

      <div className="absolute -bottom-8 left-0 w-full opacity-[0.05] select-none pointer-events-none">
        <span className="text-[18vw] font-display italic whitespace-nowrap text-primary">#withloveat26</span>
      </div>
    </header>
  );
}

function Story() {
  return (
    <section id="story" className="max-w-5xl mx-auto py-28 px-6 grid md:grid-cols-2 gap-16 items-center">
      <img src={storyImg} alt="The couple at golden hour" width={800} height={1100} loading="lazy" className="aspect-[4/5] w-full object-cover" />
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
  return (
    <section id="events" className="relative py-28 px-6 border-y border-border bg-card">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3 block">The Calendar</span>
          <h2 className="font-display text-5xl md:text-6xl italic">Three Days of Joy</h2>
        </header>

        <div className="grid md:grid-cols-3 gap-10">
          {EVENTS.map((e) => (
            <article key={e.title} className="border-l border-primary/40 pl-6 py-3 group">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{e.tag}</span>
              <h3 className="font-display text-3xl italic mt-3 mb-3 leading-tight">{e.title}</h3>
              <p className="text-sm text-foreground/70 mb-1">{e.date} · {e.time}</p>
              <p className="text-sm text-foreground/60 mb-8 italic">{e.venue}</p>
              <a
                href={e.ics}
                download={`${e.title}.ics`}
                className="inline-block text-[10px] uppercase tracking-[0.22em] border border-border px-4 py-2.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                {e.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DressCode() {
  return (
    <section id="dress-code" className="py-28 px-6 max-w-5xl mx-auto text-center">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3 block">The Dress Code</span>
      <h2 className="font-display text-5xl md:text-6xl italic mb-4">Wear Our Colours</h2>
      <p className="text-sm opacity-70 max-w-md mx-auto mb-16 italic">Guests are warmly encouraged to dress in our wedding palette across all three ceremonies.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {DRESS_CODE.map((c) => (
          <div key={c.name} className="space-y-4">
            <div className="aspect-square rounded-full ring-1 ring-border shadow-2xl mx-auto max-w-[180px]" style={{ background: c.hex }} />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em]">{c.name}</p>
              <p className="text-[10px] opacity-50 mt-1">{c.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Venue() {
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Abule-Egba+Lagos";
  return (
    <section id="venue" className="px-6 pb-28">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 border border-border">
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3 block">The Venue</span>
            <h3 className="font-display text-4xl italic mb-5 leading-tight">The Grand Atrium</h3>
            <p className="text-sm opacity-70 mb-2">Plot 14, Lagos-Abeokuta Expressway,</p>
            <p className="text-sm opacity-70 mb-8">Abule-Egba, Lagos State, Nigeria.</p>
            <p className="text-xs opacity-60 mb-8 leading-relaxed border-l border-primary/40 pl-4 italic">
              Valet parking available from 11:00 AM. Please arrive 30 minutes before each ceremony for the welcome reception.
            </p>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="text-primary font-mono text-[10px] uppercase tracking-[0.22em] underline decoration-primary/40 underline-offset-4 self-start">
              Open in Google Maps →
            </a>
          </div>
          <div className="min-h-[400px] bg-muted">
            <iframe
              title="Wedding venue map — Abule-Egba, Lagos"
              src="https://www.google.com/maps?q=Abule-Egba%2C%20Lagos&output=embed"
              className="w-full h-full min-h-[400px] grayscale-[0.4] contrast-[0.95]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
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
            <p className="text-sm font-medium">GTBank · Afolabi & Tobi</p>
            <p className="text-sm tabular-nums opacity-80">0123 456 789</p>
          </div>
        </div>

        <div className="md:col-span-2 grid sm:grid-cols-3 gap-6">
          {ASOEBI.map((a) => (
            <div key={a.name} className="bg-background border border-border p-4 flex flex-col">
              <img src={a.img} alt={a.name} width={600} height={600} loading="lazy" className="aspect-square w-full object-cover mb-4" />
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
        <GiftCard tag="Honeymoon Fund" title="A Trip to Zanzibar" body="Help us toast our new chapter on a quiet East African beach." cta="Contribute" href="#rsvp" />
        <GiftCard tag="Home Registry" title="Our First Home" body="Curated essentials for the Lagos apartment we're building together." cta="View Registry" href="https://www.amazon.com/wedding" />
        <GiftCard
          tag="Direct Gift"
          title="Bank Transfer"
          body={
            <span className="block font-mono text-xs leading-relaxed">
              GTBank<br />
              0123 456 789<br />
              Afolabi & Tobi
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
      <div className="max-w-2xl mx-auto text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3 block">Seating Chart</span>
        <h2 className="font-display text-5xl md:text-6xl italic mb-4">Find Your Seat</h2>
        <p className="text-sm opacity-70 mb-10 italic">Enter your full name as it appears on your invitation.</p>

        <form onSubmit={(e) => e.preventDefault()} className="relative mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="e.g. Adunni Okafor"
            className="w-full border-b border-border py-4 bg-transparent focus:outline-none focus:border-primary font-display italic text-2xl text-center placeholder:opacity-30"
          />
        </form>

        <div className="min-h-[80px]">
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
          {!result && (
            <p className="text-[10px] opacity-40 font-mono uppercase tracking-[0.22em]">Try "Adunni Okafor" or "Tunde Balogun"</p>
          )}
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

function RSVP() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Thank you! We can't wait to celebrate with you.");
  }

  return (
    <section id="rsvp" className="py-28 px-6 max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3 block">Reply Please</span>
        <h2 className="font-display text-5xl md:text-6xl italic mb-4">RSVP</h2>
        <p className="text-sm opacity-70 italic">Kindly respond by November 1, 2026.</p>
      </div>

      {submitted ? (
        <div className="bg-card border border-primary/40 p-12 text-center animate-fade-up">
          <p className="font-display text-3xl italic text-primary mb-2">Thank you</p>
          <p className="text-sm opacity-70">Your response has been received. Safe travels to Lagos.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 bg-card p-8 md:p-12 border border-border">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="First Name" name="first" required />
            <Field label="Last Name" name="last" required />
          </div>
          <Field label="Email" name="email" type="email" required />

          <div className="space-y-3">
            <label className="font-mono text-[9px] uppercase tracking-[0.22em] opacity-60 block">Will you attend?</label>
            <div className="flex flex-col md:flex-row gap-3 md:gap-8">
              <label className="flex items-center gap-3 text-sm cursor-pointer"><input type="radio" name="attend" defaultChecked className="accent-primary" /> Joyfully Attend</label>
              <label className="flex items-center gap-3 text-sm cursor-pointer"><input type="radio" name="attend" className="accent-primary" /> Regretfully Decline</label>
            </div>
          </div>

          <div className="space-y-3">
            <label className="font-mono text-[9px] uppercase tracking-[0.22em] opacity-60 block">Which Ceremonies?</label>
            <div className="flex flex-col md:flex-row gap-3 md:gap-6">
              {EVENTS.map((e) => (
                <label key={e.title} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-primary" />
                  {e.title}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="font-mono text-[9px] uppercase tracking-[0.22em] opacity-60 block">Number of Guests</label>
            <select name="guests" className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-sm">
              <option value="1">1 — Just me</option>
              <option value="2">2 — Me + 1</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <Field label="Song Request" name="song" placeholder="What should the DJ play?" />

          <button type="submit" className="w-full py-4 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-bronze-deep hover:text-cream transition-colors">
            Submit Response
          </button>
        </form>
      )}
    </section>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div className="space-y-2">
      <label className="font-mono text-[9px] uppercase tracking-[0.22em] opacity-60 block">{label}{required && " *"}</label>
      <input type={type} name={name} required={required} placeholder={placeholder} className="w-full border-b border-border py-2 bg-transparent focus:outline-none focus:border-primary text-sm placeholder:opacity-30" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-16 border-t border-border text-center px-6">
      <p className="font-display italic text-3xl text-bronze-shimmer mb-2">#TheAfolabiUnion2026</p>
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
    "PRODID:-//Afolabi Union//EN",
    "BEGIN:VEVENT",
    `UID:${start}-${title.replace(/\s+/g, "")}@afolabi-union`,
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
