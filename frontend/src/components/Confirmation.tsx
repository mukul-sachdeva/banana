import { useEffect } from 'react';
import jsPDF from 'jspdf';
import { BookingResponse } from '../types';
import { Check, Clipboard, Calendar, Clock, Car, Download, User, Phone, Mail, MapPin } from 'lucide-react';
import { useSEO } from '../useSEO';

const playSuccessSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    
    const playTone = (freq: number, start: number, duration: number, volume: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      
      gain.gain.setValueAtTime(volume, start);
      gain.gain.exponentialRampToValueAtTime(0.00001, start + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(start);
      osc.stop(start + duration);
    };

    const now = ctx.currentTime;
    playTone(523.25, now, 0.35, 0.15);
    playTone(783.99, now + 0.08, 0.5, 0.12);
  } catch (e) {
    console.warn('Browser audio policy blocked autoplay or failed to initialize:', e);
  }
};

interface ConfirmationProps {
  bookingDetails: BookingResponse;
  onBookAnother: () => void;
}

export default function Confirmation({ bookingDetails, onBookAnother }: ConfirmationProps) {
  useSEO({
    title: 'Test Drive Request Submitted Successfully | Flowzap',
    description: 'Your test drive scheduling request has been successfully received by Flowzap.',
  });

  useEffect(() => {
     window.scrollTo(0, 0);
    playSuccessSound();
  }, []);

  const handleCopyId = () => {
    navigator.clipboard.writeText(bookingDetails.bookingId);
    alert('Booking ID copied to clipboard!');
  };

  const handleDownloadReceipt = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 48;
    const contentW = pageW - margin * 2;
    let y = 48;

    const generatedDate = new Date().toLocaleString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

    // ── Header bar (blue rule) ────────────────────────────────────
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(2);
    doc.line(margin, y + 28, pageW - margin, y + 28);

    // Brand
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235);
    doc.text('FLOWZAP', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('Premium Test Drive Booking', margin, y + 14);

    // Title (right-aligned)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(30, 41, 59);
    doc.text('Test Drive Booking Confirmation', pageW - margin, y, { align: 'right' });
    doc.setFontSize(10);
    doc.setTextColor(37, 99, 235);
    doc.text(`Ref: ${bookingDetails.bookingId}`, pageW - margin, y + 14, { align: 'right' });

    y += 44;

    // ── Success banner ────────────────────────────────────────────
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(187, 247, 208);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, contentW, 32, 4, 4, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(21, 128, 61);
    doc.text(
      'BOOKING CONFIRMED - Test drive request submitted successfully.',
      margin + 12,
      y + 20
    );
    y += 48;
    // ── Helper: section heading ───────────────────────────────────
    const sectionTitle = (title: string) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(title.toUpperCase(), margin, y);
      y += 14;
    };

    // ── Helper: detail row ────────────────────────────────────────
    const detailRow = (label: string, value: string) => {
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, y, contentW, 36, 4, 4, 'FD');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(label.toUpperCase(), margin + 12, y + 13);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59);
      doc.text(value, margin + 12, y + 27);
      y += 44;
    };

    // ── Helper: two-column row ────────────────────────────────────
    const halfW = (contentW - 12) / 2;
    const detailRowHalf = (label1: string, val1: string, label2: string, val2: string) => {
      [0, halfW + 12].forEach((xOff, i) => {
        const label = i === 0 ? label1 : label2;
        const val = i === 0 ? val1 : val2;
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.5);
        doc.roundedRect(margin + xOff, y, halfW, 36, 4, 4, 'FD');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text(label.toUpperCase(), margin + xOff + 12, y + 13);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(30, 41, 59);
        doc.text(val, margin + xOff + 12, y + 27);
      });
      y += 44;
    };

    // ── Customer Details ──────────────────────────────────────────
    if (bookingDetails.customerName) {
      sectionTitle('Customer Details');
      detailRowHalf('Full Name', bookingDetails.customerName, 'Phone Number', bookingDetails.customerPhone || '—');
      if (bookingDetails.customerEmail && bookingDetails.city) {
        detailRowHalf('Email Address', bookingDetails.customerEmail, 'Showroom City', bookingDetails.city);
      } else if (bookingDetails.customerEmail) {
        detailRow('Email Address', bookingDetails.customerEmail);
      } else if (bookingDetails.city) {
        detailRow('Showroom City', bookingDetails.city);
      }
      // Divider
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageW - margin, y);
      y += 16;
    }

    // ── Booking Details ───────────────────────────────────────────
    sectionTitle('Booking Details');
    detailRowHalf('Selected Vehicle', bookingDetails.carName, 'Booking Status', 'Pending Confirmation');
    detailRowHalf('Preferred Date', bookingDetails.preferredDate, 'Time Slot', bookingDetails.preferredTimeSlot);

    // ── Important note ────────────────────────────────────────────
    doc.setFillColor(255, 251, 235);
    doc.setDrawColor(252, 211, 77);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, contentW, 38, 4, 4, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(146, 64, 14);
    doc.text('Important:', margin + 12, y + 14);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(120, 53, 15);
    doc.text(
      `Keep this receipt for reference. Booking ID: (${bookingDetails.bookingId})`,
      margin + 12, y + 27,
      { maxWidth: contentW - 24 }
    );
    y += 54;

    // ── Footer ────────────────────────────────────────────────────
    const pageH = doc.internal.pageSize.getHeight();
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, pageH - 36, pageW - margin, pageH - 36);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Generated: ${generatedDate}`, margin, pageH - 20);
    doc.text(`© ${new Date().getFullYear()} Flowzap Cars Inc.  |  flowzap.com`, pageW - margin, pageH - 20, { align: 'right' });

    // ── Direct download — no new tab, no preview ──────────────────
    doc.save(`Flowzap-Receipt-${bookingDetails.bookingId}.pdf`);
  };

  return (
    <div className="confirmation-card">
      <div className="success-check-wrapper animated">
        <Check size={40} strokeWidth={3} className="checkmark-icon" />
      </div>

      <h1 className="conf-title">Test Drive Request Submitted Successfully</h1>
      <p className="conf-subtitle">
        A dealership representative will contact you shortly to confirm your appointment.
      </p>

      <div className="conf-ref-banner" onClick={handleCopyId} title="Click to copy reference ID">
        <span className="ref-label">Booking Reference</span>
        <span className="ref-value">
          {bookingDetails.bookingId} <Clipboard size={14} className="copy-icon" />
        </span>
      </div>

      <div className="conf-actions">
        <button className="back-home-btn" onClick={onBookAnother}>
          Book Another Drive
        </button>
        <button className="download-receipt-btn" onClick={handleDownloadReceipt}>
          <Download size={16} /> Download Receipt
        </button>
      </div>

      <details className="conf-details-accordion">
        <summary className="conf-details-summary">
          <span>View Booking Details</span>
        </summary>
        <div className="conf-details-box">
          {bookingDetails.customerName && (
            <div className="conf-detail-item">
              <span className="conf-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={16} /> Customer Name
              </span>
              <span className="conf-val">{bookingDetails.customerName}</span>
            </div>
          )}

          {bookingDetails.customerPhone && (
            <div className="conf-detail-item">
              <span className="conf-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={16} /> Phone
              </span>
              <span className="conf-val">{bookingDetails.customerPhone}</span>
            </div>
          )}

          {bookingDetails.customerEmail && (
            <div className="conf-detail-item">
              <span className="conf-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={16} /> Email
              </span>
              <span className="conf-val conf-email">{bookingDetails.customerEmail}</span>
            </div>
          )}

          {bookingDetails.city && (
            <div className="conf-detail-item">
              <span className="conf-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={16} /> Showroom City
              </span>
              <span className="conf-val">{bookingDetails.city}</span>
            </div>
          )}

          <div className="conf-detail-item">
            <span className="conf-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Car size={16} /> Selected Vehicle
            </span>
            <span className="conf-val">{bookingDetails.carName}</span>
          </div>

          <div className="conf-detail-item">
            <span className="conf-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={16} /> Chosen Date
            </span>
            <span className="conf-val">{bookingDetails.preferredDate}</span>
          </div>

          <div className="conf-detail-item">
            <span className="conf-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} /> Time Slot
            </span>
            <span className="conf-val">{bookingDetails.preferredTimeSlot}</span>
          </div>
        </div>
      </details>
    </div>
  );
}
