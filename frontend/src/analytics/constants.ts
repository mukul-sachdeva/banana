export const EVENTS = {
  PAGE_VIEW: 'page_view',
  ABOUT_OPENED: 'about_opened',
  PRIVACY_OPENED: 'privacy_opened',
  TERMS_OPENED: 'terms_opened',
  BOOK_DRIVE_CLICKED: 'book_drive_clicked',
  BRAND_SELECTED: 'brand_selected',
  VEHICLE_SELECTED: 'vehicle_selected',
  OTHER_VEHICLE_CLICKED: 'other_vehicle_clicked',
  VEHICLE_REQUEST_EMAIL_CLICKED: 'vehicle_request_email_clicked',
  BOOKING_FORM_STARTED: 'booking_form_started',
  BOOKING_CITY_SELECTED: 'booking_city_selected',
  BOOKING_SHOWROOM_SELECTED: 'booking_showroom_selected',
  BOOKING_DATE_SELECTED: 'booking_date_selected',
  BOOKING_TIME_SELECTED: 'booking_time_selected',
  BOOKING_SUBMITTED: 'booking_submitted',
  BOOKING_SUCCESS: 'booking_success',
  BOOKING_FAILED: 'booking_failed',
  FOOTER_EMAIL_CLICKED: 'footer_email_clicked',
} as const;

export type AnalyticsEventName = typeof EVENTS[keyof typeof EVENTS];
