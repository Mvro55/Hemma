import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Header from './Header';
import logoImg from './assets/logo.png';
import mainPic from './assets/pic1.jpeg';
import pic2 from './assets/pic2.jpeg';
import pic3 from './assets/pic3.jpeg';
import pic4 from './assets/pic4.jpeg';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // دالة الانتقال لصفحة تفاصيل الخبر
  const goToArticle = () => {
    navigate('/article');
  };

  const slides = [
    {
      image: pic2,
      tag: "حياة بلا حواجز",
      title: "مساحات نلتقي فيها، لا حواجز بيننا.",
      description: "المكان الجميل هو الذي يدعونا جميعاً للبقاء. اكتشف أفكاراً لحدائق ومرافق أكثر ترحيباً، وخذ معك دليل المساحات العامة المتاحة في زيارتك المقبلة."
    },
    {
      image: pic3,
      tag: "مدن ذكية للجميع",
      title: "خطوات عادلة نحو بنية تحتية متكاملة.",
      description: "نعمل معاً لتصميم شوارع وممرات تضمن لكل فرد حرية الحركة والتنقل بكل أمان واستقلالية دون عوائق هندسية."
    },
    {
      image: pic4,
      tag: "مجتمع دامج",
      title: "حكايات وأفكار لمستقبل أكثر شمولاً.",
      description: "قصص ملهمة من قلب المدن التي أعادت اكتشاف نفسها لتصبح بيئة حاضنة لكل الطاقات والقدرات بلا استثناء."
    }
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // دالة موحدة لقراءة النص بصوت عربي
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-EG';
      utterance.rate = 0.9;

      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find(v => v.lang.startsWith('ar') || v.lang.includes('AR'));
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }

      window.speechSynthesis.speak(utterance);
    } else {
      alert('متصفحك لا يدعم خاصية القراءة الصوتية');
    }
  };

  // قراءة جملة الترحيب فقط تلقائياً أول ما الصفحة تحمل
  useEffect(() => {
    const handleFirstInteraction = () => {
      speakText("مرحباً بك في موقع همة");
      window.removeEventListener('click', handleFirstInteraction);
    };

    const timer = setTimeout(() => {
      speakText("مرحباً بك في موقع همة");
    }, 1000);

    window.addEventListener('click', handleFirstInteraction);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  // مكون أيقونة الصوت البريميوم (SVG)
  const PremiumSpeakerIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
    </svg>
  );

  return (
    <div className="app-wrapper">
      {/* الهيدر الموحد */}
      <Header />

      {/* شريط الأخبار العاجلة */}
      <div className="ticker-container">
        <span className="ticker-badge">عاجل</span>
        <div className="ticker-scroll-wrapper">
          <div className="ticker-text">
            في ملفنا اليوم: كيف نقرأ موازنة المدينة من منظور الحق في الوصول؟ تابعوا التفاصيل أولاً بأول.
          </div>
        </div>
      </div>

      {/* الكارت الرئيسي الأول */}
      <main className="main-card">
        <div className="hero-grid">
          <div className="hero-content">
            <span className="hero-tag">ملف خاص / المدن الشاملة</span>
            <h1 className="hero-title">مدنٌ تتسع لخطواتنا جميعًا.</h1>
            <p className="hero-description">
              من الرصيف إلى الحديقة، تبدأ المدينة العادلة حين يستطيع كل شخص أن يختار طريقه. حكايات وأفكار لمساحات عامة بلا حواجز.
            </p>

            <div className="hero-actions" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button 
                className="sign-btn primary" 
                onClick={() => speakText("مدنٌ تتسع لخطواتنا جميعًا. من الرصيف إلى الحديقة، تبدأ المدينة العادلة حين يستطيع كل شخص أن يختار طريقه.")}
              >
                
                شاهد بلغة الإشارة
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 11V6a2 2 0 0 0-4 0v5"></path>
    <path d="M14 10V4a2 2 0 0 0-4 0v6"></path>
    <path d="M10 10.5V6a2 2 0 0 0-4 0v8"></path>
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
  </svg>
              </button>

              <button 
                className="sign-btn primary" 
                onClick={goToArticle}
                style={{ background: '#d35400', border: 'none' }}
              >
                اقرأ الخبر كاملاً
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 5 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            <div className="hero-meta">
              <span>الأحد 1 نوفمبر 2026</span>
              <span>•</span>
              <span>4 دقائق قراءة</span>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img src={mainPic} alt="المدن الشاملة" className="hero-img" />
            <div className="badge-sign-overlay">ترجمة بلغة الإشارة متاحة</div>

            <div className="sub-news-card">
              <div className="sub-card-header">
                <span className="sub-tag">آخر الأخبار</span>
                <button 
                  className="arrow-icon-btn" 
                  title="استمع للخبر"
                  onClick={() => speakText("حين تصبح الرحلة إلى المكتبة حقًا لا تحديًا.")}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d35400' }}
                >
                  <PremiumSpeakerIcon />
                </button>
              </div>
              <h3 className="sub-title">حين تصبح الرحلة إلى المكتبة حقًا لا تحديًا</h3>
              <div className="sub-card-footer">
                <span className="sub-category">مجتمع • قصص من الحياة</span>
                <div className="arrow-buttons">
                  <button className="arrow-btn" onClick={goToArticle}>➔</button>
                  <button className="arrow-btn" onClick={goToArticle}>←</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* قسم السلايدر التفاعلي */}
      <section className="slider-section">
        <div className="slider-container" style={{ backgroundImage: `url(${slides[currentSlide].image})` }}>
          <div className="slider-overlay"></div>
          
          <div className="slider-content">
            <span className="slider-tag">{slides[currentSlide].tag}</span>
            <h2 className="slider-title">{slides[currentSlide].title}</h2>
            <p className="slider-desc">{slides[currentSlide].description}</p>

            <div className="slider-actions">
            <button 
  className="sign-btn primary-light" 
  onClick={() => speakText(`${slides[currentSlide].title}. ${slides[currentSlide].description}`)}
  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
>
  شاهد بلغة الإشارة
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 11V6a2 2 0 0 0-4 0v5"></path>
    <path d="M14 10V4a2 2 0 0 0-4 0v6"></path>
    <path d="M10 10.5V6a2 2 0 0 0-4 0v8"></path>
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
  </svg>
</button>

              <button 
                className="sign-btn glass" 
                onClick={goToArticle}
              >
                اقرأ الخبر كاملاً
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 5 12 12 19"></polyline>
                </svg>
              </button>

              {/* زرار "خبر مسموع" الأبيض والشفاف مع باقي الأزرار */}
              <button 
                className="sign-btn glass" 
                onClick={() => speakText(`${slides[currentSlide].title}. ${slides[currentSlide].description}`)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                
                خبر مسموع
            <PremiumSpeakerIcon />
              </button>
            </div>
          </div>

          {/* أزرار التنقل بالأسهم */}
          <div className="slider-arrows">
            <button className="slider-arrow-btn" onClick={handlePrev}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            <button className="slider-arrow-btn" onClick={handleNext}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* الفوتر الرسمي للموقع */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand-group">
            <img src={logoImg} alt="لوجو همة" className="footer-logo" />
            <div className="footer-brand-text">
              <span className="footer-main-phrase">نرى العالم من كل زاوية.</span>
              <span className="footer-tagline">صحافة أقرب، ومعلومات متاحة للجميع</span>
            </div>
          </div>

          <ul className="footer-links">
            <li>عن همة</li>
            <li>بيان الإتاحة</li>
            <li>سياسة الخصوصية</li>
            <li>تواصل معنا</li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">2026 همة — صوتك جزء من الحكاية</p>
          <p className="footer-note">المواد المعروضة تصلح تدريباً لأغراض التصميم</p>
        </div>
      </footer>
    </div>
  );
}

export default App;