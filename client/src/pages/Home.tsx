import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  CircleDollarSign,
  Github,
  Mail,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";

// CONTENUTI MODIFICABILI: sostituisci testi e valori con quelli reali del progetto.
const categories = [
  { label: "Casa", value: "€ 640", color: "#203c66", width: "82%" },
  { label: "Food & drink", value: "€ 284", color: "#6e8db7", width: "55%" },
  { label: "Mobilità", value: "€ 156", color: "#a9bad2", width: "33%" },
];

const appScreens = [
  {
    src: "/manus-storage/home-transactions_ddc33622.jpg",
    alt: "Schermata Home di ExpenseTracker con elenco delle transazioni",
    title: "Tutto in un colpo d’occhio",
    text: "La home mostra saldo, entrate e uscite recenti senza nascondere i dettagli.",
    className: "screen-tall screen-featured",
  },
  {
    src: "/manus-storage/budget-analytics_dfd70800.jpg",
    alt: "Schermata Analisi Budget di ExpenseTracker",
    title: "Budget vs spese effettive",
    text: "Un’analisi visuale per capire quanto hai pianificato e quanto hai davvero speso.",
    className: "screen-tall",
  },
  {
    src: "/manus-storage/recurring-transactions_3643b681.jpg",
    alt: "Schermata delle transazioni ricorrenti di ExpenseTracker",
    title: "Ricorrenze senza pensieri",
    text: "Gestisci scadenze, frequenze e promemoria direttamente dall’app.",
    className: "screen-tall",
  },
  {
    src: "/manus-storage/transaction-detail_27e6e6b3.jpg",
    alt: "Dettaglio di una transazione in ExpenseTracker",
    title: "Dettagli quando servono",
    text: "Categorie, tag, note e date rendono ogni movimento facile da ritrovare.",
    className: "screen-tall",
  },
  {
    src: "/manus-storage/import-data_bc5ec559.jpg",
    alt: "Schermata Importa Transazioni di ExpenseTracker",
    title: "Importazione manuale",
    text: "Porta i tuoi dati dentro ExpenseTracker con un flusso chiaro e locale.",
    className: "screen-tall",
  },
];

const principles = [
  {
    number: "01",
    title: "Scansiona",
    text: "Fotografa uno scontrino: l’OCR sul dispositivo riconosce importo, data, esercente e categoria.",
  },
  {
    number: "02",
    title: "Pianifica",
    text: "Imposta budget globali o per categoria e confronta in modo visuale previsto e consuntivo.",
  },
  {
    number: "03",
    title: "Importa",
    text: "Porta dentro CSV, TSV o OFX con anteprima, mapping delle colonne e deduplicazione.",
  },
];

