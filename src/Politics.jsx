import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import mainPic5 from './assets/pic5.jpeg';
import pic6 from './assets/pic6.jpeg';
import pic7 from './assets/pic7.jpeg';
import pic8 from './assets/pic8.jpeg';
import pic9 from './assets/pic9.jpeg';

export default function Politics() {
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

  // قراءة العنوان والوصف التمهيدي تلقائياً فور تحميل الصفحة
  useEffect(() => {
    const handleFirstInteraction = () => {
      speakText("سياسة. حقوق، سياسات، مشاركة. نقرأ القرارات من زاوية أثرها في حياتنا اليومية، ونسأل: من يشارك في صنعها، ومن تتركه خارج الصورة؟");
      window.removeEventListener('click', handleFirstInteraction);
    };

    const timer = setTimeout(() => {
      speakText("سياسة. حقوق، سياسات، مشاركة. نقرأ القرارات من زاوية أثرها في حياتنا اليومية، ونسأل: من يشارك في صنعها، ومن تتركه خارج الصورة؟");
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
      <Header />

      <main className="politics-page">
        {/* رأس الصفحة بتنسيق فيجما المعكوس */}
        <div className="politics-top-section">
          <div className="politics-title-group">
            <span className="breadcrumb">الرئيسية / سياسة</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <h1 className="politics-main-title">سياسة.</h1>
              <button 
                className="arrow-icon-btn" 
                title="استمع للقسم"
                onClick={() => speakText("سياسة. حقوق، سياسات، مشاركة. نقرأ القرارات من زاوية أثرها في حياتنا اليومية، ونسأل: من يشارك في صنعها، ومن تتركه خارج الصورة؟")}
                style={{ background: '#f5f5f7', border: 'none', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#d35400' }}
              >
                <PremiumSpeakerIcon />
              </button>
            </div>
          </div>
          
          <div className="politics-desc-group">
            <p className="politics-subtitle-tags">حقوق · سياسات · مشاركة</p>
            <p className="politics-desc">
              نقرأ القرارات من زاوية أثرها في حياتنا اليومية، ونسأل: من يشارك في صنعها، ومن تتركه خارج الصورة؟
            </p>
          </div>
        </div>

        {/* الكارت الرئيسي الأول */}
        <div className="politics-card-reversed">
          <div className="politics-card-image-wrapper">
            <img src={mainPic5} alt="سياسة شاملة" />
          </div>
          <div className="politics-card-content">
            <span className="card-category">قراءة في السياسات / ملف العدد</span>
            <h2 className="card-title">لا سياسة شاملة من دون مقعد للجميع.</h2>
            <p className="card-desc">
              كيف تحول مشاركة الأشخاص ذوي الإعاقة من استشارة عابرة إلى شراكة في تصميم الخدمات؟ نفتح نقاشًا حول التمثيل والمساءلة وحق التأثير.
            </p>
            <div className="card-footer">
              <span className="author-info">هيئة التحرير · 8 دقائق قراءة</span>
              
              <button 
                className="sign-btn-dark"
                onClick={() => speakText("لا سياسة شاملة من دون مقعد للجميع. كيف تحول مشاركة الأشخاص ذوي الإعاقة من استشارة عابرة إلى شراكة في تصميم الخدمات؟ نفتح نقاشًا حول التمثيل والمساءلة وحق التأثير.")}
              >
                استمع للخبر
                <PremiumSpeakerIcon />
              </button>
            </div>
          </div>
        </div>

        {/* قسم ما وراء الخبر */}
        <section className="beyond-news-section">
          <div className="beyond-news-header">
            <h2 className="section-main-title">ما وراء الخبر</h2>
            
          </div>

          <div className="beyond-news-grid">
            {/* الكارت الأول: صورة pic7 */}
            <div className="news-sub-card">
              <div className="sub-card-image">
                <img src={pic7} alt="حين تُتاح جلسة الاستماع للجميع" />
              </div>
              <div className="sub-card-content">
                <span className="card-category">مشاركة عامة</span>
                <h3 className="card-title">حين تُتاح جلسة الاستماع للجميع</h3>
                <p className="card-desc">من الترجمة بلغة الإشارة إلى توقيت الجلسات: تفاصيل تصنع مشاركة حقيقية.</p>
                <div className="sub-card-meta">
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button className="arrow-icon-btn">←</button>
                    <button 
                      className="arrow-icon-btn" 
                      title="استمع للخبر"
                      onClick={() => speakText("حين تُتاح جلسة الاستماع للجميع. من الترجمة بلغة الإشارة إلى توقيت الجلسات: تفاصيل تصنع مشاركة حقيقية.")}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d35400' }}
                    >
                      <PremiumSpeakerIcon />
                    </button>
                  </div>
                  <span>1 نوفمبر 2026 · 5 دقائق</span>
                </div>
              </div>
            </div>

            {/* الكارت الثاني: صورة pic6 */}
            <div className="news-sub-card">
              <div className="sub-card-image">
                <img src={pic6} alt="موازنة تقرأ على مستوى الرصيف" />
              </div>
              <div className="sub-card-content">
                <span className="card-category">الحق في المدينة</span>
                <h3 className="card-title">موازنة تقرأ على مستوى الرصيف</h3>
                <p className="card-desc">أسئلة تساعدنا على تتبع نصيب الإتاحة في الإنفاق العام، بعيداً عن العناوين الواسعة.</p>
                <div className="sub-card-meta">
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button className="arrow-icon-btn">←</button>
                    <button 
                      className="arrow-icon-btn" 
                      title="استمع للخبر"
                      onClick={() => speakText("موازنة تقرأ على مستوى الرصيف. أسئلة تساعدنا على تتبع نصيب الإتاحة في الإنفاق العام، بعيداً عن العناوين الواسعة.")}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d35400' }}
                    >
                      <PremiumSpeakerIcon />
                    </button>
                  </div>
                  <span>1 نوفمبر 2026 · 5 دقائق</span>
                </div>
              </div>
            </div>

            {/* الكارت الثالث: أسئلة قبل أي قرار */}
            <div className="question-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="card-category">في دائرة النقاش</span>
                  <button 
                    className="arrow-icon-btn" 
                    title="استمع للقسم"
                    onClick={() => speakText("أسئلة قبل أي قرار. من حضر؟ هل شارك أصحاب التجربة في تحديد المشكلة؟ ما الذي تغير؟ كيف نسائل؟")}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d35400' }}
                  >
                    <PremiumSpeakerIcon />
                  </button>
                </div>
                <h3 className="card-title">أسئلة قبل أي قرار</h3>
                
                <div className="question-item">
                  <h4>من حضر؟</h4>
                  <p>هل شارك أصحاب التجربة في تحديد المشكلة، أم طلب منهم التعليق على حل جاهز؟</p>
                </div>
                
                <div className="question-item">
                  <h4>ما الذي تغيّر؟</h4>
                  <p>هل يمكن قياس أثر القرار على الوصول إلى النقل والتعليم والعمل؟</p>
                </div>
                
                <div className="question-item">
                  <h4>كيف نسائل؟</h4>
                  <p>هل توجد آليه شكوى واضحة ومتاحة، ومواعيد معلنة للاستجابة؟</p>
                </div>
              </div>
            </div>

            {/* الكارت الرابع: صورة pic8 */}
            <div className="news-sub-card">
              <div className="sub-card-image">
                <img src={pic8} alt="الإتاحة مسؤولية مشتركة" />
              </div>
              <div className="sub-card-content">
                <span className="card-category">رأي</span>
                <h3 className="card-title">الإتاحة مسؤولية مشتركة، لا استثناء</h3>
                <p className="card-desc">رأي تحريري في الانتقال من الحلول الفردية إلى حق ثابت يمكن تقييمه ومساءلته.</p>
                <div className="sub-card-meta">
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button className="arrow-icon-btn">←</button>
                    <button 
                      className="arrow-icon-btn" 
                      title="استمع للخبر"
                      onClick={() => speakText("الإتاحة مسؤولية مشتركة، لا استثناء. رأي تحريري في الانتقال من الحلول الفردية إلى حق ثابت يمكن تقييمه ومساءلته.")}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d35400' }}
                    >
                      <PremiumSpeakerIcon />
                    </button>
                  </div>
                  <span>1 نوفمبر 2026 · 4 دقائق</span>
                </div>
              </div>
            </div>

            {/* الكارت الخامس: صورة pic9 */}
            <div className="news-sub-card">
              <div className="sub-card-image">
                <img src={pic9} alt="الخدمة الإلكترونية" />
              </div>
              <div className="sub-card-content">
                <span className="card-category">خدمات رقمية</span>
                <h3 className="card-title">الخدمة الإلكترونية ليست متاحة تلقائيًا</h3>
                <p className="card-desc">لماذا نبدأ عدالة الخدمة من نموذج واضح، وقارئ شاشة، وطريق بديل للمساعدة؟</p>
                <div className="sub-card-meta">
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button className="arrow-icon-btn">←</button>
                    <button 
                      className="arrow-icon-btn" 
                      title="استمع للخبر"
                      onClick={() => speakText("الخدمة الإلكترونية ليست متاحة تلقائيًا. لماذا نبدأ عدالة الخدمة من نموذج واضح، وقارئ شاشة، وطريق بديل للمساعدة؟")}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d35400' }}
                    >
                      <PremiumSpeakerIcon />
                    </button>
                  </div>
                  <span>1 نوفمبر 2026 · 7 دقائق</span>
                </div>
              </div>
            </div>

            {/* الكارت السادس: كارت المفهوم الداكن */}
            <div className="dark-concept-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="quote-icon">”</div>
                <button 
                  className="arrow-icon-btn" 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffffff' }}
                  title="استمع للمصطلح"
                  onClick={() => speakTest("الترتيبات التيسيرية. تعديلات تستجيب لاحتياج الشخص في سياق محدد، لتتيح له مشاركة متكافئة. ليست امتيازًا، ولا بديلاً عن التصميم الشامل.")}
                >
                  <PremiumSpeakerIcon />
                </button>
              </div>
              <span className="card-category-light">مصطلح تحت المجهر</span>
              <h3 className="dark-card-title">الترتيبات التيسيرية</h3>
              <p className="dark-card-desc">
                تعديلات تستجيب لاحتياج الشخص في سياق محدد، لتتيح له مشاركة متكافئة. ليست امتيازًا، ولا بديلاً عن التصميم الشامل.
              </p>
            </div>
          </div>

          {/* أزرار الترقيم والتنقل في الأسفل */}
          <div className="pagination-wrapper">
            <button className="page-arrow-btn">←</button>
            <button className="page-num-btn active">1</button>
            <button className="page-num-btn">2</button>
            <button className="page-num-btn">3</button>
            <button className="page-arrow-btn">➔</button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}