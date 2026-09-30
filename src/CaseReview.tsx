import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  AlertTriangle, Check, ShieldAlert, Clock, Activity, FileText, 
  HelpCircle, ShieldQuestion, UserCheck, ArrowLeft, Cpu, User, Edit3, MessageSquare, Plus, FileOutput
} from 'lucide-react';

export function CaseReview() {
  const { patientId } = useParams();
  const [reviewStatus, setReviewStatus] = useState<'PENDING' | 'COMPLETED'>('PENDING');
  const [priority, setPriority] = useState('URGENT');
  const [notes, setNotes] = useState('');
  const [auditLog, setAuditLog] = useState<any[]>([]);
  const [showReferral, setShowReferral] = useState(false);

  const handleAction = (actionName: string) => {
    setReviewStatus('COMPLETED');
    setAuditLog([
      ...auditLog,
      {
        action: actionName,
        timestamp: new Date().toLocaleTimeString(),
        modified: actionName === 'Change Priority' ? 'Priority' : 'None',
        note: notes || 'No additional notes provided'
      }
    ]);
  };

  const handlePrepareReferral = () => {
    handleAction('Prepare Referral');
    setShowReferral(true);
  };

  const AiBadge = () => (
    <span className="badge" style={{ backgroundColor: '#f1f5f9', color: '#64748b', fontSize: '0.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', border: '1px solid #e2e8f0' }}>
      <Cpu size={10} /> AI Generated
    </span>
  );

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <div style={{ backgroundColor: '#fef2f2', color: 'var(--danger-text)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid #fecaca', fontWeight: 500, fontSize: '0.875rem' }}>
        <ShieldAlert size={20} />
        AI-generated information is advisory. Final clinical assessment and decisions remain with qualified healthcare professionals.
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="btn btn-outline" style={{ padding: '0.5rem' }}>
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="flex items-center gap-3 m-0">Patient Triage Review</h2>
            <div className="text-muted text-sm mt-1">Patient: <strong>{patientId || 'PAT-1042'}</strong></div>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
          <span className="badge badge-success" style={{ display: 'inline-flex', gap: '0.25rem' }}>
            <Check size={14} /> AI ANALYSIS COMPLETE
          </span>
          {reviewStatus === 'PENDING' ? (
            <span className="badge badge-warning" style={{ display: 'inline-flex', gap: '0.25rem' }}>
              <Clock size={14} /> HUMAN REVIEW PENDING
            </span>
          ) : (
            <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', display: 'inline-flex', gap: '0.25rem' }}>
              <UserCheck size={14} /> HUMAN REVIEW COMPLETED
            </span>
          )}
        </div>
      </div>

      {showReferral ? (
        <div className="card mb-6" style={{ border: '2px solid var(--primary)' }}>
          <div className="card-header bg-gray-50 flex justify-between items-center">
            <div className="flex items-center gap-2 text-primary font-bold"><FileOutput size={20} /> Referral Summary Generated</div>
            <button className="btn btn-outline btn-sm" onClick={() => setShowReferral(false)}>Close</button>
          </div>
          <div className="card-body">
            <div className="grid gap-4 text-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <strong className="text-muted block mb-1">Patient ID</strong>
                <div>{patientId || 'PAT-1042'}</div>
              </div>
              <div>
                <strong className="text-muted block mb-1">Reason for referral</strong>
                <div>Requires advanced clinical evaluation (Triage Escalation)</div>
              </div>
              <div>
                <strong className="text-muted block mb-1">Patient-reported symptoms</strong>
                <div>Fever, headache, weakness, vomiting</div>
              </div>
              <div>
                <strong className="text-muted block mb-1">Timeline</strong>
                <div>Fever started Day -4. Vomiting started Day -1.</div>
              </div>
              <div>
                <strong className="text-muted block mb-1">Relevant extracted report information</strong>
                <div>CBC indicates elevated WBC (12,500) and decreased platelets (110,000)</div>
              </div>
              <div>
                <strong className="text-muted block mb-1">Urgency signals</strong>
                <div className="text-danger font-semibold">Fever &gt; 3 days + new onset vomiting</div>
              </div>
              <div>
                <strong className="text-muted block mb-1">Questions already answered</strong>
                <div>Duration (4 days), Vomiting onset (Yesterday)</div>
              </div>
              <div>
                <strong className="text-muted block mb-1">Information still missing</strong>
                <div>Current temperature, exact symptom severity, medication/allergy history</div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <strong className="text-muted block mb-1">Reviewer notes</strong>
                <div className="p-3 bg-gray-50 border rounded">{notes || 'No additional notes'}</div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="btn btn-primary">Print / Export Referral</button>
            </div>
          </div>
        </div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* LEFT SIDE — PATIENT INFORMATION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <div className="card-header bg-gray-50"><User size={18} /> Patient Information</div>
            <div className="card-body text-sm flex-col gap-4">
              
              <div className="mb-4">
                <div className="text-muted font-semibold mb-1">Patient-reported symptoms</div>
                <div>Fever, headache, weakness, vomiting</div>
              </div>

              <div className="mb-4">
                <div className="text-muted font-semibold mb-1">Language</div>
                <div>Odia</div>
              </div>

              <div className="mb-4 p-3 bg-gray-50 border rounded">
                <div className="text-muted font-semibold mb-1">Original voice transcript</div>
                <div className="italic text-gray-600">"ମୋତେ ଚାରି ଦିନ ହେଲା ଜ୍ୱର ଅଛି। ମୁଣ୍ଡ ବଥା ହେଉଛି ଏବଂ ଦୁର୍ବଳ ଲାଗୁଛି। ଗତକାଲିଠାରୁ ବାନ୍ତି ମଧ୍ୟ ହେଉଛି।"</div>
              </div>

              <div className="mb-4 p-3 bg-info-bg border border-blue-200 rounded">
                <div className="text-muted font-semibold mb-1 flex items-center justify-between">
                  Normalized transcript <AiBadge />
                </div>
                <div className="font-medium">"I have had fever for four days. I have a headache and feel weak. I have also been vomiting since yesterday."</div>
              </div>

              <div className="mb-4">
                <div className="text-muted font-semibold mb-2">Timeline <AiBadge /></div>
                <div style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--border-color)' }}>
                  <div className="mb-2"><span className="font-bold">Day -4:</span> Fever began, Headache/weakness reported</div>
                  <div className="mb-2"><span className="font-bold">Day -1:</span> Vomiting began</div>
                  <div><span className="font-bold text-warning">Current:</span> Patient presents for review</div>
                </div>
              </div>

              <div>
                <div className="text-muted font-semibold mb-2">Uploaded report</div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} /> <span className="text-primary cursor-pointer hover:underline">Sample_CBC_Demo.pdf</span>
                </div>
                <div className="bg-gray-50 p-2 border rounded">
                  <div className="text-xs text-muted font-semibold mb-1">OCR text <AiBadge /></div>
                  <pre className="text-xs text-gray-600 font-mono m-0" style={{ whiteSpace: 'pre-wrap' }}>
                    TEST: Complete Blood Count (CBC)
                    DATE: 29-Sep-2026
                    Hemoglobin: 11.2 g/dL (Low)
                    WBC Count: 12,500 /uL (High)
                    Platelets: 110,000 /uL (Low)
                  </pre>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT SIDE — AI TRIAGE SUMMARY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card" style={{ borderColor: priority === 'URGENT' ? 'var(--danger)' : 'var(--border-color)' }}>
            <div className="card-header bg-red-50" style={{ backgroundColor: priority === 'URGENT' ? 'var(--danger-bg)' : '#f8fafc', color: priority === 'URGENT' ? 'var(--danger-text)' : 'inherit' }}>
              <div className="flex items-center gap-2 font-bold"><Cpu size={18} /> AI Triage Summary</div>
              <AiBadge />
            </div>
            
            <div className="card-body text-sm">
              <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div>
                  <div className="text-muted font-semibold mb-1">Chief complaint</div>
                  <div className="font-medium">Fever</div>
                </div>
                <div>
                  <div className="text-muted font-semibold mb-1">Symptoms</div>
                  <div>Headache, Weakness, Vomiting</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-muted font-semibold mb-1">Urgency signals</div>
                <ul className="pl-4 text-danger font-medium m-0">
                  <li>Fever &gt; 3 days + new onset vomiting</li>
                  <li>Elevated WBC (12,500)</li>
                </ul>
              </div>

              <div className="mb-4">
                <div className="text-muted font-semibold mb-1">Review priority</div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${priority === 'URGENT' ? 'badge-danger' : priority === 'TIMELY' ? 'badge-warning' : 'badge-success'}`}>
                    {priority}
                  </span>
                </div>
              </div>

              <hr className="my-4 border-t border-gray-200" />

              <div className="mb-4">
                <div className="text-muted font-semibold mb-2 flex items-center gap-2"><ShieldQuestion size={16} /> Missing information</div>
                <ul className="pl-4 text-warning-text m-0">
                  <li>Current temperature</li>
                  <li>Symptom severity (Headache)</li>
                  <li>Hydration status</li>
                  <li>Medication / Allergy history</li>
                </ul>
              </div>

              <div className="mb-2">
                <div className="text-muted font-semibold mb-2 flex items-center gap-2"><HelpCircle size={16} /> Follow-up questions</div>
                <ol className="pl-4 m-0 text-gray-700">
                  <li>What is your current temperature?</li>
                  <li>How severe is the headache?</li>
                  <li>Are you able to keep fluids down?</li>
                  <li>Are you currently taking any medicines or have allergies?</li>
                </ol>
              </div>

            </div>
          </div>

          {/* REVIEW SECTION */}
          <div className="card">
            <div className="card-header bg-gray-50"><UserCheck size={18} /> Review Section</div>
            <div className="card-body">
              <textarea 
                className="w-full mb-4 p-3 border rounded text-sm" 
                rows={3} 
                placeholder="Reviewer notes..."
                style={{ width: '100%', borderColor: 'var(--border-color)', resize: 'vertical' }}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              
              <div className="grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <button className="btn btn-primary justify-center" onClick={() => handleAction('Verify Information')}>
                  <Check size={16} /> Verify Information
                </button>
                <button className="btn btn-outline justify-center" onClick={() => handleAction('Edit')}>
                  <Edit3 size={16} /> Edit
                </button>
                <button className="btn btn-outline justify-center" onClick={() => handleAction('Add Clinical Note')}>
                  <MessageSquare size={16} /> Add Clinical Note
                </button>
                <button className="btn btn-outline justify-center" onClick={() => {
                  setPriority(p => p === 'URGENT' ? 'TIMELY' : 'URGENT');
                  handleAction('Change Priority');
                }}>
                  <AlertTriangle size={16} /> Change Priority
                </button>
                <button className="btn btn-outline justify-center text-danger" style={{ borderColor: 'var(--danger-bg)' }} onClick={() => handleAction('Escalate')}>
                  <ShieldAlert size={16} /> Escalate
                </button>
                <button className="btn btn-outline justify-center" style={{ backgroundColor: 'var(--info-bg)', color: 'var(--info-text)', borderColor: '#bfdbfe' }} onClick={handlePrepareReferral}>
                  <FileOutput size={16} /> Prepare Referral
                </button>
              </div>

              {/* Record / Audit Trail */}
              {auditLog.length > 0 && (
                <div className="mt-6 pt-4 border-t text-sm">
                  <div className="font-semibold mb-2">Review Record</div>
                  <div className="flex flex-col gap-3">
                    {auditLog.map((log, i) => (
                      <div key={i} className="bg-gray-50 p-2 rounded border text-xs">
                        <div className="flex justify-between mb-1">
                          <strong>{log.action}</strong>
                          <span className="text-muted">{log.timestamp}</span>
                        </div>
                        <div className="text-muted">Modified: {log.modified}</div>
                        <div className="mt-1"><em>"{log.note}"</em></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