export default function Home() {
  const [selectedScreen, setSelectedScreen] = useState<(typeof appScreens)[number] | null>(null);
  const selectedIndex = selectedScreen ? appScreens.findIndex((screen) => screen.src === selectedScreen.src) : -1;

  const moveLightbox = (direction: -1 | 1) => {
    if (selectedIndex < 0) return;
    const nextIndex = (selectedIndex + direction + appScreens.length) % appScreens.length;
    setSelectedScreen(appScreens[nextIndex]);
  };

  useEffect(() => {
    if (!selectedScreen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedScreen(null);
      if (event.key === "ArrowLeft") moveLightbox(-1);
      if (event.key === "ArrowRight") moveLightbox(1);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedScreen, selectedIndex]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="ExpenseTracker home">
          <span className="brand-mark"><WalletCards size={17} strokeWidth={2.4} /></span>
          <span>Expense<span className="brand-accent">Tracker</span></span>
        </a>
        <nav className="site-nav" aria-label="Navigazione principale">
          <a href="#home">Home</a>
          <a href="#dettagli">Il progetto</a>
          <a href="#contatti">Contatti</a>
        </nav>
        <a className="header-link" href="#contatti">Parliamone <ArrowUpRight size={15} /></a>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="container hero-content">
            <div className="hero-copy">
              <div className="eyebrow light"><span className="eyebrow-dot" /> Project showcase <span className="eyebrow-year">/ 2026</span></div>
              <h1>Le spese,<br /><em>finalmente</em><br />sotto controllo.</h1>
              <p className="hero-lede">ExpenseTracker è un’app Android local-first per tenere sotto controllo budget, spese e rimborsi senza cloud, account o tracciamento.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="https://github.com/onortiziano/expensetracker/releases/download/v55/app-release.apk" target="_blank" rel="noreferrer">Scarica APK v55 <ArrowDownRight size={17} /></a>
                <a className="text-link light-link" href="https://github.com/onortiziano/expensetracker" target="_blank" rel="noreferrer">Vedi il codice sorgente <ArrowDownRight size={15} /></a>
              </div>
            </div>

            <div className="hero-visual" aria-label="Anteprima della dashboard ExpenseTracker">
              <div className="dashboard-window">
                <div className="window-topbar">
                  <span className="window-dots"><i /><i /><i /></span>
                  <span className="window-title">overview / aprile 2026</span>
                  <span className="window-menu">•••</span>
                </div>
                <div className="window-body">
                  <div className="dashboard-greeting"><span>Budget di aprile</span><span className="dashboard-date">01 — 30 APR</span></div>
                  <div className="balance-row">
                    <div><p className="metric-label">Budget vs spese effettive</p><strong className="balance">€ 840 / € 1.240</strong><span className="balance-delta"><ArrowDownRight size={13} /> 67,7% utilizzato</span></div>
                    <div className="mini-ring"><span>72%</span></div>
                  </div>
                  <div className="chart-card">
                    <div className="chart-header"><span>Andamento spese</span><span className="chart-legend"><i /> uscite</span></div>
                    <div className="chart-bars" aria-hidden="true">
                      <span style={{ height: "34%" }} /><span style={{ height: "47%" }} /><span style={{ height: "39%" }} /><span style={{ height: "63%" }} /><span style={{ height: "51%" }} /><span style={{ height: "75%" }} /><span className="bar-current" style={{ height: "42%" }} />
                    </div>
                    <div className="chart-axis"><span>01 APR</span><span>15 APR</span><span>30 APR</span></div>
                  </div>
                  <div className="category-list">
                    {categories.map((category) => (
                      <div className="category-row" key={category.label}>
                        <span className="category-name"><i style={{ backgroundColor: category.color }} />{category.label}</span>
                        <span className="category-bar"><b style={{ width: category.width, backgroundColor: category.color }} /></span>
                        <strong>{category.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="floating-note"><span><CircleDollarSign size={16} /></span><div><strong>Dati sempre tuoi</strong><small>local-first · zero cloud</small></div></div>
            </div>
          </div>
          <div className="scroll-cue"><span>Scroll to explore</span><ArrowDownRight size={16} /></div>
        </section>

        <section className="manifesto-section" id="dettagli">
          <div className="container">
            <div className="section-intro split-intro">
              <div><div className="eyebrow"><span className="eyebrow-dot navy" /> Il problema</div><h2>Il controllo resta<br /><em>sul dispositivo.</em></h2></div>
              <div className="intro-copy"><p>ExpenseTracker è pensata per funzionare senza account, cloud o tracciamento. I dati restano sul dispositivo e il backup è sotto il tuo controllo.</p><p>Un’app Android in Kotlin, Jetpack Compose e Room/SQLite: strumenti concreti per capire dove vanno i soldi, senza rinunciare alla privacy.</p></div>
            </div>
            <div className="principles-grid">
              {principles.map((principle) => (
                <article className="principle-card" key={principle.number}><span className="principle-number">{principle.number}</span><div className="principle-line" /><h3>{principle.title}</h3><p>{principle.text}</p><ArrowUpRight className="principle-arrow" size={20} /></article>
              ))}
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="container feature-layout">
            <div className="feature-copy"><div className="eyebrow"><span className="eyebrow-dot navy" /> Come funziona</div><h2>Dati utili.<br /><em>Nessun cloud.</em></h2><p>Dal budget alle ricorrenze, dalle categorie ai crediti: una dashboard Material 3 che rende leggibili le decisioni importanti, senza nascondere i dettagli.</p><div className="feature-checks"><div><Check size={15} /> OCR scontrini on-device</div><div><Check size={15} /> Ricorrenze e promemoria</div><div><Check size={15} /> Backup e ripristino locali</div></div></div>
            <div className="feature-visual">
              <div className="visual-label">01 / Insight settimanale</div>
              <div className="insight-card"><div className="insight-icon"><BarChart3 size={20} /></div><div><span className="insight-kicker">Una visione più completa</span><h3>Budget, spese e<br />categorie in un colpo d’occhio.</h3><p>Analytics “budget vs actual”, senza rumore.</p></div><div className="insight-chart"><i /><i /><i /><i /><i /><i /><i /></div></div>
              <div className="visual-footer"><span><ShieldCheck size={15} /> Privacy first</span><span>Dettagli, non distrazioni</span></div>
            </div>
          </div>
        </section>

        <section className="screens-section" id="schermate">
          <div className="container">
            <div className="screens-heading">
              <div>
                <div className="eyebrow"><span className="eyebrow-dot navy" /> L’app in azione</div>
                <h2>Progettata per<br /><em>essere usata.</em></h2>
              </div>
              <p>Schermate reali dell’app Android: un’interfaccia scura, compatta e concreta, costruita per accompagnare le decisioni quotidiane senza distrazioni.</p>
            </div>
            <div className="screens-grid">
              {appScreens.map((screen) => (
                <article className={`screen-card ${screen.className}`} key={screen.src}>
                  <button className="screen-image-wrap screen-image-button" type="button" onClick={() => setSelectedScreen(screen)} aria-label={`Ingrandisci: ${screen.title}`}><img src={screen.src} alt={screen.alt} loading="lazy" /><span className="screen-zoom-hint">Clicca per ingrandire</span></button>
                  <div className="screen-caption"><h3>{screen.title}</h3><p>{screen.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {selectedScreen && (
          <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedScreen.title} onClick={() => setSelectedScreen(null)}>
            <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
              <div className="lightbox-toolbar"><div><span className="lightbox-kicker">ExpenseTracker / schermata app</span><h3>{selectedScreen.title}</h3></div><button className="lightbox-close" type="button" onClick={() => setSelectedScreen(null)} aria-label="Chiudi immagine ingrandita">×</button></div>
              <div className="lightbox-image-wrap"><button className="lightbox-nav lightbox-nav-prev" type="button" onClick={() => moveLightbox(-1)} aria-label="Schermata precedente"><ArrowLeft size={19} /></button><img src={selectedScreen.src} alt={selectedScreen.alt} /><button className="lightbox-nav lightbox-nav-next" type="button" onClick={() => moveLightbox(1)} aria-label="Schermata successiva"><ArrowRight size={19} /></button></div>
              <div className="lightbox-bottomline"><p className="lightbox-caption">{selectedScreen.text}</p><span className="lightbox-counter">{String(selectedIndex + 1).padStart(2, "0")} / {String(appScreens.length).padStart(2, "0")}</span></div>
            </div>
          </div>
        )}

        <section className="roadmap-section">
          <div className="container roadmap-layout"><div className="roadmap-heading"><div className="eyebrow light"><span className="eyebrow-dot" /> Dove siamo</div><h2>Funzioni pensate<br /><em>per la vita reale.</em></h2><p>Dalla registrazione manuale agli strumenti avanzati: ogni funzione è costruita per ridurre attrito e aumentare consapevolezza.</p></div><div className="roadmap-list"><div className="roadmap-item active"><span className="roadmap-status">01</span><div><strong>Gestione</strong><p>Budget, categorie gerarchiche e tag</p></div><span className="roadmap-tag">completato</span></div><div className="roadmap-item"><span className="roadmap-status">02</span><div><strong>Automazione</strong><p>Ricorrenze, promemoria e intent Android</p></div><span className="roadmap-tag">in corso</span></div><div className="roadmap-item"><span className="roadmap-status">03</span><div><strong>Importazione</strong><p>CSV, TSV, OFX e divisione delle spese</p></div><span className="roadmap-tag">prossimo</span></div></div></div>
        </section>

        <section className="contact-section" id="contatti">
          <div className="container contact-card"><div className="contact-orbit" aria-hidden="true" /><div className="eyebrow"><span className="eyebrow-dot navy" /> Contatti</div><h2>Hai un’idea da<br /><em>condividere?</em></h2><p>Vuoi provare l’app, contribuire o capire come funziona? Scarica l’ultima release oppure esplora il codice sorgente su GitHub.</p><div className="contact-actions"><a className="button button-dark" href="https://github.com/onortiziano/expensetracker/releases/download/v55/app-release.apk" target="_blank" rel="noreferrer">Scarica APK <ArrowDownRight size={17} /></a><a className="button button-outline-dark" href="https://github.com/onortiziano/expensetracker" target="_blank" rel="noreferrer">Codice sorgente <Github size={17} /></a></div><div className="contact-meta"><span><ShieldCheck size={14} /> Local-first · Android</span><span>© 2026 ExpenseTracker</span></div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><a className="brand" href="#home"><span className="brand-mark small"><WalletCards size={14} /></span><span>Expense<span className="brand-accent">Tracker</span></span></a><p>Un progetto personale su chiarezza, abitudini e denaro.</p><div className="footer-links"><a href="#dettagli">Il progetto</a><a href="mailto:ciao@expensetracker.dev">Email</a><a href="https://github.com/onortiziano/expensetracker" target="_blank" rel="noreferrer"><Github size={16} /> Codice</a></div></div></footer>
    </div>
  );
}
