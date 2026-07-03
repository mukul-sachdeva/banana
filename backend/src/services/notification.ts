/**
 * Placeholder service for sending notifications (e.g., Email, Slack, Event Queues)
 */
export async function sendNotification(type: 'email' | 'system', recipient: string, title: string, body: string): Promise<boolean> {
  // Read Telegram configuration from environment (bot token only)
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  // Hard-coded recipient per request — numeric Telegram chat id extracted from bot updates
  const chatId = 7652909264;

  // If Telegram bot token not configured, fall back to console output
  if (!botToken) {
    console.log(`[Notification Service] TELEGRAM_BOT_TOKEN not set — falling back to console output.`);
    console.log(`[Notification] ${type} -> ${recipient}`);
    console.log(`Title: ${title}`);
    console.log(`Body: ${body}`);
    console.log(`[Notification] Hard-coded recipient (chat id): ${chatId}`);
    return true;
  }

  try {
    // Build a readable message. We rely on the title/body passed by callers (booking flow provides booking id and details).
    const bookingIdMatch = title.match(/B-\d+/i);
    const bookingId = bookingIdMatch ? bookingIdMatch[0] : title;

    const createdAt = new Date().toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    const messageLines = [
      '🚗 New Test Drive Booking',
      '',
      `📌 ${title}`,
      '',
      '📣 Details:',
      body,
      '',
      `Booking ID: ${bookingId}`,
      `Created At: ${createdAt}`
    ];

    const message = messageLines.join('\n');

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Use global fetch if available; cast to any to avoid TS DOM lib dependency
    const fetchFn = (globalThis as any).fetch;
    if (typeof fetchFn !== 'function') {
      console.error('[Notification] fetch is not available in this runtime. Telegram message not sent.');
      return false;
    }

    const resp = await fetchFn(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });

    if (!resp.ok) {
      let details = '';
      try { details = await resp.text(); } catch (e) { /* ignore */ }
      console.error(`[Notification] Failed to send Telegram message: ${resp.status} ${resp.statusText} ${details}`);
      return false;
    }

    console.log('[Notification] Telegram message sent successfully.');
    return true;
  } catch (err: any) {
    console.error('[Notification] Error sending Telegram message:', err?.message || err);
    // Non-fatal — callers expect booking to succeed regardless of notification delivery
    return false;
  }
}
