import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Clock, List } from 'lucide-react';
import { useSEO } from '../useSEO';
import { getArticleBySlug, getRelatedArticles } from '../articles';

interface ArticlePageProps {
  onStartBooking: () => void;
}

export default function ArticlePage({ onStartBooking }: ArticlePageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useSEO({
    title: article ? `${article.title} | Flowzap` : 'Article Not Found | Flowzap',
    description: article?.description ?? 'Article not found.',
    canonical: article ? `https://flowzap.co.in/blog/${article.slug}` : undefined,
  });

  if (!article) {
    return (
      <div className="article-not-found">
        <h1>Article not found</h1>
        <p>The article you're looking for doesn't exist.</p>
        <Link to="/" className="article-back-link">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    );
  }

  const related = getRelatedArticles(article.relatedSlugs);

  const handleCTAClick = () => {
    onStartBooking();
  };

  return (
    <article className="article-page">
      {/* Back link */}
      <div className="article-back-bar">
        <button className="article-back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {/* Article header */}
      <header className="article-header">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-meta">
          <span className="article-reading-time">
            <Clock size={14} /> {article.readingTime} min read
          </span>
        </div>
      </header>

      {/* Hero image */}
      <div className="article-hero-image">
        <img
          src={`/blog/${article.slug}.jpg`}
          alt={article.heroImageAlt}
          className="article-hero-img"
        />
      </div>

      {/* Table of contents */}
      <nav className="article-toc">
        <div className="article-toc-header">
          <List size={16} /> <span>Contents</span>
        </div>
        <ol className="article-toc-list">
          {article.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="article-toc-link">
                {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Article body */}
      <div className="article-body">
        {article.sections.map((section) => (
          <section key={section.id} id={section.id} className="article-section">
            <h2 className="article-section-heading">{section.heading}</h2>
            <div
              className="article-section-content"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
            {section.showCTA && (
              <div className="article-cta-banner">
                <p className="article-cta-text">
                  Reading about it is useful. Experiencing it is better.
                </p>
                <button className="article-cta-btn" onClick={handleCTAClick}>
                  Book a Free Test Drive <ArrowRight size={16} />
                </button>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <div className="article-related">
          <h3 className="article-related-title">Continue Reading</h3>
          <div className="article-related-grid">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/blog/${r.slug}`}
                className="article-related-card"
              >
                <span className="article-related-card-time">
                  <Clock size={12} /> {r.readingTime} min
                </span>
                <h4 className="article-related-card-title">{r.title}</h4>
                <span className="article-related-card-link">
                  Read article <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Final CTA */}
      <div className="article-final-cta">
        <h3>Ready to experience it yourself?</h3>
        <p>Book a free test drive and find out what reviews can't tell you.</p>
        <button className="hero-cta-btn" onClick={handleCTAClick}>
          Browse Available Cars <ArrowRight size={20} />
        </button>
      </div>
    </article>
  );
}
