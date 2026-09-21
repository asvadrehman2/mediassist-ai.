import React, { useState } from 'react';
import { Stethoscope, Activity, FileText, ShieldAlert, Sparkles, CheckCircle2, AlertCircle, HeartPulse, Brain, Microscope, Pill } from 'lucide-react';

export function App() {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult({
        summary: "Clinical presentation strongly points toward an acute intra-abdominal inflammatory process requiring urgent surgical evaluation.",
        differentials: [
          { name: 'Acute Appendicitis', probability: '92%', risk: 'Critical', rationale: 'Classic presentation: periumbilical pain shifting to right lower quadrant with localized peritoneal signs, anorexia, and low-grade pyrexia.' },
          { name: 'Acute Mesenteric Adenitis', probability: '45%', risk: 'Moderate', rationale: 'Common mimic in younger adults, frequently preceded by an upper respiratory viral illness.' },
          { name: 'Meckel Diverticulitis', probability: '15%', risk: 'High', rationale: 'Congenital anomaly presenting identically to appendicitis; difficult to differentiate preoperatively.' },
          { name: 'Pelvic Inflammatory Disease (PID)', probability: '25%', risk: 'Moderate', rationale: 'Must be ruled out via bimanual pelvic exam and beta-hCG in female patients of childbearing age.' }
        ],
        investigations: [
          { test: 'Complete Blood Count (CBC)', detail: 'Look for leukocytosis (WBC > 12,000/mcL) with neutrophilic predominance and left shift.' },
          { test: 'Serum C-Reactive Protein (CRP)', detail: 'Elevated markers support systemic inflammation and tissue irritation.' },
          { test: 'Urinalysis & Microscopy', detail: 'Essential to rule out urinary tract infection, pyelonephritis, or renal calculus.' },
          { test: 'Ultrasonography Abdomen / CT with IV Contrast', detail: 'Gold standard: look for non-compressible, aperistaltic tubular structure >6mm diameter with periappendiceal fat stranding.' }
        ],
        treatment: [
          { phase: 'Immediate Stabilization', action: 'Keep patient NPO (Nil Per Os) in anticipation of potential emergency surgical intervention.' },
          { phase: 'Fluid Resuscitation', action: 'Initiate IV isotonic crystalloids (Normal Saline or Lactated Ringer’s) at maintenance or deficit correction rates.' },
          { phase: 'Pharmacotherapy', action: 'Administer empirical broad-spectrum IV antibiotics covering gram-negative and anaerobic organisms (e.g., Piperacillin-Tazobactam or Ceftriaxone + Metronidazole).' },
          { phase: 'Surgical Consultation', action: 'Urgent referral to General Surgery team for laparoscopic vs. open appendectomy evaluation.' }
        ]
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20 text-white">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                MediAssist AI
              </h1>
              <p className="text-xs text-slate-400">Advanced Clinical Decision Support Platform</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>AI Diagnostic Engine Online</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-12 max-w-5xl mx-auto w-full">
        {!result ? (
          /* Centered Modern Hero Search State */
          <div className="w-full text-center space-y-8 animate-fade-in my-auto">
            <div className="space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Medical Intelligence</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                Intelligent Clinical <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Analysis</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Input detailed patient symptoms, vitals, or clinical presentations to instantly generate evidence-based differential diagnoses, investigation cascades, and treatment protocols.
              </p>
            </div>

            <form onSubmit={handleAnalyze} className="w-full max-w-3xl mx-auto">
              <div className="relative group shadow-2xl shadow-cyan-950/50 rounded-2xl p-1 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-indigo-500/50">
                <div className="bg-slate-950 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-3">
                  <div className="p-3 text-cyan-400 hidden sm:block">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <textarea
                    rows={3}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Enter patient presentation (e.g., 24-year-old male with colicky periumbilical pain migrating to RLQ, low-grade fever, nausea...)"
                    className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none resize-none px-2 py-1"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium px-6 py-3 rounded-lg transition-all shadow-md flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Activity className="w-5 h-5 animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Run Diagnostics</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Results View with Search Bar at Top */
          <div className="w-full space-y-8 animate-fade-in">
            {/* Top Compact Search Bar */}
            <form onSubmit={handleAnalyze} className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-lg flex items-center gap-3">
              <Stethoscope className="w-5 h-5 text-cyan-400 ml-2 hidden sm:block" />
              <input
                type="text"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Modify clinical presentation..."
                className="w-full bg-transparent text-slate-100 text-sm focus:outline-none px-2"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors flex items-center space-x-1.5 shrink-0"
              >
                {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>Re-Analyze</span>
              </button>
            </form>

            {/* AI Summary Banner */}
            <div className="bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-xl flex items-start space-x-4">
              <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400 mt-1">
                <HeartPulse className="w-6 h-6 animate-bounce" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Clinical Assessment Summary</h3>
                <p className="text-slate-200 text-base leading-relaxed">{result.summary}</p>
              </div>
            </div>

            {/* Differential Diagnoses */}
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center space-x-2 text-cyan-400">
                  <ShieldAlert className="w-5 h-5" />
                  <span>Ranked Differential Diagnoses</span>
                </h3>
                <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full">Evidence-Based</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.differentials.map((diff: any, idx: number) => (
                  <div key={idx} className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 space-y-2 hover:border-cyan-500/40 transition-all">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-100">{diff.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {diff.probability}
                        </span>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${diff.risk === 'Critical' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                          {diff.risk}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{diff.rationale}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Investigations & Treatment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Investigations */}
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <h3 className="text-lg font-bold flex items-center space-x-2 text-emerald-400">
                  <Microscope className="w-5 h-5" />
                  <span>Recommended Investigations</span>
                </h3>
                <div className="space-y-3">
                  {result.investigations.map((inv: any, idx: number) => (
                    <div key={idx} className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                      <div className="flex items-center space-x-2 text-emerald-400 font-medium text-sm">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{inv.test}</span>
                      </div>
                      <p className="text-xs text-slate-400 pl-6">{inv.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment Protocols */}
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <h3 className="text-lg font-bold flex items-center space-x-2 text-indigo-400">
                  <Pill className="w-5 h-5" />
                  <span>Treatment & Management Protocol</span>
                </h3>
                <div className="space-y-3">
                  {result.treatment.map((trt: any, idx: number) => (
                    <div key={idx} className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                      <div className="flex items-center space-x-2 text-indigo-400 font-medium text-sm">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{trt.phase}</span>
                      </div>
                      <p className="text-xs text-slate-400 pl-6">{trt.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/30 py-4 text-center text-xs text-slate-500">
        MediAssist AI &bull; Clinical Decision Support System &bull; For Professional Medical Use
      </footer>
    </div>
  );
}
