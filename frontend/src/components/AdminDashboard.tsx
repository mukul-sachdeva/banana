import React, { useEffect, useState } from 'react';
import { BookingRecord, CityRequestStat, CityRequestRecord } from '../types';
import { getAdminBookings, updateBookingStatus, getCityRequestStats, getCityRequestList } from '../api';
import { RefreshCw, CheckCircle2, AlertCircle, ShieldAlert, Key, ClipboardList, ShieldCheck, MapPin, TrendingUp, Users } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'demand'>('bookings');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // City demand state
  const [demandStats, setDemandStats] = useState<CityRequestStat[]>([]);
  const [demandRecords, setDemandRecords] = useState<CityRequestRecord[]>([]);
  const [selectedFilterCity, setSelectedFilterCity] = useState<string>('');
  const [demandLoading, setDemandLoading] = useState(false);
  const [demandError, setDemandError] = useState<string | null>(null);

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
      setAuthError('Invalid passcode. Please try again.');
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

  const loadCityDemand = async (cityFilter?: string) => {
    try {
      setDemandLoading(true);
      setDemandError(null);
      const [stats, records] = await Promise.all([
        getCityRequestStats(),
        getCityRequestList(cityFilter || undefined)
      ]);
      setDemandStats(stats);
      setDemandRecords(records);
    } catch (err: any) {
      console.error(err);
      setDemandError(err.message || 'Failed to retrieve city demand intelligence.');
    } finally {
      setDemandLoading(false);
    }
  };

  useEffect(() => {
    if (isUnlocked) {
      if (activeTab === 'bookings') {
        loadBookings();
      } else {
        loadCityDemand(selectedFilterCity);
      }
    }
  }, [isUnlocked, activeTab, selectedFilterCity]);

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
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '2rem' }}>Enter administrator password to continue.</p>

        <form onSubmit={handleUnlock}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label">Admin Passcode</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter administrator password"
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

  const totalDemandRequests = demandStats.reduce((acc, curr) => acc + curr.count, 0);
  const totalCitiesRequested = demandStats.length;
  const topCity = demandStats.length > 0 ? `${demandStats[0].city} (${demandStats[0].count})` : 'None';

  return (
    <div>
      {/* Admin Tab Switcher */}
      <div className="admin-tabs-nav">
        <button
          className={`admin-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          <ClipboardList size={18} /> Test Drive Bookings ({total})
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'demand' ? 'active' : ''}`}
          onClick={() => setActiveTab('demand')}
        >
          <MapPin size={18} /> City Demand Analytics ({totalDemandRequests})
        </button>
      </div>

      {activeTab === 'bookings' ? (
        /* ==================== BOOKINGS TAB ==================== */
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
      ) : (
        /* ==================== CITY DEMAND TAB ==================== */
        <div>
          <div className="admin-header-row">
            <div>
              <h2 className="page-title">City Demand Analytics</h2>
              <p className="page-subtitle">Market expansion signals captured from visitors outside current active cities.</p>
            </div>
            <button className="select-car-btn" onClick={() => loadCityDemand(selectedFilterCity)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <RefreshCw size={14} className={demandLoading ? 'spinner' : ''} /> Refresh Data
            </button>
          </div>

          {/* Demand KPI Stats */}
          <div className="admin-stats-bar">
            <div className="stat-card">
              <div className="stat-info">
                <span className="stat-num">{totalCitiesRequested}</span>
                <span className="stat-label">Cities Requested</span>
              </div>
              <span className="stat-icon-wrapper" style={{ color: '#2563EB' }}><MapPin size={22} /></span>
            </div>

            <div className="stat-card">
              <div className="stat-info">
                <span className="stat-num" style={{ color: '#10B981' }}>{totalDemandRequests}</span>
                <span className="stat-label">Total Demand Requests</span>
              </div>
              <span className="stat-icon-wrapper" style={{ color: '#10B981' }}><Users size={22} /></span>
            </div>

            <div className="stat-card">
              <div className="stat-info">
                <span className="stat-num" style={{ color: '#8B5CF6', fontSize: '1.35rem' }}>{topCity}</span>
                <span className="stat-label">Highest Demand City</span>
              </div>
              <span className="stat-icon-wrapper" style={{ color: '#8B5CF6' }}><TrendingUp size={22} /></span>
            </div>
          </div>

          {/* Ranked Cities Grid */}
          {demandStats.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={18} color="#2563EB" /> Cities Ranked by Demand
              </h3>
              <div className="demand-city-grid">
                {demandStats.map((stat, idx) => {
                  const percent = totalDemandRequests > 0 ? Math.round((stat.count / totalDemandRequests) * 100) : 0;
                  const isSelected = selectedFilterCity.toLowerCase() === stat.city.toLowerCase();
                  return (
                    <div
                      key={stat.city}
                      className={`demand-city-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedFilterCity(isSelected ? '' : stat.city)}
                    >
                      <div className="demand-city-card-header">
                        <span className="demand-city-rank">#{idx + 1}</span>
                        <span className="demand-city-name">{stat.city}</span>
                        <span className="demand-city-count">{stat.count} requests</span>
                      </div>
                      <div className="demand-progress-bar-bg">
                        <div className="demand-progress-bar-fill" style={{ width: `${Math.max(percent, 8)}%` }} />
                      </div>
                      <div className="demand-city-card-footer">
                        <span>{percent}% of total demand</span>
                        <span className="demand-filter-hint">{isSelected ? 'Showing in table ✓' : 'Click to filter table'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Submissions Filter & Table */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} color="#2563EB" /> Submissions List
            </h3>
            {selectedFilterCity && (
              <button
                className="clear-filter-btn"
                onClick={() => setSelectedFilterCity('')}
                style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem', borderRadius: '6px', cursor: 'pointer' }}
              >
                Clear Filter ({selectedFilterCity}) ×
              </button>
            )}
          </div>

          {demandLoading && demandRecords.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <div className="spinner" style={{ width: '40px', height: '40px', borderTopColor: '#2563EB' }}></div>
            </div>
          ) : demandError ? (
            <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px dashed rgba(239, 68, 68, 0.2)', borderRadius: '12px' }}>
              <ShieldAlert size={40} color="#ef4444" style={{ marginBottom: '1rem' }} />
              <h3>Error Fetching Demand Intelligence</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>{demandError}</p>
            </div>
          ) : demandRecords.length === 0 ? (
            <div className="admin-empty-state">
              <MapPin size={48} className="admin-empty-icon" />
              <h3>No city requests captured yet</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.5rem' }}>When visitors outside our active cities request Flowzap in their city, their entries will show up here.</p>
            </div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Requested City</th>
                    <th>Contact Info</th>
                    <th>Interested Vehicle(s)</th>
                    <th>Buying Timeline</th>
                    <th>Source</th>
                    <th>Requested Date</th>
                  </tr>
                </thead>
                <tbody>
                  {demandRecords.map((req) => {
                    const carsList = Array.isArray(req.interested_cars) ? req.interested_cars : [];
                    const formattedDate = req.created_at ? new Date(req.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A';

                    return (
                      <tr key={req.id}>
                        <td>
                          <span style={{ fontWeight: 600, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                            <MapPin size={14} /> {req.city}
                          </span>
                        </td>
                        <td>
                          <div className="admin-customer-info">
                            <span className="admin-customer-name">{req.full_name || 'Anonymous Visitor'}</span>
                            {req.phone && <span className="admin-customer-contact">{req.phone}</span>}
                            {req.email && <span className="admin-customer-contact" style={{ opacity: 0.7 }}>{req.email}</span>}
                          </div>
                        </td>
                        <td>
                          {carsList.length > 0 ? (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                              {carsList.map(c => (
                                <span key={c} className="admin-car-chip">{c}</span>
                              ))}
                            </div>
                          ) : (
                            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Not specified</span>
                          )}
                        </td>
                        <td>
                          <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{req.purchase_timeline || 'Not specified'}</span>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.75rem', textTransform: 'capitalize', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(100, 116, 139, 0.1)', color: '#64748b' }}>
                            {req.source}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{formattedDate}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
