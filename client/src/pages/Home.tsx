import {
  ArrowDownRight,
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

const principles = [
  {
    number: "01",
    title: "Cattura",
    text: "Registra ogni spesa in pochi secondi, senza interrompere il ritmo della giornata.",
  },
  {
    number: "02",
    title: "Comprendi",
    text: "Trasforma numeri sparsi in una fotografia chiara delle tue abitudini.",
  },
  {
    number: "03",
    title: "Migliora",
    text: "Trova margine per le cose che contano, con decisioni semplici e misurabili.",
  },
];

export default function Home() {
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
              <p className="hero-lede">ExpenseTracker è il progetto che sto costruendo per rendere la gestione del denaro più semplice, leggibile e — soprattutto — sostenibile.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#dettagli">Esplora il progetto <ArrowDownRight size={17} /></a>
                <a className="text-link light-link" href="#contatti">Conosci il progetto <ArrowDownRight size={15} /></a>
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
                  <div className="dashboard-greeting"><span>Buongiorno, Alex</span><span className="dashboard-date">01 — 30 APR</span></div>
                  <div className="balance-row">
                    <div><p className="metric-label">Disponibile questo mese</p><strong className="balance">€ 1.240,80</strong><span className="balance-delta"><ArrowDownRight size={13} /> 8,4% vs marzo</span></div>
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
              <div className="floating-note"><span><CircleDollarSign size={16} /></span><div><strong>Risparmio rilevato</strong><small>+ € 128 questo mese</small></div></div>
            </div>
          </div>
          <div className="scroll-cue"><span>Scroll to explore</span><ArrowDownRight size={16} /></div>
        </section>

        <section className="manifesto-section" id="dettagli">
          <div className="container">
            <div className="section-intro split-intro">
              <div><div className="eyebrow"><span className="eyebrow-dot navy" /> Il problema</div><h2>La chiarezza è<br /><em>una scelta.</em></h2></div>
              <div className="intro-copy"><p>Abbiamo più strumenti che mai per monitorare il nostro denaro, ma spesso ci manca la cosa più importante: una visione d’insieme che non faccia venire voglia di chiudere l’app.</p><p>ExpenseTracker nasce per mettere ordine senza aggiungere rumore. Un piccolo progetto digitale, pensato intorno alle decisioni reali.</p></div>
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
            <div className="feature-copy"><div className="eyebrow"><span className="eyebrow-dot navy" /> Come funziona</div><h2>Piccole azioni.<br /><em>Segnali utili.</em></h2><p>Il cuore del progetto è una dashboard che non giudica, non complica e non nasconde le informazioni importanti. Solo ciò che serve, quando serve.</p><div className="feature-checks"><div><Check size={15} /> Categorie flessibili</div><div><Check size={15} /> Trend comprensibili</div><div><Check size={15} /> Dati sotto il tuo controllo</div></div></div>
            <div className="feature-visual">
              <div className="visual-label">01 / Insight settimanale</div>
              <div className="insight-card"><div className="insight-icon"><BarChart3 size={20} /></div><div><span className="insight-kicker">Il tuo ritmo sta cambiando</span><h3>Spendi il 12% in meno<br />nei giorni feriali.</h3><p>Un pattern positivo da osservare.</p></div><div className="insight-chart"><i /><i /><i /><i /><i /><i /><i /></div></div>
              <div className="visual-footer"><span><ShieldCheck size={15} /> Privacy first</span><span>Dettagli, non distrazioni</span></div>
            </div>
          </div>
        </section>

        <section className="roadmap-section">
          <div className="container roadmap-layout"><div className="roadmap-heading"><div className="eyebrow light"><span className="eyebrow-dot" /> Dove siamo</div><h2>Un progetto<br /><em>in movimento.</em></h2><p>Questa è la prima tappa. Il prodotto crescerà ascoltando le persone che lo useranno.</p></div><div className="roadmap-list"><div className="roadmap-item active"><span className="roadmap-status">01</span><div><strong>Fondamenta</strong><p>Flussi principali e prima dashboard</p></div><span className="roadmap-tag">completato</span></div><div className="roadmap-item"><span className="roadmap-status">02</span><div><strong>Rituale</strong><p>Insight ricorrenti e obiettivi personali</p></div><span className="roadmap-tag">in corso</span></div><div className="roadmap-item"><span className="roadmap-status">03</span><div><strong>Condivisione</strong><p>Spazi condivisi per progetti e famiglie</p></div><span className="roadmap-tag">prossimo</span></div></div></div>
        </section>

        <section className="contact-section" id="contatti">
          <div className="container contact-card"><div className="contact-orbit" aria-hidden="true" /><div className="eyebrow"><span className="eyebrow-dot navy" /> Contatti</div><h2>Hai un’idea da<br /><em>condividere?</em></h2><p>Sto costruendo ExpenseTracker un passo alla volta. Se ti interessa il progetto, vuoi provarlo o semplicemente parlarne, scrivimi.</p><a className="button button-dark" href="mailto:ciao@expensetracker.dev">Scrivimi <Mail size={17} /></a><div className="contact-meta"><span><Sparkles size={14} /> Sempre aperto a feedback</span><span>© 2026 ExpenseTracker</span></div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><a className="brand" href="#home"><span className="brand-mark small"><WalletCards size={14} /></span><span>Expense<span className="brand-accent">Tracker</span></span></a><p>Un progetto personale su chiarezza, abitudini e denaro.</p><div className="footer-links"><a href="#dettagli">Il progetto</a><a href="mailto:ciao@expensetracker.dev">Email</a><a href="https://github.com" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a></div></div></footer>
    </div>
  );
}
