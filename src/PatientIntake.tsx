import React, { useState } from 'react';
import { Mic, FileText, UploadCloud, ArrowRight, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PatientIntake() {
  const [step, setStep] = useState(1);
  const [voicePhase, setVoicePhase] = useState('IDLE');
  const [ocrPhase, setOcrPhase] = useState('IDLE');

  const handleVoiceInput = () => {
    setVoicePhase('RECORDING');
    setTimeout(() => setVoicePhase('SPEECH_DETECTED'), 1000);
    setTimeout(() => setVoicePhase('STT'), 2000);
    setTimeout(() => setVoicePhase('LANG_DETECTED'), 3000);
    setTimeout(() => setVoicePhase('TRANSLATING'), 4000);
    setTimeout(() => setVoicePhase('EXTRACTING'), 5000);
    setTimeout(() => setVoicePhase('COMPLETE'), 6500);
  };

  const handleFileUpload = () => {
    setOcrPhase('UPLOADING');
    setTimeout(() => setOcrPhase('OCR_PROCESSING'), 1000);
    setTimeout(() => setOcrPhase('TEXT_EXTRACTED'), 2500);
    setTimeout(() => setOcrPhase('STRUCTURED_DATA'), 4000);
    setTimeout(() => {
      setOcrPhase('REVIEW_READY');
      setStep(3);
    }, 5500);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'var(--warning-bg)', color: 'var(--warning-text)', padding: '1rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid var(--warning)' }}>
        <ShieldAlert size={24} />
        <div>
          <strong>Educational prototype for triage-support purposes only.</strong> Not a diagnostic or treatment system.
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          Patient Intake Demo
        </div>
        <div className="card-body">
          <div className="flex gap-4 mb-4">
            <div className="badge badge-info">PAT-1042</div>
            <div className="badge" style={{ backgroundColor: '#e2e8f0' }}>Age: 34</div>
            <div className="badge" style={{ backgroundColor: '#e2e8f0' }}>Lang: Odia</div>
          </div>

          {/* STEP 1: Voice Input */}
          <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            <h3 className="flex items-center gap-2 mb-4"><Mic size={20} /> 1. Voice Input (Odia)</h3>
            
            {voicePhase === 'IDLE' && step === 1 && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <button className="btn btn-primary" onClick={handleVoiceInput}>
                  <Mic size={20} /> Start Patient Voice Demo
                </button>
              </div>
            )}

            {voicePhase !== 'IDLE' && voicePhase !== 'COMPLETE' && step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)' }}>
                <div className="flex items-center gap-3">
                  {voicePhase === 'RECORDING' ? <Loader2 className="animate-spin" color="var(--primary)" /> : <CheckCircle2 color="var(--success)" size={20} />}
                  <span className={voicePhase === 'RECORDING' ? 'font-bold' : 'text-muted'}>Recording...</span>
                </div>
                {['SPEECH_DETECTED', 'STT', 'LANG_DETECTED', 'TRANSLATING', 'EXTRACTING'].includes(voicePhase) && (
                  <div className="flex items-center gap-3">
                    {voicePhase === 'SPEECH_DETECTED' ? <Loader2 className="animate-spin" color="var(--primary)" /> : <CheckCircle2 color="var(--success)" size={20} />}
                    <span className={voicePhase === 'SPEECH_DETECTED' ? 'font-bold' : 'text-muted'}>Speech detected</span>
                  </div>
                )}
                {['STT', 'LANG_DETECTED', 'TRANSLATING', 'EXTRACTING'].includes(voicePhase) && (
                  <div className="flex items-center gap-3">
                    {voicePhase === 'STT' ? <Loader2 className="animate-spin" color="var(--primary)" /> : <CheckCircle2 color="var(--success)" size={20} />}
                    <span className={voicePhase === 'STT' ? 'font-bold' : 'text-muted'}>Speech-to-text</span>
                  </div>
                )}
                {['LANG_DETECTED', 'TRANSLATING', 'EXTRACTING'].includes(voicePhase) && (
                  <div className="flex items-center gap-3">
                    {voicePhase === 'LANG_DETECTED' ? <Loader2 className="animate-spin" color="var(--primary)" /> : <CheckCircle2 color="var(--success)" size={20} />}
                    <span className={voicePhase === 'LANG_DETECTED' ? 'font-bold' : 'text-muted'}>Language detected: Odia</span>
                  </div>
                )}
                {['TRANSLATING', 'EXTRACTING'].includes(voicePhase) && (
                  <div className="flex items-center gap-3">
                    {voicePhase === 'TRANSLATING' ? <Loader2 className="animate-spin" color="var(--primary)" /> : <CheckCircle2 color="var(--success)" size={20} />}
                    <span className={voicePhase === 'TRANSLATING' ? 'font-bold' : 'text-muted'}>Translation / normalization</span>
                  </div>
                )}
                {['EXTRACTING'].includes(voicePhase) && (
                  <div className="flex items-center gap-3">
                    {voicePhase === 'EXTRACTING' ? <Loader2 className="animate-spin" color="var(--primary)" /> : <CheckCircle2 color="var(--success)" size={20} />}
                    <span className={voicePhase === 'EXTRACTING' ? 'font-bold' : 'text-muted'}>Clinical information extraction</span>
                  </div>
                )}
              </div>
            )}

            {(voicePhase === 'COMPLETE' || step >= 2) && (
              <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <div className="mb-4">
                  <div className="text-sm font-semibold text-muted mb-1">Original Transcribed (Odia)</div>
                  <div style={{ fontStyle: 'italic', color: 'var(--text-primary)' }}>"ମୋତେ ଚାରି ଦିନ ହେଲା ଜ୍ୱର ଅଛି। ମୁଣ୍ଡ ବଥା ହେଉଛି ଏବଂ ଦୁର୍ବଳ ଲାଗୁଛି। ଗତକାଲିଠାରୁ ବାନ୍ତି ମଧ୍ୟ ହେଉଛି।"</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-semibold text-muted mb-1 flex justify-between">
                    <span>Normalized English Translation</span>
                    <span className="badge badge-success">High Confidence</span>
                  </div>
                  <div style={{ color: 'var(--text-primary)' }}>"I have had fever for four days. I have a headache and feel weak. I have also been vomiting since yesterday."</div>
                </div>
                
                <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid var(--border-color)' }} />
                
                <div className="mb-4">
                  <div className="text-sm font-semibold text-muted mb-3">Extracted Information</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.75rem 1rem', fontSize: '0.875rem' }}>
                    <strong style={{ color: 'var(--text-secondary)' }}>Chief complaint:</strong> <span>Fever</span>
                    <strong style={{ color: 'var(--text-secondary)' }}>Duration:</strong> <span>4 days</span>
                    <strong style={{ color: 'var(--text-secondary)' }}>Associated symptoms:</strong> <span>Headache, Weakness, Vomiting</span>
                    <strong style={{ color: 'var(--text-secondary)' }}>Vomiting onset:</strong> <span>Yesterday</span>
                    <strong style={{ color: 'var(--text-secondary)' }}>Unknown:</strong> <span className="text-danger">Current temperature, Symptom severity, Medication history, Medical history, Allergy history</span>
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--info-bg)', color: 'var(--info-text)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #bfdbfe', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1rem' }}>
                  Information captured successfully. Additional clinical information is required before professional review.
                </div>

                {step === 1 && (
                  <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                    <button className="btn btn-primary" onClick={() => setStep(2)}>
                      Continue to Report Upload <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* STEP 2: Report Upload */}
          {step >= 2 && (
            <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              <h3 className="flex items-center gap-2 mb-4"><FileText size={20} /> 2. Medical Report Upload</h3>
              
              <div style={{ backgroundColor: 'var(--info-bg)', color: 'var(--info-text)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', marginBottom: '1rem', fontWeight: 'bold' }}>
                SYNTHETIC DEMONSTRATION REPORT — NOT FOR CLINICAL USE
              </div>

              {ocrPhase === 'IDLE' && step === 2 && (
                <div style={{ textAlign: 'center', padding: '2rem', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <UploadCloud size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem' }} />
                    <button className="btn btn-outline" onClick={handleFileUpload}>
                      Upload Sample CBC Report
                    </button>
                  </div>
                </div>
              )}

              {ocrPhase !== 'IDLE' && ocrPhase !== 'REVIEW_READY' && step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)' }}>
                  <div className="flex items-center gap-3">
                    {ocrPhase === 'UPLOADING' ? <Loader2 className="animate-spin" color="var(--primary)" /> : <CheckCircle2 color="var(--success)" size={20} />}
                    <span className={ocrPhase === 'UPLOADING' ? 'font-bold' : 'text-muted'}>Uploaded File</span>
                  </div>
                  {['OCR_PROCESSING', 'TEXT_EXTRACTED', 'STRUCTURED_DATA'].includes(ocrPhase) && (
                    <div className="flex items-center gap-3">
                      {ocrPhase === 'OCR_PROCESSING' ? <Loader2 className="animate-spin" color="var(--primary)" /> : <CheckCircle2 color="var(--success)" size={20} />}
                      <span className={ocrPhase === 'OCR_PROCESSING' ? 'font-bold' : 'text-muted'}>OCR Processing</span>
                    </div>
                  )}
                  {['TEXT_EXTRACTED', 'STRUCTURED_DATA'].includes(ocrPhase) && (
                    <div className="flex items-center gap-3">
                      {ocrPhase === 'TEXT_EXTRACTED' ? <Loader2 className="animate-spin" color="var(--primary)" /> : <CheckCircle2 color="var(--success)" size={20} />}
                      <span className={ocrPhase === 'TEXT_EXTRACTED' ? 'font-bold' : 'text-muted'}>Text Extracted</span>
                    </div>
                  )}
                  {['STRUCTURED_DATA'].includes(ocrPhase) && (
                    <div className="flex items-center gap-3">
                      {ocrPhase === 'STRUCTURED_DATA' ? <Loader2 className="animate-spin" color="var(--primary)" /> : <CheckCircle2 color="var(--success)" size={20} />}
                      <span className={ocrPhase === 'STRUCTURED_DATA' ? 'font-bold' : 'text-muted'}>Structured Data</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Loader2 className="animate-spin" color="var(--primary)" style={{ opacity: 0 }} />
                    <span className="text-muted">Reviewer Verification</span>
                  </div>
                </div>
              )}

              {(ocrPhase === 'REVIEW_READY' || step >= 3) && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                      <div className="text-sm font-semibold text-muted mb-2 flex items-center gap-2">
                        <CheckCircle2 size={16} color="var(--success)" /> OCR Extracted Text Preview
                      </div>
                      <pre style={{ fontSize: '0.75rem', whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                        TEST: Complete Blood Count (CBC)
                        DATE: 29-Sep-2026
                        Hemoglobin: 11.2 g/dL (Low)
                        WBC Count: 12,500 /uL (High)
                        Platelets: 110,000 /uL (Low)
                      </pre>
                    </div>
                    <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                      <div className="text-sm font-semibold text-muted mb-2">Structured Field Extraction</div>
                      <div style={{ fontSize: '0.875rem' }}>
                        <div className="mb-2"><strong>Patient ID:</strong> PAT-1042</div>
                        <div className="mb-2"><strong>Report type:</strong> Sample CBC</div>
                        <div className="mb-4"><strong>Collection date:</strong> Demo date</div>
                        
                        <div className="font-semibold mb-1">Parameters:</div>
                        <div className="flex justify-between items-center border-b pb-1 mb-1">
                          <span>Hemoglobin: 11.2 g/dL</span>
                          <span className="flex items-center gap-1 text-xs text-muted"><CheckCircle2 size={12} color="var(--success)" /> Extracted from report</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-1 mb-1">
                          <span>WBC: 12,500 /uL</span>
                          <span className="flex items-center gap-1 text-xs text-muted"><CheckCircle2 size={12} color="var(--success)" /> Extracted from report</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-1 mb-1">
                          <span>Platelets: 110,000 /uL</span>
                          <span className="flex items-center gap-1 text-xs text-muted"><CheckCircle2 size={12} color="var(--success)" /> Extracted from report</span>
                        </div>
                      </div>
                      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--warning-text)', backgroundColor: 'var(--warning-bg)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                        <ShieldAlert size={16} /> ⚠ Requires reviewer verification
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--danger-text)', backgroundColor: '#fef2f2', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #fecaca' }}>
                    <ShieldAlert size={16} /> <strong>AI extraction may contain errors. Healthcare staff must verify source documents before using extracted information.</strong>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Proceed to review */}
          {step >= 3 && (
            <div style={{ textAlign: 'right' }}>
              <Link to="/review/PAT-1042" className="btn btn-primary">
                Send to Triage Dashboard <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
