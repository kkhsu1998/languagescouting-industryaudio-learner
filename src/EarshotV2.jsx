import React, { useState, useEffect } from "react";
import {
  Radar, Radio, ListFilter, Send, Settings2, Check, ChevronLeft,
  Sparkles, Clock, AlertTriangle, ThumbsUp, ThumbsDown, Play, Languages,
  Mail, MessageSquare, RotateCcw, Activity, FileText, ArrowRight,
  FileCheck2, AudioLines, Search
} from "lucide-react";

/* ------------------------------------------------------------------ */
const C = {
  ink: "#16232B", mute: "#6B7A80", faint: "#9AA6AA",
  paper: "#EDEBE4", card: "#FFFFFF", line: "#DCD9CF",
  pine: "#0B3D3B", pineSoft: "#E3EDEB",
  signal: "#F0A202", hot: "#C2452D", ok: "#7BA05B",
};
const SERIF = "'Iowan Old Style','Palatino Linotype',Palatino,Georgia,serif";
const SANS = "ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif";

/* ------------------------------------------------------------------ */
/*  three worked briefs — the product is horizontal, so prove it       */
/* ------------------------------------------------------------------ */
const BRIEFS = [
  {
    id: "fin",
    chip: "Payments product",
    text: "I run payments product at a Taiwanese e-commerce company. Tell me when regulators or large platforms change anything about cross-border settlement, stablecoin rails, or interchange in APAC. Ignore US consumer credit.",
    queries: [
      "cross-border settlement", "stablecoin payment rails", "interchange regulation APAC",
      "remittance corridors Asia", "payment orchestration", "e-commerce checkout",
      "CBDC pilots", "fintech licensing Singapore", "merchant acquiring",
    ],
    feeds: [
      { n: "Fintech Insider", host: "11:FS", tr: "tag", eps: 4, keep: true, why: "Operators and regulators on the record" },
      { n: "Payments on Fire", host: "Glenbrook", tr: "asr", eps: 3, keep: true, why: "No published transcripts — we transcribe" },
      { n: "The Fintech Blueprint", host: "Independent", tr: "tag", eps: 2, keep: true, why: "Long-form, deep on rails and infrastructure" },
      { n: "Money Movement", host: "Visa", tr: "asr", eps: 2, keep: true, why: "Vendor-run, but leaks roadmap detail" },
      { n: "Daily crypto price shows", host: "Various", tr: "asr", eps: 0, keep: false, why: "Dropped — 310 segments, 0 kept in 3 weeks" },
    ],
    signals: [
      {
        id: 1, urgent: true, conf: 0.86, tr: "tag",
        head: "A settlement provider is winding down a Southeast Asia corridor in Q1 — merchants haven't been told",
        show: "Payments on Fire", ep: "Ep 312 · What breaks when a corridor closes", ts: "27:15",
        who: "VP of Network Operations",
        quote: "We're consolidating. Two of the corridors we run today won't exist by the end of Q1, and honestly most of the merchants on them don't know yet.",
        zh: "我們正在整併。今天營運的兩條通道到第一季底就不存在了，老實說，多數在上面的商戶還不知道。",
        plain: "They're shutting down two payment routes by the end of Q1. Most businesses using them haven't been informed.",
        why: "Directly on your cross-border settlement watch item. No filing, no merchant notice — this exists only in the audio. If you route through them, your contingency window is now.",
        act: "Check exposure with your PSP",
      },
      {
        id: 2, urgent: false, conf: 0.79, tr: "asr",
        head: "Interchange consultation is moving faster than published timelines — three guests said so independently",
        show: "Fintech Insider + 2 others", ep: "3 episodes, cross-referenced", ts: "multiple",
        who: "A regulator, an acquirer CEO, and a consultant",
        quote: "The published timeline says next year. Everyone actually working on it is planning for a decision inside six months.",
        zh: "公告的時程說是明年。但真正在處理這件事的人，都在準備六個月內就會有結論。",
        plain: "Official timeline says next year. People close to it expect a decision within six months.",
        why: "Three independent sources converging in one week is the pattern, not any single quote. Your pricing model assumes the published date.",
        act: "Flag to pricing before the next model refresh",
      },
      {
        id: 3, urgent: false, conf: 0.71, tr: "tag",
        head: "A regional competitor appears to have quietly changed acquirers",
        show: "The Fintech Blueprint", ep: "Ep 145 · Checkout economics", ts: "41:30",
        who: "Host, in an aside",
        quote: "Their checkout looks different than it did six months ago. Nobody announced anything.",
        zh: "他們的結帳流程跟六個月前不一樣了。也沒人宣布過什麼。",
        plain: "Their checkout has changed in the past six months, with no announcement.",
        why: "Inference from an offhand remark — flagged low for that reason. Verify before it goes in any deck.",
        act: "Verify against their public checkout",
      },
    ],
  },
  {
    id: "bio",
    chip: "Biotech licensing",
    text: "Business development at a mid-size biotech. Flag any hint that a company is open to out-licensing outside the US, especially unannounced. Also track radiopharma and CDMO capacity. Ignore US-only commercial news.",
    queries: [
      "out-licensing partnerships", "ADC deals", "radiopharmaceuticals",
      "CDMO capacity", "APAC biotech licensing", "breakthrough designation",
      "clinical readouts", "biotech financing", "business development biotech",
    ],
    feeds: [
      { n: "The Business of Biotech", host: "Life Science Connect", tr: "tag", eps: 4, keep: true, why: "CBOs and CEOs discussing deal strategy" },
      { n: "The Long Run", host: "Timmerman Report", tr: "tag", eps: 3, keep: true, why: "Long-form investor interviews" },
      { n: "Bioverge Podcast", host: "Bioverge", tr: "asr", eps: 2, keep: true, why: "Added by Scout — guests overlap your kept signals" },
      { n: "STAT Readout LOUD", host: "STAT", tr: "asr", eps: 2, keep: true, why: "Clinical and regulatory commentary" },
      { n: "General VC podcasts", host: "Various", tr: "asr", eps: 0, keep: false, why: "Dropped — 214 segments, 0 kept in 3 weeks" },
    ],
    signals: [
      {
        id: 1, urgent: true, conf: 0.88, tr: "tag",
        head: "A CBO signals openness to ex-US partnering on their lead asset, 18 months before anyone expected it",
        show: "The Business of Biotech", ep: "Ep 214 · Building a commercial org from zero", ts: "31:42",
        who: "Chief Business Officer",
        quote: "We're not going to build a sales force in twelve markets. Somebody else should carry it outside the US, and we're further along in those conversations than people assume.",
        zh: "我們不會在十二個市場自建業務團隊。美國以外應該由其他人來做，而我們在這些洽談上的進度比外界以為的更快。",
        plain: "They won't build their own international sales team. They want a partner outside the US, and talks are already underway.",
        why: "Sits on your out-licensing watch item. No press release, no filing. If talks are live, the window for an inbound approach is now.",
        act: "Draft an outreach note",
      },
      {
        id: 2, urgent: false, conf: 0.81, tr: "asr",
        head: "Radiopharma's bottleneck is isotope supply, not clinical risk — three guests said it unprompted",
        show: "The Long Run + STAT", ep: "3 episodes, cross-referenced", ts: "multiple",
        who: "Two investors and one CEO",
        quote: "Everyone's modelling the trial risk. What actually kills these programmes is that you can't get the isotope on a reliable schedule.",
        zh: "大家都在算臨床試驗的風險。但真正搞垮這些專案的，是你根本拿不到穩定供應的同位素。",
        plain: "Investors worry about trial results. The real problem is unreliable supply of the isotope itself.",
        why: "Convergence across independent sources is the signal. Relevant to your CDMO item — supply-side partners may be the scarcer asset.",
        act: "Add to the radiopharma memo",
      },
      {
        id: 3, urgent: false, conf: 0.74, tr: "asr",
        head: "A competitor's Phase 2 readout has quietly slipped to the second half",
        show: "STAT Readout LOUD", ep: "Ep 88 · The week in clinical", ts: "12:05",
        who: "Reporter, paraphrasing an investor call",
        quote: "They've stopped saying first half. Nobody's said it moved, but the language changed about a month ago.",
        zh: "他們已經不再說上半年了。沒有人說時程延後，但大約一個月前用詞就變了。",
        plain: "The company no longer says 'first half'. No delay was announced, but the wording changed.",
        why: "Inference, not fact — flagged low for that reason. Verify before it reaches a deck.",
        act: "Verify against their last two calls",
      },
    ],
  },
  {
    id: "ops",
    chip: "Hardware procurement",
    text: "Procurement lead at an electronics manufacturer. I need to know about advanced packaging capacity, component lead times, freight rates, and tariff changes that hit APAC exports. Skip consumer gadget reviews.",
    queries: [
      "advanced packaging capacity", "semiconductor lead times", "freight rates Asia",
      "tariff changes electronics", "contract manufacturing", "component shortages",
      "supply chain risk", "port congestion", "export controls",
    ],
    feeds: [
      { n: "Asianometry", host: "Independent", tr: "tag", eps: 3, keep: true, why: "Deep on fab and packaging economics" },
      { n: "Supply Chain Now", host: "SCN", tr: "asr", eps: 5, keep: true, why: "High volume, low density — good recall" },
      { n: "The Freight Pod", host: "Independent", tr: "tag", eps: 2, keep: true, why: "Rate commentary from operators" },
      { n: "Chip Stock Investor", host: "Independent", tr: "asr", eps: 3, keep: true, why: "Added by Scout — capacity detail in earnings recaps" },
      { n: "Consumer gadget reviews", host: "Various", tr: "asr", eps: 0, keep: false, why: "Dropped — excluded by your brief, 0 kept" },
    ],
    signals: [
      {
        id: 1, urgent: true, conf: 0.84, tr: "tag",
        head: "Advanced packaging capacity is allocated through 2027 — said as an aside, not a headline",
        show: "Asianometry", ep: "Ep 191 · What packaging actually costs", ts: "18:52",
        who: "Guest, a packaging operations director",
        quote: "People keep asking when capacity frees up. It doesn't. Everything through 2027 is spoken for, and the queue behind that is already forming.",
        zh: "大家一直問產能什麼時候會釋出。不會。到 2027 年的產能全都被預訂了，後面的排隊名單也已經在形成。",
        plain: "Capacity won't free up. Everything through 2027 is already booked, with a waiting list forming behind it.",
        why: "Your advanced packaging watch item. This is a year further out than the public guidance your planning assumes.",
        act: "Escalate to the capacity planning review",
      },
      {
        id: 2, urgent: false, conf: 0.77, tr: "asr",
        head: "Three freight guests independently expect a transpacific rate spike before the quarter closes",
        show: "The Freight Pod + 2 others", ep: "3 episodes, cross-referenced", ts: "multiple",
        who: "Two brokers and a shipper",
        quote: "Nobody's contracted for what's about to come through. When it hits, spot goes first and it goes hard.",
        zh: "沒有人為接下來的量簽好約。一旦爆發，現貨價會先漲，而且漲得很兇。",
        plain: "Shipping isn't contracted for the coming volume. Spot rates will rise first, and sharply.",
        why: "Convergence, not a single claim. If you're on spot for any lane, the cost assumption in your quarterly plan is soft.",
        act: "Review lanes still on spot pricing",
      },
      {
        id: 3, urgent: false, conf: 0.69, tr: "asr",
        head: "A competitor's plant expansion may have slipped two quarters",
        show: "Supply Chain Now", ep: "Ep 402 · Regional manufacturing", ts: "33:41",
        who: "Analyst guest",
        quote: "The ribbon-cutting was supposed to be this quarter. It's gone quiet.",
        zh: "剪綵原本應該是這一季。現在都沒聲音了。",
        plain: "The opening was scheduled for this quarter. There's been no news since.",
        why: "Absence of news, not evidence — the lowest-confidence class of signal we surface. Treat as a prompt to check, nothing more.",
        act: "Check their local permit filings",
      },
    ],
  },
];

