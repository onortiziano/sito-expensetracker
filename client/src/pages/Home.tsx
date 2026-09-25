import { useEffect, useRef, useState, type ReactNode, type TouchEvent } from "react";
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

const ASSET_BASE = `${import.meta.env.BASE_URL}assets/screens/`;

const appScreens = [
  {
    src: `${ASSET_BASE}home-transactions.jpg`,
    alt: "Schermata Home di ExpenseTracker con elenco delle transazioni",
    title: "Tutto in un colpo d’occhio",
    text: "La home mostra saldo, entrate e uscite recenti senza nascondere i dettagli.",
    className: "screen-tall screen-featured",
  },
  {
    src: `${ASSET_BASE}budget-analytics.jpg`,
    alt: "Schermata Analisi Budget di ExpenseTracker",
    title: "Budget vs spese effettive",
    text: "Un’analisi visuale per capire quanto hai pianificato e quanto hai davvero speso.",
    className: "screen-tall",
  },
  {
    src: `${ASSET_BASE}recurring-transactions.jpg`,
    alt: "Schermata delle transazioni ricorrenti di ExpenseTracker",
    title: "Ricorrenze senza pensieri",
    text: "Gestisci scadenze, frequenze e promemoria direttamente dall’app.",
    className: "screen-tall",
  },
  {
    src: `${ASSET_BASE}transaction-detail.jpg`,
    alt: "Dettaglio di una transazione in ExpenseTracker",
    title: "Dettagli quando servono",
    text: "Categorie, tag, note e date rendono ogni movimento facile da ritrovare.",
    className: "screen-tall",
  },
  {
    src: `${ASSET_BASE}import-data.jpg`,
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
  const [language, setLanguage] = useState<"it" | "en">(() => {
    if (typeof window === "undefined") return "it";
    return window.localStorage.getItem("expensetracker-language") === "en" ? "en" : "it";
  });
  const isEnglish = language === "en";
  const t = (it: ReactNode, en: ReactNode) => (isEnglish ? en : it);
  const localizedScreenCopy = [
    { alt: "ExpenseTracker home screen with transaction list", title: "Everything at a glance", text: "The home screen shows balance, income and recent expenses without hiding the details." },
    { alt: "ExpenseTracker budget analysis screen", title: "Budget vs actual spending", text: "A visual analysis to understand how much you planned and how much you actually spent." },
    { alt: "ExpenseTracker recurring transactions screen", title: "Recurring expenses, handled", text: "Manage due dates, frequencies and reminders directly in the app." },
    { alt: "ExpenseTracker transaction detail screen", title: "Details when they matter", text: "Categories, tags, notes and dates make every movement easy to find again." },
    { alt: "ExpenseTracker import transactions screen", title: "Manual import", text: "Bring your data into ExpenseTracker through a clear, local-first flow." },
  ];
  const displayedScreens = appScreens.map((screen, index) => isEnglish ? { ...screen, ...localizedScreenCopy[index] } : screen);
  const displayedCategories = categories.map((category) => ({ ...category, label: t(category.label, category.label === "Casa" ? "Home" : category.label === "Mobilità" ? "Mobility" : "Food & drink") }));
  const displayedPrinciples = principles.map((principle) => ({
    ...principle,
    title: t(principle.title, principle.title === "Scansiona" ? "Scan" : principle.title === "Pianifica" ? "Plan" : "Import"),
    text: t(principle.text, principle.number === "01" ? "Photograph a receipt: on-device OCR recognizes amount, date, merchant and category." : principle.number === "02" ? "Set global or category budgets and compare planned versus actual spending visually." : "Bring in CSV, TSV or OFX files with preview, column mapping and deduplication."),
  }));
  const setLanguageAndRemember = (next: "it" | "en") => {
    setLanguage(next);
    window.localStorage.setItem("expensetracker-language", next);
  };
  const [selectedScreen, setSelectedScreen] = useState<(typeof appScreens)[number] | null>(null);
  const [lightboxDirection, setLightboxDirection] = useState<-1 | 1 | null>(null);
  const touchStartX = useRef<number | null>(null);
  const selectedIndex = selectedScreen ? displayedScreens.findIndex((screen) => screen.src === selectedScreen.src) : -1;

  const openLightbox = (screen: (typeof displayedScreens)[number]) => {
    setLightboxDirection(null);
    setSelectedScreen(screen);
  };

  const moveLightbox = (direction: -1 | 1) => {
    if (selectedIndex < 0) return;
    const nextIndex = (selectedIndex + direction + displayedScreens.length) % displayedScreens.length;
    setLightboxDirection(direction);
    setSelectedScreen(displayedScreens[nextIndex]);
  };

  const handleLightboxTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleLightboxTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button") || touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;
    if (Math.abs(deltaX) >= 48) moveLightbox(deltaX < 0 ? 1 : -1);
    touchStartX.current = null;
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
        <nav className="site-nav" aria-label={String(t("Navigazione principale", "Main navigation"))}>
          <a href="#home">Home</a>
          <a href="#dettagli">{t("Il progetto", "The project")}</a>
          <a href="#release">Release v55</a>
          <a href="#contatti">{t("Contatti", "Contact")}</a>
        </nav>
        <div className="header-tools">
          <div className="language-switcher" role="group" aria-label={String(t("Seleziona lingua", "Select language"))}>
            <button type="button" className={language === "it" ? "language-active" : ""} onClick={() => setLanguageAndRemember("it")} aria-pressed={language === "it"}>IT</button>
            <span>/</span>
            <button type="button" className={language === "en" ? "language-active" : ""} onClick={() => setLanguageAndRemember("en")} aria-pressed={language === "en"}>EN</button>
          </div>
          <a className="header-link" href="#contatti">{t("Parliamone", "Let’s talk")} <ArrowUpRight size={15} /></a>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="container hero-content">
            <div className="hero-copy">
              <div className="eyebrow light"><span className="eyebrow-dot" /> {t("Project showcase", "Project showcase")} <span className="eyebrow-year">/ 2026</span></div>
              <h1>{t(<>Le spese,<br /><em>finalmente</em><br />sotto controllo.</>, <>Expenses,<br /><em>finally</em><br />under control.</>)}</h1>
              <p className="hero-lede">{t("ExpenseTracker è un’app Android local-first per tenere sotto controllo budget, spese e rimborsi senza cloud, account o tracciamento.", "ExpenseTracker is a local-first Android app for managing budgets, expenses and reimbursements without cloud, accounts or tracking.")}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="https://github.com/onortiziano/expensetracker/releases/download/v55/app-release.apk" target="_blank" rel="noreferrer">{t("Scarica APK v55", "Download APK v55")} <ArrowDownRight size={17} /></a>
                <a className="text-link light-link" href="https://github.com/onortiziano/expensetracker" target="_blank" rel="noreferrer">{t("Vedi il codice sorgente", "View source code")} <ArrowDownRight size={15} /></a>
              </div>
            </div>

            <div className="hero-visual" aria-label="Anteprima della dashboard ExpenseTracker">
              <div className="dashboard-window">
                <div className="window-topbar">
                  <span className="window-dots"><i /><i /><i /></span>
                  <span className="window-title">{t("overview / aprile 2026", "overview / April 2026")}</span>
                  <span className="window-menu">•••</span>
                </div>
                <div className="window-body">
                  <div className="dashboard-greeting"><span>{t("Budget di aprile", "April budget")}</span><span className="dashboard-date">01 — 30 APR</span></div>
                  <div className="balance-row">
                    <div><p className="metric-label">{t("Budget vs spese effettive", "Budget vs actual spending")}</p><strong className="balance">€ 840 / € 1.240</strong><span className="balance-delta"><ArrowDownRight size={13} /> {t("67,7% utilizzato", "67.7% used")}</span></div>
                    <div className="mini-ring"><span>72%</span></div>
                  </div>
                  <div className="chart-card">
                    <div className="chart-header"><span>{t("Andamento spese", "Spending trend")}</span><span className="chart-legend"><i />{t("uscite", "expenses")}</span></div>
                    <div className="chart-bars" aria-hidden="true">
                      <span style={{ height: "34%" }} /><span style={{ height: "47%" }} /><span style={{ height: "39%" }} /><span style={{ height: "63%" }} /><span style={{ height: "51%" }} /><span style={{ height: "75%" }} /><span className="bar-current" style={{ height: "42%" }} />
                    </div>
                    <div className="chart-axis"><span>01 APR</span><span>15 APR</span><span>30 APR</span></div>
                  </div>
                  <div className="category-list">
                    {displayedCategories.map((category) => (
                      <div className="category-row" key={category.value}>
                        <span className="category-name"><i style={{ backgroundColor: category.color }} />{category.label}</span>
                        <span className="category-bar"><b style={{ width: category.width, backgroundColor: category.color }} /></span>
                        <strong>{category.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="floating-note"><span><CircleDollarSign size={16} /></span><div><strong>{t("Dati sempre tuoi", "Your data stays yours")}</strong><small>local-first · zero cloud</small></div></div>
            </div>
          </div>
          <div className="scroll-cue"><span>{t("Scroll to explore", "Scroll to explore")}</span><ArrowDownRight size={16} /></div>
        </section>

        <section className="manifesto-section" id="dettagli">
          <div className="container">
            <div className="section-intro split-intro">
              <div><div className="eyebrow"><span className="eyebrow-dot navy" /> {t("Il problema", "The problem")}</div><h2>{t(<>Il controllo resta<br /><em>sul dispositivo.</em></>, <>Control stays<br /><em>on your device.</em></>)}</h2></div>
              <div className="intro-copy"><p>{t("ExpenseTracker è pensata per funzionare senza account, cloud o tracciamento. I dati restano sul dispositivo e il backup è sotto il tuo controllo.", "ExpenseTracker is designed to work without accounts, cloud or tracking. Your data stays on the device and backups remain under your control.")}</p><p>{t("Un’app Android in Kotlin, Jetpack Compose e Room/SQLite: strumenti concreti per capire dove vanno i soldi, senza rinunciare alla privacy.", "An Android app built with Kotlin, Jetpack Compose and Room/SQLite: practical tools to understand where your money goes without giving up privacy.")}</p></div>
            </div>
            <div className="principles-grid">
              {displayedPrinciples.map((principle) => (
                <article className="principle-card" key={principle.number}><span className="principle-number">{principle.number}</span><div className="principle-line" /><h3>{principle.title}</h3><p>{principle.text}</p><ArrowUpRight className="principle-arrow" size={20} /></article>
              ))}
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="container feature-layout">
            <div className="feature-copy"><div className="eyebrow"><span className="eyebrow-dot navy" /> {t("Come funziona", "How it works")}</div><h2>{t(<>Dati utili.<br /><em>Nessun cloud.</em></>, <>Useful data.<br /><em>No cloud.</em></>)}</h2><p>{t("Dal budget alle ricorrenze, dalle categorie ai crediti: una dashboard Material 3 che rende leggibili le decisioni importanti, senza nascondere i dettagli.", "From budgets to recurring expenses, categories and credits: a Material 3 dashboard that keeps important decisions readable without hiding the details.")}</p><div className="feature-checks"><div><Check size={15} /> {t("OCR scontrini on-device", "On-device receipt OCR")}</div><div><Check size={15} /> {t("Ricorrenze e promemoria", "Recurring expenses and reminders")}</div><div><Check size={15} /> {t("Backup e ripristino locali", "Local backup and restore")}</div></div></div>
            <div className="feature-visual">
              <div className="visual-label">{t("01 / Insight settimanale", "01 / Weekly insight")}</div>
              <div className="insight-card"><div className="insight-icon"><BarChart3 size={20} /></div><div><span className="insight-kicker">{t("Una visione più completa", "A clearer overview")}</span><h3>{t(<>Budget, spese e<br />categorie in un colpo d’occhio.</>, <>Budgets, expenses and<br />categories at a glance.</>)}</h3><p>{t("Analytics “budget vs actual”, senza rumore.", "Budget vs actual analytics, without the noise.")}</p></div><div className="insight-chart"><i /><i /><i /><i /><i /><i /><i /></div></div>
              <div className="visual-footer"><span><ShieldCheck size={15} /> Privacy first</span><span>{t("Dettagli, non distrazioni", "Details, not distractions")}</span></div>
            </div>
          </div>
        </section>

        <section className="screens-section" id="schermate">
          <div className="container">
            <div className="screens-heading">
              <div>
                <div className="eyebrow"><span className="eyebrow-dot navy" /> {t("L’app in azione", "The app in action")}</div>
                <h2>{t(<>Progettata per<br /><em>essere usata.</em></>, <>Designed to<br /><em>be used.</em></>)}</h2>
              </div>
              <p>{t("Schermate reali dell’app Android: un’interfaccia scura, compatta e concreta, costruita per accompagnare le decisioni quotidiane senza distrazioni.", "Real screenshots from the Android app: a dark, compact and practical interface built to support everyday decisions without distractions.")}</p>
            </div>
            <div className="screens-grid">
              {displayedScreens.map((screen) => (
                <article className={`screen-card ${screen.className}`} key={screen.src}>
                  <button className="screen-image-wrap screen-image-button" type="button" onClick={() => openLightbox(screen)} aria-label={`${isEnglish ? "Enlarge" : "Ingrandisci"}: ${screen.title}`}><img src={screen.src} alt={screen.alt} loading="lazy" /><span className="screen-zoom-hint">{t("Clicca per ingrandire", "Click to enlarge")}</span></button>
                  <div className="screen-caption"><h3>{screen.title}</h3><p>{screen.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {selectedScreen && (
          <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedScreen.title} onClick={() => setSelectedScreen(null)}>
            <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
              <div className="lightbox-toolbar"><div><span className="lightbox-kicker">{t("ExpenseTracker / schermata app", "ExpenseTracker / app screen")}</span><h3 key={selectedScreen.src} className={`lightbox-title ${lightboxDirection === 1 ? "lightbox-title-from-right" : lightboxDirection === -1 ? "lightbox-title-from-left" : ""}`}>{selectedScreen.title}</h3></div><button className="lightbox-close" type="button" onClick={() => setSelectedScreen(null)} aria-label={String(t("Chiudi immagine ingrandita", "Close enlarged image"))}>×</button></div>
              <div className="lightbox-image-wrap" onTouchStart={handleLightboxTouchStart} onTouchEnd={handleLightboxTouchEnd}><button className="lightbox-nav lightbox-nav-prev" type="button" onClick={() => moveLightbox(-1)} aria-label={String(t("Schermata precedente", "Previous screen"))}><ArrowLeft size={19} /></button><img key={selectedScreen.src} className={`lightbox-screen-image ${lightboxDirection === 1 ? "lightbox-enter-from-right" : lightboxDirection === -1 ? "lightbox-enter-from-left" : ""}`} src={selectedScreen.src} alt={selectedScreen.alt} /><button className="lightbox-nav lightbox-nav-next" type="button" onClick={() => moveLightbox(1)} aria-label={String(t("Schermata successiva", "Next screen"))}><ArrowRight size={19} /></button></div>
              <div className="lightbox-bottomline" aria-live="polite"><p key={selectedScreen.src} className={`lightbox-caption ${lightboxDirection === 1 ? "lightbox-caption-from-right" : lightboxDirection === -1 ? "lightbox-caption-from-left" : ""}`}>{selectedScreen.text}</p><span className="lightbox-counter">{String(selectedIndex + 1).padStart(2, "0")} / {String(displayedScreens.length).padStart(2, "0")}</span></div>
            </div>
          </div>
        )}

        <section className="roadmap-section">
          <div className="container roadmap-layout"><div className="roadmap-heading"><div className="eyebrow light"><span className="eyebrow-dot" /> {t("Dove siamo", "Where we are")}</div><h2>{t(<>Funzioni pensate<br /><em>per la vita reale.</em></>, <>Features made<br /><em>for real life.</em></>)}</h2><p>{t("Dalla registrazione manuale agli strumenti avanzati: ogni funzione è costruita per ridurre attrito e aumentare consapevolezza.", "From manual entry to advanced tools: every feature is built to reduce friction and improve awareness.")}</p></div><div className="roadmap-list"><div className="roadmap-item active"><span className="roadmap-status">01</span><div><strong>{t("Gestione", "Management")}</strong><p>{t("Budget, categorie gerarchiche e tag", "Budgets, hierarchical categories and tags")}</p></div><span className="roadmap-tag">{t("completato", "complete")}</span></div><div className="roadmap-item"><span className="roadmap-status">02</span><div><strong>{t("Automazione", "Automation")}</strong><p>{t("Ricorrenze, promemoria e intent Android", "Recurring expenses, reminders and Android intents")}</p></div><span className="roadmap-tag">{t("completato", "complete")}</span></div><div className="roadmap-item"><span className="roadmap-status">03</span><div><strong>{t("Importazione", "Import")}</strong><p>{t("CSV, TSV, OFX e divisione delle spese", "CSV, TSV, OFX and expense splitting")}</p></div><span className="roadmap-tag">{t("completato", "complete")}</span></div></div></div>
        </section>

        <section className="release-section" id="release">
          <div className="container">
            <div className="release-header">
              <div>
                <div className="eyebrow"><span className="eyebrow-dot navy" /> Release notes / v55</div>
                <h2>{t(<>Più controllo,<br /><em>meno attrito.</em></>, <>More control,<br /><em>less friction.</em></>)}</h2>
              </div>
              <div className="release-summary">
                <div className="release-meta"><span>{t("21 SET 2026", "21 SEP 2026")}</span><span>{t("ANDROID", "ANDROID")}</span><span>{t("53,1 MB", "53.1 MB")}</span></div>
                <p>{t("La release v55 porta ExpenseTracker verso una gestione più completa delle spese condivise, importazioni più affidabili e un flusso locale ancora più solido.", "Release v55 brings more complete shared-expense management, more reliable imports and an even stronger local-first flow.")}</p>
                <a className="text-link release-link" href="https://github.com/onortiziano/expensetracker/releases/tag/v55" target="_blank" rel="noreferrer">{t("Vedi la release su GitHub", "View release on GitHub")} <ArrowUpRight size={15} /></a>
              </div>
            </div>
            <div className="release-grid">
              <article className="release-card release-card-featured">
                <span className="release-index">01 / 03</span>
                <h3>{t(<>Spese condivise<br /><em>e crediti.</em></>, <>Shared expenses<br /><em>and credits.</em></>)}</h3>
                <p>{t("Dividi una spesa tra più persone, registra automaticamente i debiti e gestisci il rientro con un saldo chiaro.", "Split an expense between people, record debts automatically and manage repayments with a clear balance.")}</p>
                <ul><li><Check size={14} /> {t("Dialogo “Dividi spesa” con importi precompilati", "Split expense dialog with pre-filled amounts")}</li><li><Check size={14} /> {t("Schermata Crediti con stato aperto o saldato", "Credits screen with open or settled status")}</li><li><Check size={14} /> {t("Operazioni atomiche per evitare doppie registrazioni", "Atomic operations to prevent duplicate entries")}</li></ul>
              </article>
              <article className="release-card">
                <span className="release-index">02 / 03</span>
                <h3>{t(<>Importazione<br /><em>più robusta.</em></>, <>More robust<br /><em>imports.</em></>)}</h3>
                <p>{t("Porta dentro dati reali da app di pagamento e conti senza doverli ripulire prima.", "Bring in real data from payment apps and bank accounts without cleaning it first.")}</p>
                <ul><li><Check size={14} /> {t("Mapping manuale per CSV, TSV e TXT", "Manual mapping for CSV, TSV and TXT")}</li><li><Check size={14} /> {t("Supporto CSV e OFX con anteprima", "CSV and OFX support with preview")}</li><li><Check size={14} /> {t("Date italiane, decimali e rilevamento dell’importo", "Italian dates, decimals and amount detection")}</li></ul>
              </article>
              <article className="release-card">
                <span className="release-index">03 / 03</span>
                <h3>{t(<>Stabilità<br /><em>locale.</em></>, <>Local<br /><em>stability.</em></>)}</h3>
                <p>{t("Più affidabilità nei passaggi delicati, mantenendo dati e backup sotto il tuo controllo.", "More reliability in sensitive flows, while keeping data and backups under your control.")}</p>
                <ul><li><Check size={14} /> {t("Backup e ripristino locali più affidabili", "More reliable local backup and restore")}</li><li><Check size={14} /> {t("Migrazione Room v6 per i crediti", "Room v6 migration for credits")}</li><li><Check size={14} /> {t("Arrotondamenti coerenti e deduplicazione delle note", "Consistent rounding and note deduplication")}</li></ul>
              </article>
            </div>
            <div className="release-footer"><span><ShieldCheck size={15} /> {t("Local-first · nessun account · nessun cloud", "Local-first · no account · no cloud")}</span><span>Build v55 · app-release.apk</span></div>
          </div>
        </section>

        <section className="contact-section" id="contatti">
          <div className="container contact-card"><div className="contact-orbit" aria-hidden="true" /><div className="eyebrow"><span className="eyebrow-dot navy" /> {t("Contatti", "Contact")}</div><h2>{t(<>Hai un’idea da<br /><em>condividere?</em></>, <>Have an idea to<br /><em>share?</em></>)}</h2><p>{t("Vuoi provare l’app, contribuire o capire come funziona? Scarica l’ultima release oppure esplora il codice sorgente su GitHub.", "Want to try the app, contribute or understand how it works? Download the latest release or explore the source code on GitHub.")}</p><div className="contact-actions"><a className="button button-dark" href="https://github.com/onortiziano/expensetracker/releases/download/v55/app-release.apk" target="_blank" rel="noreferrer">{t("Scarica APK", "Download APK")} <ArrowDownRight size={17} /></a><a className="button button-outline-dark" href="https://github.com/onortiziano/expensetracker" target="_blank" rel="noreferrer">{t("Codice sorgente", "Source code")} <Github size={17} /></a></div><div className="contact-meta"><span><ShieldCheck size={14} /> Local-first · Android</span><span>© 2026 ExpenseTracker</span></div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><a className="brand" href="#home"><span className="brand-mark small"><WalletCards size={14} /></span><span>Expense<span className="brand-accent">Tracker</span></span></a><p>{t("Un progetto personale su chiarezza, abitudini e denaro.", "A personal project about clarity, habits and money.")}</p><div className="footer-links"><a href="#dettagli">{t("Il progetto", "The project")}</a><a href="mailto:ciao@expensetracker.dev">Email</a><a href="https://github.com/onortiziano/expensetracker" target="_blank" rel="noreferrer"><Github size={16} /> {t("Codice", "Code")}</a></div></div></footer>
    </div>
  );
}
