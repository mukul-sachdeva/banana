import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, MapPin, ArrowRight, ChevronRight, FileText, ShieldCheck, Tag } from 'lucide-react';
import { useSEO } from '../useSEO';
import { Car } from '../types';
import { trackEvent } from '../analytics/analytics';
import { EVENTS } from '../analytics/constants';
import { INTERNAL_BLOG_LINKS, SUPPORTED_CITIES } from '../data/seoContent';
import NotFoundPage from './NotFoundPage';

export interface CarVariant {
  id: string;
  name: string;
  fuel: string;
  transmission: string;
  engineSize: string;
  exShowroom: number;
  idealFor: string;
  verdict: string;
}

export interface CityPricingConfig {
  citySlug: string;
  cityName: string;
  stateUt: string;
  rtoPercent: number;
  rtoNote: string;
  lastUpdated: string;
  localDrivingContext: {
    title: string;
    description: string;
    keyRoads: string;
    testFocus: string;
  };
}

export interface VariantCostBreakdown {
  variantId: string;
  variantName: string;
  fuel: string;
  transmission: string;
  exShowroom: number;
  rtoCost: number;
  insuranceCost: number;
  statutoryCharges: number;
  mandatoryOnRoad: number;
  accessoriesEstimate: number;
  extendedWarrantyEstimate: number;
  rsaEstimate: number;
  totalEstimatedOnRoad: number;
  fairPriceLow: number;
  fairPriceHigh: number;
  stealThreshold: number;
  goodDealMax: number;
}

export interface ModelGoldStandardData {
  modelSlug: string;
  modelName: string;
  brandSlug: string;
  brandName: string;
  heroImageUrl: string;
  variants: CarVariant[];
  cityPricingConfigs: Record<string, CityPricingConfig>;
  calculateOnRoad: (variant: CarVariant, cityConfig: CityPricingConfig) => VariantCostBreakdown;
  evaluationPoints: Array<{ title: string; advice: string }>;
  whoShouldConsider: {
    suits: string[];
    tradeOffs: string[];
  };
  variantAdvice: Array<{
    category: string;
    title: string;
    description: string;
  }>;
  getCityFaqs: (cityName: string) => Array<{ question: string; answer: string }>;
}

export interface GoldStandardCarPageProps {
  modelData: ModelGoldStandardData;
  citySlug: string;
  onCarSelect: (car: Car) => void;
}

