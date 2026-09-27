import { useMemo, useState } from "react";
import { Bell, Building2, Heart, LayoutDashboard, Search, SlidersHorizontal } from "lucide-react";
import { opportunities } from "./data";
import { loadAlerts, loadFavorites, saveAlerts, saveFavorites } from "./storage";
import type { AlertRule } from "./types";

type View = "dashboard" | "opportunities" | "favorites" | "alerts";

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function App() {
  const [view, setView] = useState<View>("dashboard");
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [favorites, setFavorites] = useState<string[]>(loadFavorites);
  const [alerts, setAlerts] = useState<AlertRule[]>(loadAlerts);
  const [keyword, setKeyword] = useState("");

  const filtered = useMemo(() => opportunities.filter((item) => {
    const haystack = `${item.title} ${item.agency} ${item.city} ${item.category}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    const matchesState = !stateFilter || item.state === stateFilter;
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    const matchesFavorites = view !== "favorites" || favorites.includes(item.id);
    return matchesQuery && matchesState && matchesCategory && matchesFavorites;
  }), [query, stateFilter, categoryFilter, favorites, view]);

  const toggleFavorite = (id: string) => {
    const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
    setFavorites(next);
    saveFavorites(next);
  };

  const addAlert = () => {
    const clean = keyword.trim();
    if (!clean) return;
    const next = [...alerts, { id: crypto.randomUUID(), keyword: clean, state: stateFilter || "Todos", city: "Todos" }];
    setAlerts(next);
    saveAlerts(next);
    setKeyword("");
  };

  const removeAlert = (id: string) => {
    const next = alerts.filter((item) => item.id !== id);
    setAlerts(next);
    saveAlerts(next);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">R</div>
          <div>
            <strong>Radar</strong>
            <span>de Oportunidades</span>
          </div>
        </div>

        <nav>
          <button className={view === "dashboard" ? "active" : ""} onClick={() => setView("dashboard")}><LayoutDashboard size={18}/>Painel</button>
          <button className={view === "opportunities" ? "active" : ""} onClick={() => setView("opportunities")}><Building2 size={18}/>Oportunidades</button>
          <button className={view === "favorites" ? "active" : ""} onClick={() => setView("favorites")}><Heart size={18}/>Favoritos</button>
          <button className={view === "alerts" ? "active" : ""} onClick={() => setView("alerts")}><Bell size={18}/>Meus alertas</button>
        </nav>

        <div className="independent-note">
          Ferramenta independente. Não representa órgão público.
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div>
            <p className="eyebrow">MVP • dados de demonstração</p>
            <h1>{view === "dashboard" ? "Painel" : view === "opportunities" ? "Oportunidades" : view === "favorites" ? "Favoritos" : "Meus alertas"}</h1>
          </div>
          <span className="demo-badge">Demonstração</span>
        </header>

        {view === "dashboard" && (
          <>
            <section className="stats-grid">
              <article><span>Oportunidades</span><strong>{opportunities.length}</strong></article>
              <article><span>Favoritas</span><strong>{favorites.length}</strong></article>
              <article><span>Alertas criados</span><strong>{alerts.length}</strong></article>
            </section>
            <section className="panel hero-panel">
              <div>
                <p className="eyebrow">Comece pelo problema certo</p>
                <h2>Encontre compras públicas compatíveis com o seu negócio.</h2>
                <p>Pesquise por produto, serviço, cidade ou categoria. Nesta versão os dados são de demonstração.</p>
              </div>
              <button className="primary" onClick={() => setView("opportunities")}>Ver oportunidades</button>
            </section>
            <OpportunityList items={opportunities.slice(0,3)} favorites={favorites} onFavorite={toggleFavorite}/>
          </>
        )}

        {(view === "opportunities" || view === "favorites") && (
          <>
            <section className="filters panel">
              <div className="search-box"><Search size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar produto, serviço, órgão ou cidade"/></div>
              <div className="filter-row">
                <label><SlidersHorizontal size={16}/>UF<select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}><option value="">Todas</option><option value="MT">MT</option></select></label>
                <label>Categoria<select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}><option value="">Todas</option>{[...new Set(opportunities.map(o => o.category))].map(c => <option key={c}>{c}</option>)}</select></label>
              </div>
            </section>
            <OpportunityList items={filtered} favorites={favorites} onFavorite={toggleFavorite}/>
          </>
        )}

        {view === "alerts" && (
          <section className="panel alerts-panel">
            <div>
              <p className="eyebrow">Automatize sua busca</p>
              <h2>Crie um alerta</h2>
              <p>Quando conectarmos dados reais, estas regras poderão disparar notificações.</p>
            </div>
            <div className="alert-form">
              <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Ex.: material de limpeza"/>
              <button className="primary" onClick={addAlert}>Criar alerta</button>
            </div>
            <div className="alert-list">
              {alerts.length === 0 ? <div className="empty">Nenhum alerta criado ainda.</div> : alerts.map(alert => (
                <div className="alert-item" key={alert.id}>
                  <div><Bell size={17}/><div><strong>{alert.keyword}</strong><span>{alert.state}</span></div></div>
                  <button onClick={() => removeAlert(alert.id)}>Excluir</button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function OpportunityList({items, favorites, onFavorite}:{items: typeof opportunities; favorites:string[]; onFavorite:(id:string)=>void}) {
  return (
    <section className="opportunity-grid">
      {items.length === 0 ? <div className="panel empty">Nenhuma oportunidade encontrada com esses filtros.</div> : items.map(item => (
        <article className="opportunity-card" key={item.id}>
          <div className="card-topline"><span>{item.modality}</span><span className="mini-demo">Demo</span></div>
          <h3>{item.title}</h3>
          <p className="agency">{item.agency}</p>
          <div className="meta">
            <span>{item.city}/{item.state}</span>
            <span>{item.category}</span>
          </div>
          <div className="value-row">
            <div><small>Valor estimado</small><strong>{item.value ? money.format(item.value) : "Não informado"}</strong></div>
            <div><small>Prazo</small><strong>{new Date(item.deadline + "T12:00:00").toLocaleDateString("pt-BR")}</strong></div>
          </div>
          <div className="card-actions">
            <a href={item.sourceUrl} target="_blank" rel="noreferrer">Ver fonte oficial</a>
            <button aria-label="Favoritar" className={favorites.includes(item.id) ? "favorite active" : "favorite"} onClick={() => onFavorite(item.id)}><Heart size={18} fill={favorites.includes(item.id) ? "currentColor" : "none"}/></button>
          </div>
        </article>
      ))}
    </section>
  );
}