const CHANNELS = [
  { k: "slack", i: MessageSquare, l: "Slack DM", d: "Urgent signals, immediately" },
  { k: "email", i: Mail, l: "Email digest", d: "Everything else, 08:00 daily" },
  { k: "doc", i: FileText, l: "Notion page", d: "Rolling archive, searchable" },
];

const RUNLOG = [
  { a: "Scout", t: "Re-ranked candidate feeds against your brief. Added 1, dropped 1.", n: "47 feeds" },
  { a: "Listener", t: "16 new episodes. 9 shipped a transcript tag, 7 we transcribed ourselves.", n: "61.4 hrs" },
  { a: "Listener", t: "Cache hit on 122 previously seen episodes — skipped, nothing re-transcribed.", n: "122 cached" },
  { a: "Analyst", t: "Scored 2,431 segments against the standing brief.", n: "2,431" },
  { a: "Analyst", t: "Discarded 2,422. Kept 9. Two met a time-sensitive rule.", n: "9 kept" },
  { a: "Interpreter", t: "Translated kept segments to 繁體中文 and stripped jargon.", n: "" },
  { a: "Dispatcher", t: "1 signal met the urgent rule and went to Slack. 8 queued for 08:00.", n: "sent" },
];

/* ------------------------------------------------------------------ */
function Btn({ children, onClick, kind = "solid", full, disabled, small }) {
  const style =
    kind === "solid" ? { background: disabled ? "#BFC7C5" : C.pine, color: "#fff" }
    : kind === "warm" ? { background: C.signal, color: C.ink }
    : { background: "transparent", color: C.ink, border: `1px solid ${C.line}` };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full ${small ? "px-3.5 py-2" : "px-5 py-2.5"} ${full ? "w-full" : ""}`}
      style={{ ...style, fontFamily: SANS, fontSize: 13.5, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer" }}
    >
      {children}
    </button>
  );
}

function AgentTag({ a }) {
  const col = { Scout: "#3B6E8F", Listener: "#5B7C5A", Analyst: "#8A5A2B", Interpreter: "#6B4E7D", Dispatcher: "#0B3D3B" }[a] || C.pine;
  return (
    <span className="px-2 py-0.5 rounded shrink-0"
      style={{ background: col, color: "#fff", fontFamily: SANS, fontSize: 10, fontWeight: 700 }}>
      {a}
    </span>
  );
}

/* transcript provenance — visible everywhere, because it's the credibility question */
function Prov({ tr, small }) {
  const tag = tr === "tag";
  const I = tag ? FileCheck2 : AudioLines;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full shrink-0"
      style={{
        background: tag ? "#E9F0E4" : "#FBF2DF",
        color: tag ? "#415730" : "#7A5308",
        fontFamily: SANS, fontSize: small ? 10 : 10.5, fontWeight: 600,
      }}>
      <I size={10} /> {tag ? "publisher transcript" : "we transcribed it"}
    </span>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div style={{ fontFamily: SERIF, fontSize: 25, color: C.ink, lineHeight: 1 }}>{n}</div>
      <div style={{ fontFamily: SANS, fontSize: 11, color: C.mute, marginTop: 4 }}>{l}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export default function Earshot() {
  const [phase, setPhase] = useState("brief");
  const [bi, setBi] = useState(1);
  const [text, setText] = useState(BRIEFS[1].text);
  const [disc, setDisc] = useState(0);
  const [tab, setTab] = useState("run");
  const [runAt, setRunAt] = useState(0);
  const [openId, setOpenId] = useState(null);
  const [zh, setZh] = useState(false);
  const [plain, setPlain] = useState(false);
  const [votes, setVotes] = useState({});
  const [toast, setToast] = useState(null);

  const B = BRIEFS[bi];

  useEffect(() => {
    if (phase !== "discover") return;
    if (disc >= 3) return;
    const t = setTimeout(() => setDisc((d) => d + 1), disc === 0 ? 600 : 1100);
    return () => clearTimeout(t);
  }, [phase, disc]);

  useEffect(() => {
    if (phase !== "console" || tab !== "run" || runAt >= RUNLOG.length) return;
    const t = setTimeout(() => setRunAt((x) => x + 1), runAt === 0 ? 400 : 700);
    return () => clearTimeout(t);
  }, [phase, tab, runAt]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  function pickBrief(i) { setBi(i); setText(BRIEFS[i].text); }
  function reset() {
    setPhase("brief"); setDisc(0); setTab("run"); setRunAt(0);
    setOpenId(null); setVotes({});
  }

  /* ---------------- 1. the brief ---------------- */
  if (phase === "brief") {
    return (
      <Shell reset={reset}>
        <div className="mx-auto" style={{ maxWidth: 600 }}>
          <div className="p-8 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.line}` }}>
            <h2 style={{ fontFamily: SERIF, fontSize: 26, color: C.ink, margin: 0, lineHeight: 1.2 }}>
              Describe the job you need doing.
            </h2>
            <p style={{ fontSize: 13.5, color: C.mute, marginTop: 8, marginBottom: 22, lineHeight: 1.6 }}>
              Not a topic — a job. Say what you'd want to be told, and what you'd rather never hear
              about again. This is the only instruction the agents ever get.
            </p>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              className="w-full p-4 rounded-xl focus:outline-none"
              style={{ border: `1.5px solid ${C.line}`, fontFamily: SANS, fontSize: 13.5, lineHeight: 1.65, color: C.ink, resize: "none" }}
            />

            <div style={{ fontSize: 12, color: C.mute, margin: "16px 0 8px" }}>
              Or start from one of these
            </div>
            <div className="flex flex-wrap gap-2">
              {BRIEFS.map((b, i) => (
                <button key={b.id} onClick={() => pickBrief(i)}
                  className="px-3.5 py-2 rounded-full"
                  style={{
                    border: `1.5px solid ${bi === i ? C.pine : C.line}`,
                    background: bi === i ? C.pine : C.card,
                    color: bi === i ? "#fff" : C.ink,
                    fontFamily: SANS, fontSize: 12.5, fontWeight: bi === i ? 600 : 400,
                  }}>
                  {b.chip}
                </button>
              ))}
            </div>

            <div className="mt-7">
              <Btn full disabled={text.trim().length < 30} onClick={() => { setDisc(0); setPhase("discover"); }}>
                Find the sources <ArrowRight size={15} />
              </Btn>
            </div>
          </div>
          <p style={{ fontSize: 12, color: C.mute, textAlign: "center", marginTop: 16 }}>
            No source list to curate. Scout builds one from this text and maintains it afterwards.
          </p>
        </div>
      </Shell>
    );
  }

  /* ---------------- 2. discovery ---------------- */
  if (phase === "discover") {
    return (
      <Shell reset={reset}>
        <div className="mx-auto" style={{ maxWidth: 640 }}>
          <div className="p-7 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.line}` }}>
            <div className="flex items-center gap-2 mb-1">
              <AgentTag a="Scout" />
              <h2 style={{ fontFamily: SERIF, fontSize: 21, color: C.ink, margin: 0 }}>
                Building your source list
              </h2>
            </div>
            <p style={{ fontSize: 13, color: C.mute, marginTop: 8, marginBottom: 22, lineHeight: 1.6 }}>
              Your brief becomes search queries, the queries become feeds, and the feeds get checked
              for whether their publisher ships a transcript.
            </p>

            {disc >= 1 && (
              <div className="mb-6">
                <div className="flex items-center gap-1.5 mb-2.5" style={{ fontSize: 12, color: C.mute }}>
                  <Search size={12} /> Expanded to {B.queries.length} queries
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {B.queries.map((q) => (
                    <span key={q} className="px-2.5 py-1 rounded-full"
                      style={{ background: "#F3F2ED", color: C.ink, fontSize: 11.5 }}>
                      {q}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {disc >= 2 && (
              <div className="mb-6">
                <div className="flex items-center gap-1.5 mb-2.5" style={{ fontSize: 12, color: C.mute }}>
                  <Radar size={12} /> 214 feeds returned, 47 kept after scoring
                </div>
                <div className="flex flex-col gap-2">
                  {B.feeds.filter((f) => f.keep).map((f) => (
                    <div key={f.n} className="p-3.5 rounded-xl flex items-center gap-3"
                      style={{ border: `1px solid ${C.line}` }}>
                      <Radio size={14} color={C.pine} className="shrink-0" />
                      <div className="flex-1">
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{f.n}</div>
                        <div style={{ fontSize: 12, color: C.mute, marginTop: 2 }}>{f.host}</div>
                      </div>
                      <Prov tr={f.tr} small />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {disc >= 3 ? (
              <>
                <div className="p-4 rounded-xl mb-6 flex gap-2.5" style={{ background: C.pineSoft }}>
                  <Sparkles size={15} color={C.pine} className="shrink-0 mt-0.5" />
                  <p style={{ fontSize: 12.5, lineHeight: 1.55, color: C.ink, margin: 0 }}>
                    Roughly half these feeds publish their own transcripts, which cost nothing to read.
                    The rest get transcribed once and cached, so the second run is nearly free.
                  </p>
                </div>
                <Btn full onClick={() => { setRunAt(0); setPhase("console"); }}>
                  Start the first run <ArrowRight size={15} />
                </Btn>
              </>
            ) : (
              <div className="flex items-center gap-2 py-2" style={{ color: C.faint }}>
                <div className="rounded-full" style={{ width: 7, height: 7, background: C.signal }} />
                <span style={{ fontSize: 12.5 }}>working…</span>
              </div>
            )}
          </div>
        </div>
      </Shell>
    );
  }

  /* ---------------- 3. console ---------------- */
  const sig = B.signals.find((s) => s.id === openId);

  return (
    <Shell reset={reset}>
      <div className="flex gap-6 items-start flex-wrap">
        <div className="rounded-2xl overflow-hidden shrink-0" style={{ background: C.pine, width: 200 }}>
          <div className="px-5 pt-5 pb-4">
            <div style={{ fontFamily: SERIF, fontSize: 19, color: "#fff" }}>Earshot</div>
            <div style={{ fontFamily: SANS, fontSize: 11, color: "#8FB0AC", marginTop: 2 }}>{B.chip}</div>
          </div>
          {[
            { k: "run", i: Activity, l: "Last run" },
            { k: "briefing", i: ListFilter, l: "Briefing", badge: 9 },
            { k: "sources", i: Radar, l: "Sources" },
            { k: "rules", i: Settings2, l: "Automations" },
          ].map((t) => {
            const on = tab === t.k; const I = t.i;
            return (
              <button key={t.k} onClick={() => { setTab(t.k); setOpenId(null); }}
                className="w-full flex items-center gap-2.5 px-5 py-3"
                style={{ background: on ? "rgba(255,255,255,0.11)" : "transparent" }}>
                <I size={15} color={on ? "#fff" : "#8FB0AC"} />
                <span style={{ fontFamily: SANS, fontSize: 13, color: on ? "#fff" : "#B7CCC9", fontWeight: on ? 600 : 400 }}>
                  {t.l}
                </span>
                {t.badge && (
                  <span className="ml-auto px-1.5 rounded-full"
                    style={{ background: C.signal, color: C.ink, fontSize: 10, fontWeight: 700 }}>
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="px-5 py-4 mt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="flex items-center gap-1.5">
              <Clock size={12} color="#8FB0AC" />
              <span style={{ fontFamily: SANS, fontSize: 11, color: "#8FB0AC" }}>Next run 02:00</span>
            </div>
          </div>
        </div>

        <div className="flex-1" style={{ minWidth: 420 }}>
          {sig ? (
            <SignalDetail s={sig} close={() => setOpenId(null)} zh={zh} setZh={setZh}
              plain={plain} setPlain={setPlain} votes={votes} setVotes={setVotes} toast={setToast} />
          ) : tab === "run" ? (
            <RunView at={runAt} go={() => setTab("briefing")} again={() => setRunAt(0)} />
          ) : tab === "briefing" ? (
            <Briefing B={B} openSig={setOpenId} />
          ) : tab === "sources" ? (
            <Sources B={B} />
          ) : (
            <Rules B={B} />
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed left-0 right-0 flex justify-center" style={{ bottom: 28 }}>
          <div className="px-4 py-2.5 rounded-full" style={{ background: C.ink, color: "#fff", fontSize: 13 }}>
            {toast}
          </div>
        </div>
      )}
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
function Shell({ children, reset }) {
  return (
    <div className="min-h-screen w-full" style={{ background: C.paper, fontFamily: SANS }}>
      <div className="mx-auto px-6 py-10" style={{ maxWidth: 1180 }}>
        <header className="mb-8 flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h1 style={{ fontFamily: SERIF, fontSize: 33, color: C.ink, margin: 0, lineHeight: 1.1 }}>Earshot</h1>
            <p style={{ fontSize: 14, color: C.mute, marginTop: 8, maxWidth: 640, lineHeight: 1.6 }}>
              Five agents that listen to your industry's podcasts on a schedule, throw away 99% of what
              they hear, and hand you the few things that change what you'd do this week.
            </p>
          </div>
          <button onClick={reset} className="flex items-center gap-2 shrink-0"
            style={{ fontSize: 12.5, color: C.pine, fontWeight: 600 }}>
            <RotateCcw size={13} /> Restart
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function RunView({ at, go, again }) {
  const done = at >= RUNLOG.length;
  return (
    <div className="rounded-2xl p-6" style={{ background: C.card, border: `1px solid ${C.line}` }}>
      <div className="flex items-center justify-between gap-3 mb-1 flex-wrap">
        <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.ink, margin: 0 }}>
          {done ? "Run complete" : "Run in progress"}
        </h2>
        {done ? (
          <Btn small kind="ghost" onClick={again}><Play size={13} /> Run now</Btn>
        ) : (
          <span className="px-2.5 py-1 rounded-full" style={{ background: C.signal, color: C.ink, fontSize: 11, fontWeight: 700 }}>
            live
          </span>
        )}
      </div>
      <p style={{ fontSize: 13, color: C.mute, marginBottom: 22 }}>
        Scheduled nightly at 02:00. Nobody prompted this one.
      </p>

      <div className="flex flex-col gap-3 mb-7">
        {RUNLOG.slice(0, at).map((l, i) => (
          <div key={i} className="flex items-start gap-3">
            <AgentTag a={l.a} />
            <p style={{ fontSize: 13.5, lineHeight: 1.55, color: C.ink, margin: 0, flex: 1 }}>{l.t}</p>
            {l.n && <span style={{ fontFamily: SERIF, fontSize: 13, color: C.pine, whiteSpace: "nowrap" }}>{l.n}</span>}
          </div>
        ))}
        {!done && (
          <div className="flex items-center gap-2" style={{ color: C.faint }}>
            <div className="rounded-full" style={{ width: 7, height: 7, background: C.signal }} />
            <span style={{ fontSize: 12.5 }}>working…</span>
          </div>
        )}
      </div>

      {done && (
        <>
          <div className="rounded-xl p-5 mb-5 flex items-center justify-between flex-wrap gap-4" style={{ background: C.pineSoft }}>
            <Stat n="61.4 hrs" l="Audio in" />
            <Stat n="2,431" l="Segments scored" />
            <Stat n="9" l="Signals kept" />
            <Stat n="6 min" l="Your reading time" />
          </div>
          <Btn onClick={go}>Read the briefing <ArrowRight size={15} /></Btn>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
function Briefing({ B, openSig }) {
  return (
    <div>
      <div className="rounded-2xl p-6 mb-4" style={{ background: C.card, border: `1px solid ${C.line}` }}>
        <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.ink, margin: 0 }}>Thursday briefing</h2>
        <p style={{ fontSize: 13, color: C.mute, marginTop: 6, lineHeight: 1.6 }}>
          Three of nine shown. One met your urgent rule and reached Slack at 02:14, before you woke up.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {B.signals.map((s) => (
          <button key={s.id} onClick={() => openSig(s.id)} className="text-left rounded-2xl p-5 w-full"
            style={{ background: C.card, border: `1px solid ${s.urgent ? C.hot : C.line}` }}>
            <div className="flex items-center gap-2 mb-2.5 flex-wrap">
              {s.urgent && (
                <span className="px-2 py-0.5 rounded-full flex items-center gap-1"
                  style={{ background: C.hot, color: "#fff", fontSize: 10.5, fontWeight: 700 }}>
                  <AlertTriangle size={10} /> sent to Slack
                </span>
              )}
              <Prov tr={s.tr} small />
              <span className="ml-auto" style={{ fontFamily: SERIF, fontSize: 13, color: C.pine }}>
                {Math.round(s.conf * 100)}% confidence
              </span>
            </div>

            <h3 style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.3, color: C.ink, margin: 0 }}>{s.head}</h3>
            <div style={{ fontSize: 11.5, color: C.mute, marginTop: 6 }}>{s.show} · {s.ts}</div>

            <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: `1px solid ${C.line}` }}>
              <Sparkles size={13} color={C.signal} className="shrink-0 mt-0.5" />
              <p style={{ fontSize: 12.5, lineHeight: 1.55, color: C.mute, margin: 0 }}>{s.why}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function SignalDetail({ s, close, zh, setZh, plain, setPlain, votes, setVotes, toast }) {
  const v = votes[s.id];
  return (
    <div className="rounded-2xl p-6" style={{ background: C.card, border: `1px solid ${C.line}` }}>
      <button onClick={close} className="flex items-center gap-1 mb-4" style={{ fontSize: 12.5, color: C.mute }}>
        <ChevronLeft size={14} /> Back to briefing
      </button>

      <h2 style={{ fontFamily: SERIF, fontSize: 22, lineHeight: 1.28, color: C.ink, margin: 0 }}>{s.head}</h2>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3" style={{ fontSize: 12, color: C.mute }}>
        <span>{s.show}</span><span>{s.ep}</span><span>{s.who}</span>
        <Prov tr={s.tr} />
      </div>

      <div className="mt-5 rounded-xl p-5" style={{ background: "#FBF8F0", border: `1px solid ${C.signal}` }}>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button className="rounded-full flex items-center justify-center"
              style={{ width: 32, height: 32, background: C.pine, color: "#fff" }}>
              <Play size={14} />
            </button>
            <span style={{ fontSize: 12, color: C.mute }}>Play from {s.ts}</span>
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => setZh(!zh)} className="px-2.5 py-1.5 rounded-full flex items-center gap-1"
              style={{ background: zh ? C.pine : "transparent", color: zh ? "#fff" : C.pine,
                border: `1px solid ${zh ? C.pine : "#C9BA95"}`, fontSize: 11, fontWeight: 600 }}>
              <Languages size={11} /> 中文
            </button>
            <button onClick={() => setPlain(!plain)} className="px-2.5 py-1.5 rounded-full"
              style={{ background: plain ? C.pine : "transparent", color: plain ? "#fff" : C.pine,
                border: `1px solid ${plain ? C.pine : "#C9BA95"}`, fontSize: 11, fontWeight: 600 }}>
              No jargon
            </button>
          </div>
        </div>

        <p style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.65, color: C.ink, margin: 0 }}>
          {plain ? s.plain : s.quote}
        </p>
        {zh && (
          <p style={{ fontSize: 14, lineHeight: 1.75, color: C.mute, marginTop: 12, paddingTop: 12, borderTop: "1px dashed #D8CBA8" }}>
            {s.zh}
          </p>
        )}
      </div>

      <div className="mt-5">
        <div style={{ fontSize: 12, color: C.mute, marginBottom: 6 }}>Why this reached you</div>
        <p style={{ fontSize: 13.5, lineHeight: 1.65, color: C.ink, margin: 0 }}>{s.why}</p>
      </div>

      <div className="mt-6 flex gap-3 flex-wrap">
        <Btn kind="warm" onClick={() => toast("Draft opened in your email client")}>
          <Send size={14} /> {s.act}
        </Btn>
        <Btn kind="ghost" onClick={() => toast("Filed to the rolling archive")}>
          <FileText size={14} /> File it
        </Btn>
      </div>

      <div className="mt-6 pt-5 flex items-center gap-3 flex-wrap" style={{ borderTop: `1px solid ${C.line}` }}>
        <span style={{ fontSize: 12.5, color: C.mute }}>Was this worth your time?</span>
        <button onClick={() => { setVotes({ ...votes, [s.id]: "up" }); toast("Analyst will weight this pattern higher"); }}
          className="p-2 rounded-full"
          style={{ background: v === "up" ? C.ok : "transparent", border: `1px solid ${v === "up" ? C.ok : C.line}`, color: v === "up" ? "#fff" : C.mute }}>
          <ThumbsUp size={14} />
        </button>
        <button onClick={() => { setVotes({ ...votes, [s.id]: "down" }); toast("Analyst will suppress this pattern"); }}
          className="p-2 rounded-full"
          style={{ background: v === "down" ? C.hot : "transparent", border: `1px solid ${v === "down" ? C.hot : C.line}`, color: v === "down" ? "#fff" : C.mute }}>
          <ThumbsDown size={14} />
        </button>
        {v && <span style={{ fontSize: 12, color: C.pine, fontWeight: 600 }}>Brief updated — takes effect tonight</span>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function Sources({ B }) {
  const tagged = B.feeds.filter((f) => f.keep && f.tr === "tag").length;
  const kept = B.feeds.filter((f) => f.keep).length;
  return (
    <div className="rounded-2xl p-6" style={{ background: C.card, border: `1px solid ${C.line}` }}>
      <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.ink, margin: 0 }}>Sources</h2>
      <p style={{ fontSize: 13, color: C.mute, marginTop: 6, marginBottom: 18, lineHeight: 1.6 }}>
        You never added a feed and never removed one. Scout found these from your brief, and each one
        keeps or loses its place on signals produced per hour of audio.
      </p>

      <div className="rounded-xl p-4 mb-5 flex items-center gap-5 flex-wrap" style={{ background: C.pineSoft }}>
        <Stat n={`${tagged}/${kept}`} l="Ship their own transcript" />
        <Stat n="122" l="Episodes already cached" />
        <Stat n="1" l="Feed dropped this week" />
      </div>

      <div className="flex flex-col gap-2.5">
        {B.feeds.map((f) => (
          <div key={f.n} className="p-4 rounded-xl flex items-start gap-3"
            style={{ border: `1px solid ${C.line}`, background: f.keep ? C.card : "#F6F5F1", opacity: f.keep ? 1 : 0.7 }}>
            <Radio size={15} color={f.keep ? C.pine : C.faint} className="shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span style={{ fontSize: 14, fontWeight: 600, color: C.ink, textDecoration: f.keep ? "none" : "line-through" }}>
                  {f.n}
                </span>
                {f.keep && <Prov tr={f.tr} small />}
              </div>
              <div style={{ fontSize: 12.5, color: C.mute, marginTop: 4, lineHeight: 1.5 }}>{f.why}</div>
            </div>
            {f.keep
              ? <span style={{ fontFamily: SERIF, fontSize: 13, color: C.pine, whiteSpace: "nowrap" }}>{f.eps} new</span>
              : <span style={{ fontSize: 11, color: C.hot, fontWeight: 600, whiteSpace: "nowrap" }}>dropped</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function Rules({ B }) {
  const rules = [
    { w: "A claim in your brief's own words appears with a named speaker attached", t: "Slack, now", hot: true },
    { w: "Three or more independent sources converge on one claim within 7 days", t: "Slack, now", hot: true },
    { w: "A competitor you've named is discussed for more than 90 seconds", t: "Daily digest", hot: false },
    { w: "Anything else scoring above 0.7 against the brief", t: "Daily digest", hot: false },
  ];
  return (
    <div className="rounded-2xl p-6" style={{ background: C.card, border: `1px solid ${C.line}` }}>
      <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.ink, margin: 0 }}>Automations</h2>
      <p style={{ fontSize: 13, color: C.mute, marginTop: 6, marginBottom: 20, lineHeight: 1.6 }}>
        What interrupts you and what waits. Dispatcher decides per signal.
      </p>

      <div className="flex flex-col gap-2.5 mb-7">
        {rules.map((r) => (
          <div key={r.w} className="p-4 rounded-xl flex items-center gap-3" style={{ border: `1px solid ${C.line}` }}>
            <div className="rounded-full shrink-0" style={{ width: 8, height: 8, background: r.hot ? C.hot : C.faint }} />
            <div className="flex-1" style={{ fontSize: 13.5, color: C.ink, lineHeight: 1.5 }}>{r.w}</div>
            <span className="px-2.5 py-1 rounded-full shrink-0"
              style={{ background: r.hot ? "#F7E4E0" : "#F1F0EC", color: r.hot ? C.hot : C.mute, fontSize: 11, fontWeight: 600 }}>
              {r.t}
            </span>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12, color: C.mute, marginBottom: 10 }}>Delivery</div>
      <div className="flex gap-2 flex-wrap">
        {CHANNELS.map((c) => {
          const I = c.i;
          return (
            <div key={c.k} className="px-3.5 py-2 rounded-full flex items-center gap-2"
              style={{ background: C.pineSoft, color: C.pine, fontSize: 12.5, fontWeight: 600 }}>
              <I size={13} /> {c.l}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${C.line}` }}>
        <div style={{ fontSize: 12, color: C.mute, marginBottom: 8 }}>Your standing brief</div>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: C.ink, margin: 0 }}>{B.text}</p>
      </div>
    </div>
  );
}