export default function GoldStandardCarPage({ modelData, citySlug, onCarSelect }: GoldStandardCarPageProps) {
  const cityConfig = modelData.cityPricingConfigs[citySlug.toLowerCase()];
  const cityInfo = SUPPORTED_CITIES[citySlug.toLowerCase()];

  if (!cityConfig || !cityInfo) {
    return <NotFoundPage />;
  }

  const cityName = cityConfig.cityName;

  // Selected Variant State for Interactive On-Road Breakdown Calculator
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    modelData.variants[Math.min(3, modelData.variants.length - 1)].id
  );
  const [userDealerQuote, setUserDealerQuote] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activeVariant = modelData.variants.find(v => v.id === selectedVariantId) || modelData.variants[0];
  const activeCost = modelData.calculateOnRoad(activeVariant, cityConfig);

  // All Variants Breakdown for the City
  const allVariantCosts = modelData.variants.map(v => modelData.calculateOnRoad(v, cityConfig));

  // Determine Price Intelligence Status for user quote input
  const numericQuote = parseFloat(userDealerQuote.replace(/[^0-9.]/g, ''));
  let quoteStatus: 'STEAL' | 'GOOD_DEAL' | 'OVERPRICED' | null = null;
  if (!isNaN(numericQuote) && numericQuote > 300000) {
    if (numericQuote <= activeCost.stealThreshold) {
      quoteStatus = 'STEAL';
    } else if (numericQuote <= activeCost.goodDealMax) {
      quoteStatus = 'GOOD_DEAL';
    } else {
      quoteStatus = 'OVERPRICED';
    }
  }

  // Generic Car object for existing Flowzap booking flow integration
  const carObject: Car = {
    id: `${modelData.brandSlug}-${modelData.modelSlug}`,
    name: modelData.modelName,
    brand: modelData.brandName,
    transmission: activeVariant.transmission,
    fuel_type: activeVariant.fuel,
    price_range: `₹${(modelData.variants[0].exShowroom / 100000).toFixed(2)}L - ₹${(modelData.variants[modelData.variants.length - 1].exShowroom / 100000).toFixed(2)}L Ex-Showroom`,
    image_url: modelData.heroImageUrl,
  };

  const handleBookDrive = () => {
    void trackEvent(EVENTS.VEHICLE_SELECTED, {
      source: 'gold_standard_template',
      car_name: modelData.modelName,
      variant: activeVariant.name,
      city: cityName,
    });
    onCarSelect(carObject);
  };

  // SEO Titles & Meta
  const pageTitle = `${modelData.modelName} On-Road Price in ${cityName} & Test Drive | Flowzap`;
  const metaDescription = `Check ${modelData.modelName} on-road price in ${cityName} (${cityConfig.lastUpdated}), RTO tax, insurance breakdown, Flowzap Fair Price, variant advice, and book a free test drive.`;
  const canonicalUrl = `https://flowzap.co.in/test-drive/${modelData.brandSlug}/${modelData.modelSlug}/${cityConfig.citySlug}`;

  const faqs = modelData.getCityFaqs(cityName);

  // Structured Data Schemas
  const breadcrumbItems = [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://flowzap.co.in" },
    { "@type": "ListItem", "position": 2, "name": "Test Drives", "item": "https://flowzap.co.in/book" },
    { "@type": "ListItem", "position": 3, "name": `${cityName} Test Drives`, "item": `https://flowzap.co.in/test-drive/${cityConfig.citySlug}` },
    { "@type": "ListItem", "position": 4, "name": `${modelData.brandName} ${cityName}`, "item": `https://flowzap.co.in/test-drive/${modelData.brandSlug}/${cityConfig.citySlug}` },
    { "@type": "ListItem", "position": 5, "name": `${modelData.modelName} ${cityName}`, "item": canonicalUrl },
  ];

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems,
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer,
          },
        })),
      },
      {
        "@type": "Product",
        "name": `${modelData.modelName} (${cityName})`,
        "image": carObject.image_url,
        "description": `${modelData.modelName} on-road price and test drive evaluation in ${cityName}.`,
        "brand": { "@type": "Brand", "name": modelData.brandName },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "lowPrice": allVariantCosts[0].totalEstimatedOnRoad,
          "highPrice": allVariantCosts[allVariantCosts.length - 1].totalEstimatedOnRoad,
          "offerCount": modelData.variants.length,
        },
      },
    ],
  };

  useSEO({
    title: pageTitle,
    description: metaDescription,
    canonical: canonicalUrl,
    schema: jsonLdSchema,
  });

  return (
    <div className="seo-page-container">
      {/* 1. Visible Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="seo-breadcrumbs">
        <ol className="seo-breadcrumb-list">
          <li className="seo-breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="seo-breadcrumb-separator">/</li>
          <li className="seo-breadcrumb-item"><Link to="/test-drive/chandigarh">Test Drives</Link></li>
          <li className="seo-breadcrumb-separator">/</li>
          <li className="seo-breadcrumb-item"><Link to={`/test-drive/${cityConfig.citySlug}`}>{cityName}</Link></li>
          <li className="seo-breadcrumb-separator">/</li>
          <li className="seo-breadcrumb-item"><Link to={`/test-drive/${modelData.brandSlug}/${cityConfig.citySlug}`}>{modelData.brandName}</Link></li>
          <li className="seo-breadcrumb-separator">/</li>
          <li className="seo-breadcrumb-item active" aria-current="page">{modelData.modelName}</li>
        </ol>
      </nav>

      {/* 2. Hero Viewport — Begins directly with High-Res Model Image */}
      <section className="seo-hero-section" style={{ padding: '1.5rem 1.5rem 2.5rem' }}>
        <div style={{ position: 'relative', width: '100%', height: '360px', borderRadius: '14px', overflow: 'hidden', marginBottom: '1.75rem', backgroundColor: '#0f172a', boxShadow: '0 12px 32px -8px rgba(0,0,0,0.2)' }}>
          <img
            src={modelData.heroImageUrl}
            alt={`${modelData.modelName} in ${cityName}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.9), rgba(15,23,42,0.2) 60%, transparent)', padding: '1.5rem 1.5rem 1.25rem', color: 'white' }}>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, margin: '0.4rem 0 0', color: 'white' }}>
              {modelData.modelName} ({cityName})
            </h2>
          </div>
        </div>

        <div className="seo-hero-badge">
          <Tag size={14} /> Price Intelligence & Test Drive • {cityName}
        </div>

        <h1 className="seo-hero-title">{modelData.modelName} On-Road Price & Test Drive in {cityName}</h1>

        <p className="seo-hero-subtitle">
          Thinking about buying the {modelData.modelName}? Know the real city on-road price breakdown, Flowzap Fair Price range, variant recommendations, and what to evaluate behind the wheel before you commit.
        </p>

        <div className="seo-hero-trust-bar">
          <div className="seo-trust-item">
            <Check size={16} className="seo-trust-icon" />
            <span>100% Free Drive Request</span>
          </div>
          <div className="seo-trust-item">
            <Check size={16} className="seo-trust-icon" />
            <span>City Price Intelligence ({cityConfig.lastUpdated})</span>
          </div>
          <div className="seo-trust-item">
            <Check size={16} className="seo-trust-icon" />
            <span>Sends Request to Dealership Representative</span>
          </div>
        </div>

        <div className="seo-hero-cta-wrapper">
          <button className="seo-hero-primary-btn" onClick={handleBookDrive}>
            Book Your Free {modelData.modelName} Test Drive <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* 3. On-Road Price Snapshot & Interactive Variant Selector */}
      <section className="seo-price-snapshot-section" style={{ marginBottom: '3.5rem' }}>
        <div className="seo-section-header">
          <h2 className="seo-section-title">{modelData.modelName} On-Road Price Snapshot in {cityName}</h2>
          <p className="seo-section-subtitle">
            Estimated On-Road Range: <strong>₹{(allVariantCosts[0].totalEstimatedOnRoad / 100000).toFixed(2)} Lakh</strong> to <strong>₹{(allVariantCosts[allVariantCosts.length - 1].totalEstimatedOnRoad / 100000).toFixed(2)} Lakh</strong> (Includes RTO, Insurance & Statutory Fees).
          </p>
        </div>

        {/* Variant Selector Pills */}
        <div className="seo-variant-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.75rem' }}>
          {modelData.variants.map((v) => {
            const isSelected = v.id === selectedVariantId;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariantId(v.id)}
                className={`seo-chip-link ${isSelected ? 'active' : ''}`}
                style={{
                  padding: '0.55rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backgroundColor: isSelected ? 'var(--primary)' : '#f8fafc',
                  color: isSelected ? 'white' : 'var(--text-primary)',
                  borderColor: isSelected ? 'var(--primary)' : 'var(--border-color)',
                  cursor: 'pointer',
                }}
              >
                {v.name}
              </button>
            );
          })}
        </div>

        {/* Active Variant Price Card */}
        <div className="seo-active-price-card" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '2rem', boxShadow: '0 8px 24px -6px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.04em' }}>Selected Variant</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>{activeVariant.name}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{activeVariant.engineSize} • {activeVariant.transmission} ({activeVariant.fuel})</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>Mandatory On-Road ({cityName})</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669' }}>
                ₹{activeCost.mandatoryOnRoad.toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.15rem' }}>
                Full Package with Add-ons (Warranty/RSA/Mats): <strong>₹{activeCost.totalEstimatedOnRoad.toLocaleString('en-IN')}</strong>
              </span>
            </div>
          </div>

          {/* 4. Flowzap Price Intelligence Calculator (KEY DIFFERENTIATOR) */}
          <div className="seo-price-intelligence-box" style={{ backgroundColor: 'rgba(37, 99, 235, 0.04)', border: '1px solid rgba(37, 99, 235, 0.2)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <ShieldCheck size={20} color="var(--primary)" />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Flowzap Price Intelligence ({cityName})</h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', borderTop: '3px solid #059669', cursor: 'default' }}>
                <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.03em' }}>1. MANDATORY ON-ROAD</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#059669', display: 'block', margin: '0.2rem 0' }}>
                  ₹{activeCost.mandatoryOnRoad.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Ex-Showroom + RTO + Insurance</span>
              </div>

              <div style={{ backgroundColor: 'rgba(37, 99, 235, 0.03)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(37, 99, 235, 0.25)', borderTop: '3px solid #2563eb', cursor: 'default' }}>
                <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.03em' }}>2. FLOWZAP FAIR PRICE RANGE</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', display: 'block', margin: '0.2rem 0' }}>
                  ₹{activeCost.fairPriceLow.toLocaleString('en-IN')} – ₹{activeCost.fairPriceHigh.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Target Fair Price for Dealership Purchase</span>
              </div>

              <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', borderTop: '3px solid #64748b', cursor: 'default' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.03em' }}>3. FULL PACKAGE (WITH ADD-ONS)</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#475569', display: 'block', margin: '0.2rem 0' }}>
                  ₹{activeCost.totalEstimatedOnRoad.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Includes Extended Warranty + RSA + Accessories</span>
              </div>
            </div>

            {/* Deal Indicator Threshold Bar */}
            <div className="seo-deal-indicators" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '0.35rem 0.75rem', borderRadius: '6px', backgroundColor: '#dcfce7', color: '#166534', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                🟢 STEAL DEAL: Under ₹{activeCost.stealThreshold.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '0.35rem 0.75rem', borderRadius: '6px', backgroundColor: '#fef9c3', color: '#854d0e', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                🟡 GOOD DEAL: ₹{activeCost.fairPriceLow.toLocaleString('en-IN')} – ₹{activeCost.goodDealMax.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '0.35rem 0.75rem', borderRadius: '6px', backgroundColor: '#fee2e2', color: '#991b1b', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                🔴 OVERPRICED: Above ₹{activeCost.goodDealMax.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Dealer Quote Audit Tool Input */}
            <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
              <label htmlFor="dealer-quote-input" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
                Have a Dealer Quote for {activeVariant.name} in {cityName}? Test your deal:
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                  id="dealer-quote-input"
                  type="text"
                  placeholder="e.g. 1360000"
                  value={userDealerQuote}
                  onChange={(e) => setUserDealerQuote(e.target.value)}
                  style={{ padding: '0.65rem 0.85rem', fontSize: '0.9rem', borderRadius: '6px', border: '1px solid #cbd5e1', width: '220px' }}
                />
                {quoteStatus === 'STEAL' && (
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#166534', backgroundColor: '#dcfce7', padding: '0.5rem 0.85rem', borderRadius: '6px' }}>
                    🟢 Excellent Deal! Below Flowzap Fair Ceiling
                  </span>
                )}
                {quoteStatus === 'GOOD_DEAL' && (
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#854d0e', backgroundColor: '#fef9c3', padding: '0.5rem 0.85rem', borderRadius: '6px' }}>
                    🟡 Fair Deal! Within Flowzap Price Range
                  </span>
                )}
                {quoteStatus === 'OVERPRICED' && (
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#991b1b', backgroundColor: '#fee2e2', padding: '0.5rem 0.85rem', borderRadius: '6px' }}>
                    🔴 Markups Detected! Negotiate Dealer Accessories / Handling
                  </span>
                )}
              </div>
            </div>

            <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0.75rem 0 0', lineHeight: 1.45 }}>
              *<strong>How Flowzap Calculates Fair Price:</strong> Mandatory On-Road (₹{activeCost.mandatoryOnRoad.toLocaleString('en-IN')}) is what you MUST pay by law (Ex-showroom + {cityConfig.rtoNote} + IRDAI insurance). Optional dealer packages (₹{(activeCost.totalEstimatedOnRoad - activeCost.mandatoryOnRoad).toLocaleString('en-IN')} for Extended Warranty, RSA & Accessories) bring the full dealer package to ₹{activeCost.totalEstimatedOnRoad.toLocaleString('en-IN')}. A fair dealer quote for the vehicle itself should fall between ₹{activeCost.fairPriceLow.toLocaleString('en-IN')} and ₹{activeCost.fairPriceHigh.toLocaleString('en-IN')}.
            </p>
          </div>

          {/* 5. Complete Itemized On-Road Price Breakdown */}
          <div className="seo-breakdown-tables">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
              Itemized Cost Breakdown ({cityName})
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {/* Mandatory Column */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1.1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>Mandatory Charges</span>
                <table style={{ width: '100%', fontSize: '0.88rem', marginTop: '0.5rem', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.4rem 0' }}>Ex-Showroom Price</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{activeCost.exShowroom.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.4rem 0' }}>RTO / Road Tax ({cityConfig.stateUt})</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{activeCost.rtoCost.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.4rem 0' }}>Insurance (1-Yr OD + 3-Yr TP)</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{activeCost.insuranceCost.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.4rem 0' }}>Registration, FASTag & TCS</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{activeCost.statutoryCharges.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr style={{ borderTop: '2px solid #cbd5e1', fontWeight: 700, color: '#0f172a' }}>
                      <td style={{ padding: '0.6rem 0' }}>Mandatory On-Road Subtotal</td>
                      <td style={{ textAlign: 'right', color: '#059669' }}>₹{activeCost.mandatoryOnRoad.toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Optional/Dealer Column */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1.1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#d97706', textTransform: 'uppercase' }}>Optional / Dealer Charges</span>
                <table style={{ width: '100%', fontSize: '0.88rem', marginTop: '0.5rem', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.4rem 0' }}>Basic Essential Accessories</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{activeCost.accessoriesEstimate.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.4rem 0' }}>Extended Warranty</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{activeCost.extendedWarrantyEstimate.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.4rem 0' }}>Roadside Assistance (RSA)</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{activeCost.rsaEstimate.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr style={{ borderTop: '2px solid #cbd5e1', fontWeight: 700, color: '#0f172a' }}>
                      <td style={{ padding: '0.6rem 0' }}>Full Package Total</td>
                      <td style={{ textAlign: 'right', color: '#2563eb' }}>₹{activeCost.totalEstimatedOnRoad.toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Full Variant Matrix Table ({cityName}) */}
      <section className="seo-variant-matrix-section" style={{ marginBottom: '3.5rem' }}>
        <div className="seo-section-header">
          <h2 className="seo-section-title">Complete {modelData.modelName} On-Road Price Table ({cityName})</h2>
          <p className="seo-section-subtitle">
            Compare all {modelData.variants.length} {modelData.modelName} variants with city RTO taxes and Flowzap Fair Price ceilings for {cityName}.
          </p>
        </div>

        <div style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#334155' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Variant</th>
                <th style={{ padding: '0.85rem 1rem' }}>Fuel / Trans</th>
                <th style={{ padding: '0.85rem 1rem' }}>Ex-Showroom</th>
                <th style={{ padding: '0.85rem 1rem' }}>Mandatory On-Road</th>
                <th style={{ padding: '0.85rem 1rem' }}>Flowzap Fair Price Range</th>
                <th style={{ padding: '0.85rem 1rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {allVariantCosts.map((vc) => (
                <tr key={vc.variantId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>{vc.variantName}</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>{vc.fuel} ({vc.transmission})</td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>₹{vc.exShowroom.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#059669' }}>₹{vc.mandatoryOnRoad.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#2563eb' }}>
                    ₹{vc.fairPriceLow.toLocaleString('en-IN')} – ₹{vc.fairPriceHigh.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <button
                      type="button"
                      onClick={handleBookDrive}
                      style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', fontWeight: 600, backgroundColor: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', border: '1px solid rgba(37, 99, 235, 0.2)', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      Book Drive →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Variant Buying Advice */}
      <section className="seo-variant-advice-section" style={{ marginBottom: '3.5rem' }}>
        <div className="seo-section-header">
          <h2 className="seo-section-title">Which {modelData.modelName} Variant Should You Buy?</h2>
          <p className="seo-section-subtitle">
            Expert recommendations based on real budget priorities and driving requirements.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {modelData.variantAdvice.map((va, idx) => (
            <div key={idx} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>{va.category}</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0.3rem 0 0.5rem' }}>{va.title}</h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                {va.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Driver Evaluation Checklist */}
      <section className="seo-checklist-section" style={{ marginBottom: '3.5rem' }}>
        <div className="seo-section-header">
          <h2 className="seo-section-title">What to Evaluate During Your {modelData.modelName} Test Drive</h2>
          <p className="seo-section-subtitle">
            Do not judge the vehicle by its feature list alone. Pay attention to these practical driving factors.
          </p>
        </div>

        <div className="seo-checklist-grid">
          {modelData.evaluationPoints.map((pt, idx) => (
            <div key={idx} className="seo-checklist-card">
              <div className="seo-checklist-num">{idx + 1}</div>
              <h3>{pt.title}</h3>
              <p>{pt.advice}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. City-Specific Driving Guidance */}
      <section className="seo-local-section" style={{ marginBottom: '3.5rem' }}>
        <div className="seo-local-card">
          <div className="seo-local-icon">
            <MapPin size={28} />
          </div>
          <div className="seo-local-content">
            <h2>{cityConfig.localDrivingContext.title}</h2>
            <p>{cityConfig.localDrivingContext.description}</p>
            <p className="seo-local-subtext">
              <strong>Key Roads to Evaluate:</strong> {cityConfig.localDrivingContext.keyRoads}<br />
              <strong>Test Focus:</strong> {cityConfig.localDrivingContext.testFocus}
            </p>
          </div>
        </div>
      </section>

      {/* 10. Active Pilot City Clusters */}
      <section className="seo-compare-section" style={{ marginBottom: '3.5rem' }}>
        <div className="seo-section-header">
          <h2 className="seo-section-title">Explore {modelData.modelName} Test Drives Across Active Cities</h2>
          <p className="seo-section-subtitle">
            Flowzap Gold Standard price intelligence and test drives are currently active in 5 cities.
          </p>
        </div>

        <div className="seo-cluster-links">
          {Object.values(SUPPORTED_CITIES).map((c) => (
            <Link
              key={c.slug}
              to={`/test-drive/${modelData.brandSlug}/${modelData.modelSlug}/${c.slug}`}
              className={`seo-chip-link ${c.slug === cityConfig.citySlug ? 'active' : ''}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.88rem' }}
            >
              {modelData.modelName} in {c.name} →
            </Link>
          ))}
        </div>
      </section>

      {/* 11. Home Test Drive */}
      <section className="seo-home-drive-section" style={{ marginBottom: '3.5rem' }}>
        <div className="seo-local-card" style={{ backgroundColor: 'rgba(5, 150, 105, 0.04)', borderColor: 'rgba(5, 150, 105, 0.2)' }}>
          <div className="seo-local-icon" style={{ backgroundColor: '#059669' }}>
            <Check size={28} />
          </div>
          <div className="seo-local-content">
            <h2>Why Consider a Home Test Drive in {cityName}?</h2>
            <p>
              A home test drive allows you to evaluate the {modelData.modelName} in your actual residential environment. You can check home driveway parking clearance, test family entry/exit ease, load family luggage in the boot, and let family members evaluate seating comfort in familiar surroundings.
            </p>
            <p className="seo-local-subtext">
              *Home test-drive availability is subject to location distance and participating certified dealership inventory in {cityName}.
            </p>
          </div>
        </div>
      </section>

      {/* 12. Contextual Article Links */}
      <section className="seo-links-section">
        <div className="seo-section-header">
          <h2 className="seo-section-title">Car Buying Guides & Price Advice</h2>
          <p className="seo-section-subtitle">
            Read expert advice to help you evaluate quotes and compare vehicles before committing.
          </p>
        </div>

        <div className="seo-articles-grid">
          {INTERNAL_BLOG_LINKS.map((article) => (
            <Link key={article.slug} to={`/blog/${article.slug}`} className="seo-article-card">
              <div className="seo-article-icon">
                <FileText size={20} />
              </div>
              <div className="seo-article-body">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <span className="seo-article-link-text">Read Article →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 13. City FAQs Accordion */}
      <section className="seo-faq-section" style={{ marginBottom: '3.5rem' }}>
        <div className="seo-section-header">
          <h2 className="seo-section-title">{modelData.modelName} Test Drive — Frequently Asked Questions ({cityName})</h2>
          <p className="seo-section-subtitle">Common questions regarding {modelData.modelName} on-road price, fair price range, and test drive booking in {cityName}.</p>
        </div>

        <div className="seo-faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className={`seo-faq-item ${isOpen ? 'open' : ''}`}>
                <button className="seo-faq-question" onClick={() => setOpenFaqIndex(isOpen ? null : index)}>
                  <span>{faq.question}</span>
                  <ChevronRight className={`seo-faq-icon ${isOpen ? 'rotated' : ''}`} size={18} />
                </button>
                {isOpen && <div className="seo-faq-answer">{faq.answer}</div>}
              </div>
            );
          })}
        </div>
      </section>

      {/* 14. Final High-Intent CTA */}
      <section style={{ backgroundColor: 'var(--primary)', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center', color: 'white', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.85rem' }}>
          Know the Price. Know the Deal. Then Drive It.
        </h2>
        <p style={{ fontSize: '1.05rem', opacity: 0.9, maxWidth: '640px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
          Don't choose your next vehicle from a specification sheet. Request a free test drive in {cityName} in under one minute.
        </p>
        <button
          onClick={handleBookDrive}
          style={{ backgroundColor: 'white', color: 'var(--primary)', border: 'none', padding: '0.9rem 2.25rem', fontSize: '1.05rem', fontWeight: 700, borderRadius: '10px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}
        >
          Book Your Free {modelData.modelName} Test Drive <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}
