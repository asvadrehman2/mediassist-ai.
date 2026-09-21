import React, { useState } from 'react';
import { Stethoscope, Activity, FileText, ShieldAlert, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

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
        differentials: [
          { name: 'Acute Appendicitis', probability: 'High', rationale: 'Classic presentation of periumbilical pain shifting to RLQ with localized tenderness.' },
          { name: 'Gastroenteritis', probability: 'Moderate', rationale: 'Can present with diffuse abdominal pain and nausea, though less localized.' },
          { name: 'Mesenteric Adenitis', probability: 'Low', rationale: 'More common in younger populations, mimics appendicitis.' }
        ],
        investigations: [
          'Complete Blood Count (CBC) looking for leukocytosis',
          'C-Reactive Protein (CRP)',
          'Urinalysis to rule out UTI / renal colic',
          'Ultrasound abdomen / CT Abdomen with contrast'
        ],
        treatment: [
          'NPO status (Nil Per Os) pending surgical evaluation',
          'IV Fluid resuscitation and electrolyte monitoring',
          'Empirical IV analgesia and antiemetics',
          'Urgent surgical consultation for appendectomy evaluation'
        ]
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-400">
            <Stethoscope className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">MediAssist AI</h1>
            <p className="text-sm text-slate-400">Clinical Decision Support & Differential Diagnosis Engine</p>
          </div>
        </header>

        <form onSubmit={handleAnalyze} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Patient Symptoms & Clinical Presentation</label>
            <textarea
              rows={4}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., Right lower quadrant abdominal pain, low-grade fever, nausea, and anorexia for 12 hours..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Activity className="w-5 h-5 animate-spin" />
                <span>Analyzing Clinical Presentation...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Clinical Analysis</span>
              </>
            )}
          </button>
        </form>

        {result && (
          <div className="space-y-6 animate-fade-in">
            {/* Differentials */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold flex items-center space-x-2 text-cyan-400">
                <ShieldAlert className="w-5 h-5" />
                <span>Differential Diagnoses</span>
              </h2>
              <div className="space-y-3">
                {result.differentials.map((diff: any, idx: number) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800/60 rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-slate-200">{diff.name}</h3>
                      <p className="text-sm text-slate-400 mt-1">{diff.rationale}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${diff.probability === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                      {diff.probability} Probability
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Investigations & Treatment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold flex items-center space-x-2 text-emerald-400">
                  <Activity className="w-5 h-5" />
                  <span>Investigation Plan</span>
                </h2>
                <ul className="space-y-2">
                  {result.investigations.map((inv: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{inv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold flex items-center space-x-2 text-indigo-400">
                  <FileText className="w-5 h-5" />
                  <span>Treatment Protocol</span>
                </h2>
                <ul className="space-y-2">
                  {result.treatment.map((trt: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                      <AlertCircle className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                      <span>{trt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
