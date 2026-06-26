import { BookingResponse } from '../types';
import { Check, Clipboard, Calendar, Clock, Car, Download, User, Phone, Mail, MapPin } from 'lucide-react';

interface ConfirmationProps {
  bookingDetails: BookingResponse;
  onBookAnother: () => void;
}

export default function Confirmation({ bookingDetails, onBookAnother }: ConfirmationProps) {

  const handleCopyId = () => {
    navigator.clipboard.writeText(bookingDetails.bookingId);
    alert('Booking ID copied to clipboard!');
  };

  const handleDownloadReceipt = () => {
    const generatedDate = new Date().toLocaleString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

    // Build receipt HTML as a new document
    const receiptHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Flowzap Receipt – ${bookingDetails.bookingId}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #1e293b;
      background: #fff;
      padding: 48px;
      font-size: 14px;
      line-height: 1.6;
    }
    .receipt-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 24px;
      border-bottom: 2px solid #2563eb;
      margin-bottom: 28px;
    }
    .brand { font-size: 26px; font-weight: 800; letter-spacing: 2px; color: #2563eb; }
    .brand-tagline { font-size: 11px; color: #64748b; margin-top: 2px; }
    .receipt-title { text-align: right; }
    .receipt-title h1 { font-size: 18px; font-weight: 700; color: #1e293b; }
    .receipt-title .booking-id {
      display: inline-block;
      margin-top: 6px;
      padding: 4px 12px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      color: #2563eb;
      letter-spacing: 0.5px;
    }
    .success-banner {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 14px 20px;
      margin-bottom: 28px;
      font-size: 13px;
      color: #15803d;
      font-weight: 500;
    }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748b;
      margin-bottom: 14px;
    }
    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 28px;
    }
    .detail-item { padding: 14px 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
    .detail-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .detail-value { font-size: 14px; font-weight: 600; color: #1e293b; }
    .divider { border: none; border-top: 1px solid #e2e8f0; margin: 20px 0; }
    .footer {
      margin-top: 36px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #94a3b8;
    }
    @media print {
      body { padding: 24px; }
    }
  </style>
</head>
<body>
  <div class="receipt-header">
    <div>
      <div class="brand">⚡ FLOWZAP</div>
      <div class="brand-tagline">Premium Test Drive Booking</div>
    </div>
    <div class="receipt-title">
      <h1>Test Drive Booking Confirmation</h1>
      <span class="booking-id">Ref: ${bookingDetails.bookingId}</span>
    </div>
  </div>

  <div class="success-banner">
    ✓ &nbsp;Your test drive request has been successfully submitted. Our team will contact you shortly to confirm the details.
  </div>

  ${bookingDetails.customerName ? `
  <div class="section-title">Customer Details</div>
  <div class="detail-grid">
    <div class="detail-item">
      <div class="detail-label">Full Name</div>
      <div class="detail-value">${bookingDetails.customerName}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Phone Number</div>
      <div class="detail-value">${bookingDetails.customerPhone || '—'}</div>
    </div>
    ${bookingDetails.customerEmail ? `
    <div class="detail-item">
      <div class="detail-label">Email Address</div>
      <div class="detail-value">${bookingDetails.customerEmail}</div>
    </div>` : ''}
    ${bookingDetails.city ? `
    <div class="detail-item">
      <div class="detail-label">Showroom City</div>
      <div class="detail-value">${bookingDetails.city}</div>
    </div>` : ''}
  </div>
  <hr class="divider" />
  ` : ''}

  <div class="section-title">Booking Details</div>
  <div class="detail-grid">
    <div class="detail-item">
      <div class="detail-label">Selected Vehicle</div>
      <div class="detail-value">${bookingDetails.carName}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Preferred Date</div>
      <div class="detail-value">${bookingDetails.preferredDate}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Time Slot</div>
      <div class="detail-value">${bookingDetails.preferredTimeSlot}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Booking Status</div>
      <div class="detail-value">Pending Confirmation</div>
    </div>
  </div>

  <div class="footer">
    <span>Generated: ${generatedDate}</span>
    <span>© ${new Date().getFullYear()} Flowzap Cars Inc. &nbsp;|&nbsp; flowzap.com</span>
  </div>
</body>
</html>`;

    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (!printWindow) {
      alert('Please allow pop-ups to download the receipt.');
      return;
    }
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    // Slight delay to ensure content is fully rendered before print dialog
    printWindow.addEventListener('load', () => {
      printWindow.focus();
      printWindow.print();
      // Close the window after print dialog is dismissed
      printWindow.addEventListener('afterprint', () => printWindow.close());
    });
  };

  return (
    <div className="confirmation-card">
      <div className="success-check-wrapper">
        <Check size={40} strokeWidth={3} />
      </div>

      <h1 className="conf-title">Request Submitted!</h1>
      <p className="conf-subtitle">
        {bookingDetails.message}
      </p>

      <div className="conf-details-box">
        <div className="conf-detail-item">
          <span className="conf-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clipboard size={16} /> Booking Reference
          </span>
          <span className="conf-val conf-booking-id" onClick={handleCopyId} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            {bookingDetails.bookingId} <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 'normal' }}>(copy)</span>
          </span>
        </div>

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
            <span className="conf-val .conf-email">{bookingDetails.customerEmail}</span>
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

      <div className="conf-actions">
        <button className="back-home-btn" onClick={onBookAnother}>
          Book Another Drive
        </button>
        <button className="download-receipt-btn" onClick={handleDownloadReceipt}>
          <Download size={16} /> Download Receipt
        </button>
      </div>
    </div>
  );
}
