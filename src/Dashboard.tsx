import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export function Dashboard() {
  const queue = [
    {
      id: 'PAT-1042',
      time: '10:42 AM',
      complaint: 'Fever, Headache, Vomiting',
      priority: 'URGENT',
      language: 'Odia',
      report: 'Yes',
      aiStatus: 'Complete',
      humanReview: 'Pending'
    },
    {
      id: 'PAT-1043',
      time: '11:05 AM',
      complaint: 'Mild cough',
      priority: 'ROUTINE',
      language: 'English',
      report: 'No',
      aiStatus: 'Complete',
      humanReview: 'Reviewed'
    },
    {
      id: 'PAT-1044',
      time: '11:15 AM',
      complaint: 'Stomach pain',
      priority: 'TIMELY',
      language: 'Hindi',
      report: 'Yes',
      aiStatus: 'Complete',
      humanReview: 'Pending'
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Triage Dashboard</h2>
        <div className="text-sm text-muted">Awaiting qualified healthcare review</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--info-bg)', color: 'var(--info-text)', borderRadius: 'var(--radius-lg)' }}>
              <Clock size={24} />
            </div>
            <div>
              <div className="text-muted text-sm font-semibold uppercase">Total Patients</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>3</div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--danger-bg)', color: 'var(--danger-text)', borderRadius: 'var(--radius-lg)' }}>
              <AlertCircle size={24} />
            </div>
            <div>
              <div className="text-muted text-sm font-semibold uppercase">Urgent Review</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--danger-text)' }}>1</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--warning-bg)', color: 'var(--warning-text)', borderRadius: 'var(--radius-lg)' }}>
              <Clock size={24} />
            </div>
            <div>
              <div className="text-muted text-sm font-semibold uppercase">Timely Review</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--warning-text)' }}>1</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--success-bg)', color: 'var(--success-text)', borderRadius: 'var(--radius-lg)' }}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <div className="text-muted text-sm font-semibold uppercase">Routine</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success-text)' }}>1</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          Patient Queue
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>ID</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Arrival</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Chief Complaint</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Priority</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Lang</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Report</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((patient) => (
                <tr key={patient.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{patient.id}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{patient.time}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>{patient.complaint}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span className={`badge ${
                      patient.priority === 'URGENT' ? 'badge-danger' : 
                      patient.priority === 'TIMELY' ? 'badge-warning' : 'badge-success'
                    }`}>
                      {patient.priority}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{patient.language}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{patient.report}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <CheckCircle2 size={12} color="var(--success)" /> AI {patient.aiStatus}
                      </span>
                      <span style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {patient.humanReview === 'Pending' ? (
                          <><AlertCircle size={12} color="var(--warning)" /> Review Pending</>
                        ) : (
                          <><CheckCircle2 size={12} color="var(--success)" /> Reviewed</>
                        )}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <Link to={`/review/${patient.id}`} className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>
                      Review <ArrowRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
