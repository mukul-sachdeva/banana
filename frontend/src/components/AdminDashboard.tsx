import React, { useEffect, useState } from 'react';
import { BookingRecord } from '../types';
import { getAdminBookings, updateBookingStatus } from '../api';
import { RefreshCw, LayoutGrid, CheckCircle2, AlertCircle, XCircle, ShieldAlert, Key, ClipboardList, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Simple protection state
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'banana' || passcode === 'admin123') {
      setIsUnlocked(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. Hint: Use "banana" or "admin123"');
    }
  };

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAdminBookings();
      setBookings(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to retrieve bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUnlocked) {
      loadBookings();
    }
  }, [isUnlocked]);

  const handleStatusChange = async (bookingId: number, currentStatus: string, newStatus: string) => {
    try {
      // Optimistic update
      setBookings(prev => 
        prev.map(b => b.id === bookingId ? { ...b, status: newStatus as any } : b)
      );
      await updateBookingStatus(bookingId, newStatus);
    } catch (err: any) {
      alert(`Failed to update booking status: ${err.message}`);
      // Revert status
      setBookings(prev => 
        prev.map(b => b.id === bookingId ? { ...b, status: currentStatus as any } : b)
      );
    }
  };

  // Helper calculations for statistics bar
  const total = bookings.length;
  const pending = bookings.filter(b => b.status === 'Pending').length;
  const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
  const completed = bookings.filter(b => b.status === 'Completed').length;

  if (!isUnlocked) {
    return (
      <div style={{ maxWidth: '400px', margin: '6rem auto', padding: '2.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', textAlign: 'center' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <Key size={30} />
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Admin Portal</h2>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '2rem' }}>This page is protected. Enter the passcode to access the bookings.</p>
        
        <form onSubmit={handleUnlock}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label">Admin Passcode</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Enter passcode (banana)" 
              value={passcode} 
              onChange={(e) => setPasscode(e.target.value)}
              required
            />
          </div>
          {authError && <p style={{ color: 'var(--cancelled)', fontSize: '0.8rem', marginTop: '-0.75rem', marginBottom: '1.25rem', textAlign: 'left' }}>{authError}</p>}
          <button type="submit" className="submit-booking-btn" style={{ marginTop: '0.5rem' }}>
            Unlock Dashboard <ShieldCheck size={18} />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-header-row">
        <div>
          <h2 className="page-title">Admin Bookings</h2>
          <p className="page-subtitle">Track showroom schedules and update booking records in real-time.</p>
        </div>
        <button className="select-car-btn" onClick={loadBookings} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <RefreshCw size={14} className={loading ? 'spinner' : ''} /> Refresh Data
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="admin-stats-bar">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-num">{total}</span>
            <span className="stat-label">Total Requests</span>
          </div>
          <span className="stat-icon-wrapper"><ClipboardList size={22} /></span>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-num" style={{ color: 'var(--pending)' }}>{pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <span className="stat-icon-wrapper" style={{ color: 'var(--pending)' }}><AlertCircle size={22} /></span>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-num" style={{ color: 'var(--confirmed)' }}>{confirmed}</span>
            <span className="stat-label">Confirmed</span>
          </div>
          <span className="stat-icon-wrapper" style={{ color: 'var(--confirmed)' }}><CheckCircle2 size={22} /></span>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-num" style={{ color: 'var(--completed)' }}>{completed}</span>
            <span className="stat-label">Completed</span>
          </div>
          <span className="stat-icon-wrapper" style={{ color: 'var(--completed)' }}><ShieldCheck size={22} /></span>
        </div>
      </div>

      {/* Bookings Table */}
      {loading && bookings.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <div className="spinner" style={{ width: '40px', height: '40px', borderTopColor: '#2563EB' }}></div>
        </div>
      ) : error ? (
        <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px dashed rgba(239, 68, 68, 0.2)', borderRadius: '12px' }}>
          <ShieldAlert size={40} color="#ef4444" style={{ marginBottom: '1rem' }} />
          <h3>Error Fetching Admin Data</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>{error}</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="admin-empty-state">
          <ClipboardList size={48} className="admin-empty-icon" />
          <h3>No bookings registered yet</h3>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.5rem' }}>Once customers submit test drive requests, they will show up here.</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Customer</th>
                <th>Showroom City</th>
                <th>Vehicle Selection</th>
                <th>Scheduled Date & Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <span className="admin-booking-id">{booking.formatted_id}</span>
                  </td>
                  <td>
                    <div className="admin-customer-info">
                      <span className="admin-customer-name">{booking.customer_name}</span>
                      <span className="admin-customer-contact">{booking.customer_phone}</span>
                      {booking.customer_email && (
                        <span className="admin-customer-contact" style={{ opacity: 0.7 }}>{booking.customer_email}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 500 }}>{booking.city}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 500 }}>{booking.car_brand} {booking.car_name}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 500 }}>{booking.preferred_date}</span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{booking.preferred_time_slot}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                      <span className="status-dot"></span>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="status-select"
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, booking.status, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
