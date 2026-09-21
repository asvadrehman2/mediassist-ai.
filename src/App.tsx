import React, { useState } from 'react';
import { Stethoscope, Activity, FileText, ShieldAlert, Sparkles, CheckCircle2, AlertCircle, HeartPulse, Brain, Microscope, Pill, Search } from 'lucide-react';

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
        summary: "The patient's clinical presentation is highly concerning for an acute inflammatory process localized to the right iliac fossa, demanding urgent surgical consultation.",
        confidence: 89,
        differentials: [
          { name: 'Acute Appendicitis', probability: '92%', risk: 'Critical', rationale: 'Classic presentation: periumbilical pain migrating to right lower quadrant, anorexia, nausea, localized tenderness, and low-grade fever.' },
          { name: 'Acute Mesenteric Adenitis', probability: '45%', risk: 'Moderate', rationale: 'Common mimic in younger adults; often preceded by an upper respiratory infection. Consider ultrasound to differentiate.' },
          { name: 'Meckel Diverticulitis', probability: '18%', risk: 'High', rationale: 'Congenital anomaly that can present identically to appendicitis. Definitive diagnosis often intraoperative.' },
          { name: 'Pelvic Inflammatory Disease (PID)', probability: '30%', risk: 'Moderate', rationale: 'Must be considered in sexually active female patients. Evaluate cervical motion tenderness and beta-hCG.' }
        ],
        investigations: [
          { test: 'Complete Blood Count (CBC)', detail: 'Monitoring for leukocytosis (WBC > 12,000/mcL) and neutrophilia.' },
          { test: 'Serum C-Reactive Protein (CRP)', detail: 'Elevated levels support the presence of significant inflammation.' },
          { test: 'Urinalysis (UA)', detail: 'Essential to exclude renal colic or urinary tract infection (pyelonephritis).' },
          { test: 'Contrast-Enhanced CT (Abdomen/Pelvis)', detail: 'Gold standard: Look for dilated (>6mm) non-compressible appendix with periappendiceal fat stranding.' },
          { test: 'Beta-hCG (Serum)', detail: 'Mandatory for females of reproductive age to exclude ectopic pregnancy.' }
        ],
        treatment: [
          { phase: 'Immediate Stabilization', action: 'Keep NPO (Nothing by Mouth) in anticipation of potential emergency surgery.' },
          { phase: 'Intravenous Access', action: 'Establish large-bore IV access and initiate isotonic crystalloid fluid resuscitation (e.g., Lactated Ringer’s).' },
          { phase: 'Pharmacotherapy', action: 'Administer empirical broad-spectrum IV antibiotics (e.g., Piperacillin-Tazobactam or Ceftriaxone + Metronidazole). Administer antiemetics and analgesia as needed.' },
          { phase: 'Surgical Consultation', action: 'Urgent referral to General Surgery for laparoscopic or open appendectomy evaluation.' }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-sky-600';
    return 'text-amber-600';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-600 rounded-xl text-white shadow">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div className="flex items-baseline gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-sky-950">
                  MediAssist <span className='text-sky-600 font-medium'>AI</span>
                </h1>
                <span className='text-xs font-medium bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md border border-sky-100'>Professional Edition</span>
            </div>
          </div>
          <nav className='flex items-center gap-4 text-sm text-slate-600'>
            <span>Dashboard</span>
            <span>Patient Records</span>
            <span>Guidelines</span>
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-medium text-xs border-2 border-white ring-2 ring-slate-200">DR</div>
          </nav>
        </div>
      </header>

      {/* Main Content Wrapper */}
      <main className={`flex-1 flex flex-col ${!result ? 'justify-center items-center' : ''} px-6 py-12 max-w-7xl mx-auto w-full`}>
        {!result ? (
          /* Centered Modern Hero Search State */
          <div className="w-full text-center space-y-10 animate-fade-in -mt-20">
            <div className="space-y-3 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-sm font-medium mb-4 shadow-inner">
                    <Sparkles className="w-4 h-4 text-sky-500" />
                    <span>Advanced Clinical Intelligence Platform</span>
                </div>
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-slate-950 leading-tight">
                Clinical Decision <span className="text-sky-600">Support</span>, Instantized.
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Enter a detailed patient presentation below to instantly generate evidence-based differential diagnoses, tailored investigation cascades, and management protocols.
              </p>
            </div>

            <form onSubmit={handleAnalyze} className="w-full max-w-4xl mx-auto">
              <div className="relative group shadow-xl shadow-sky-100/70 rounded-3xl p-1.5 bg-white border border-slate-200 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-200 transition-all duration-300">
                <div className="flex items-start gap-4 p-4">
                  <Search className="w-7 h-7 text-sky-500 mt-2 flex-shrink-0" />
                  <textarea
                    rows={5}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Describe patient symptoms, vitals, and history (e.g., 24M, 12hr RLQ pain, guarding, nausea, temp 37.8C...)"
                    className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-lg focus:outline-none resize-none border-0 p-0 focus:ring-0"
                  />
                </div>
                 <div className='flex justify-end p-2'>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold px-10 py-4 rounded-2xl transition-all shadow-md disabled:opacity-60 text-lg"
                  >
                    {loading ? (
                      <>
                        <Activity className="w-6 h-6 animate-spin" />
                        <span>Processing Case...</span>
                      </>
                    ) : (
                      <>
                        <Stethoscope className="w-6 h-6" />
                        <span>Generate Clinical Analysis</span>
                      </>
                    )}
                  </button>
                 </div>
              </div>
               <p className='text-xs text-slate-400 mt-5'>Powered by validated clinical guidelines and machine learning models. Always verify critical outputs.</p>
            </form>
          </div>
        ) : (
          /* Results View with Search Bar at Top */
          <div className="w-full space-y-10 animate-fade-in">
            {/* Top Compact Search Bar */}
            <form onSubmit={handleAnalyze} className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex items-center gap-4 sticky top-[81px] z-40">
              <Search className="w-6 h-6 text-sky-500 mx-2" />
              <input
                type="text"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Update patient presentation..."
                className="w-full bg-transparent text-slate-900 text-base focus:outline-none border-0 focus:ring-0 px-2 py-1"
              />
               <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-medium px-6 py-3 rounded-xl transition-colors shrink-0"
              >
                {loading ? <Activity className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                <span>{loading ? 'Updating...' : 'Re-Analyze Case'}</span>
              </button>
            </form>

            {/* Top Info Grid (Summary + Confidence) */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* AI Summary Banner */}
                <div className="xl:col-span-2 bg-white border border-sky-100 rounded-3xl p-8 shadow-lg shadow-sky-50/50 flex items-start gap-6">
                    <div className="p-4 bg-sky-50 rounded-2xl text-sky-600 mt-1 border border-sky-100">
                        <HeartPulse className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-sky-800 uppercase tracking-wider">Diagnostic Impression</h3>
                        <p className="text-slate-700 text-lg leading-relaxed">{result.summary}</p>
                    </div>
                </div>

                {/* Confidence Score Card */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center gap-3">
                    <Brain className="w-10 h-10 text-sky-500" />
                    <h4 className='text-sm font-medium text-slate-600'>Overall Diagnostic Confidence</h4>
                    <div className={`text-6xl font-extrabold tracking-tight ${getConfidenceColor(result.confidence)}`}>
                        {result.confidence}%
                    </div>
                     <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2 border border-slate-200">
                        <div className="bg-emerald-500 h-2.5 rounded-full" style={{width: `${result.confidence}%`}}></div>
                    </div>
                </div>
            </div>

            {/* Differential Diagnoses */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <h3 className="text-2xl font-bold flex items-center gap-3 text-slate-950">
                  <ShieldAlert className="w-7 h-7 text-sky-600" />
                  <span>Ranked Differential Diagnoses</span>
                </h3>
                 <span className="text-sm text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full font-medium border border-slate-200">ICD-10 Aligned</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.differentials.map((diff: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-3 hover:border-sky-200 hover:bg-white transition-all duration-300 group">
                    <div className="flex justify-between items-start gap-3">
                      <div className='space-y-0.5'>
                        <h4 className="font-semibold text-slate-950 text-lg group-hover:text-sky-800">{diff.name}</h4>
                        <p className="text-sm text-slate-600 leading-snug">{diff.rationale}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span className="text-base px-3.5 py-1 rounded-full font-bold bg-sky-100 text-sky-800 border border-sky-200">
                          {diff.probability}
                        </span>
                        <span className={`text-xs px-3 py-0.5 rounded-md font-medium ${diff.risk === 'Critical' ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-amber-50 text-amber-800 border border-amber-100'}`}>
                          Risk: {diff.risk}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investigations & Treatment Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Investigations */}
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3 text-emerald-900">
                  <Microscope className="w-7 h-7 text-emerald-600" />
                  <span>Diagnostic Investigation Cascade</span>
                </h3>
                <div className="space-y-4">
                  {result.investigations.map((inv: any, idx: number) => (
                    <div key={idx} className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 flex items-start gap-4">
                      <div className="mt-1 p-1.5 bg-emerald-100 rounded-full text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-emerald-950 text-base">{inv.test}</div>
                        <p className="text-sm text-emerald-800 mt-0.5">{inv.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment Protocols */}
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3 text-sky-900">
                  <Pill className="w-7 h-7 text-sky-600" />
                  <span>Management & Treatment Protocol</span>
                </h3>
                <div className="space-y-4">
                  {result.treatment.map((trt: any, idx: number) => (
                    <div key={idx} className="bg-sky-50/50 border border-sky-100 rounded-2xl p-5 flex items-start gap-4">
                      <div className="mt-1 p-1.5 bg-sky-100 rounded-full text-sky-700 border border-sky-200">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-sky-950 text-base">{trt.phase}</div>
                        <p className="text-sm text-sky-800 mt-0.5">{trt.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 mt-auto">
        MediAssist AI &bull; Clinical Decision Support System &bull; Professional Edition
      </footer>
    </div>
  );
}
