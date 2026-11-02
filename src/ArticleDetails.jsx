import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import mainPic from './assets/pic1.jpeg';
import pic2 from './assets/pic2.jpeg';
import signVideoFile from './assets/sign-video.mp4'; // ملف الفيديو الخاص بلغة الإشارة الموجود على جهازك

export default function ArticleDetails() {
  // حالة للتحكم في ظهور أو إغلاق الـ Popup الخاص بالفيديو
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // دالة موحدة لقراءة المقال بالكامل بصوت عربي
  const speakArticle = () => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        return;
      }

      const fullText = `
        مدن تتسع لخطواتنا جميعا. 
        من الرصيف إلى الحديقة، لا تقاس جودة المدينة بما تبنيه فقط، بل بمن يستطيع أن يعيش فيها بحرية. رحلة في معنى الإتاحة، كما يرويها أصحاب التجربة.
        حين نبدأ التفكير في تصميم مدننا، غالبًا ما نضع المعايير الهندسية التقليدية في المقام الأول، متجاهلين أن البنية التحتية الحقيقية تقاس بمدى قدرة كل فرد في المجتمع على ارتياد الشوارع والمباني باستقلالية تامة ودون عوائق.
        التصميم الشامل ليس مجرد منحدر جانبي أو إشارة صوتية للمرور، بل هو فلسفة حياة متكاملة تعيد صياغة العلاقة بين الإنسان والمكان.
      `;

      const utterance = new SpeechSynthesisUtterance(fullText);
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

  useEffect(() => {
    const handleFirstInteraction = () => {
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    return () => {
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

      {/* نافذة الفيديو المنبثقة (Popup Modal) */}
      {isPlayingVideo && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '850px',
            backgroundColor: '#000',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            {/* زر الإغلاق (X) */}
            <button 
              onClick={() => setIsPlayingVideo(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              ✕
            </button>

            {/* عرض الفيديو */}
            <video 
              src={signVideoFile} 
              controls 
              autoPlay 
              style={{ width: '100%', maxHeight: '75vh', display: 'block', objectFit: 'contain' }} 
            />
          </div>
        </div>
      )}

      {/* الحاوية البيضاء الرئيسية */}
      <main className="article-details-main" style={{ width: '100%', padding: '30px 3%', boxSizing: 'border-box' }}>
        <div className="article-intro-card" style={{ 
          background: '#ffffff', 
          borderRadius: '24px', 
          padding: '50px 60px', 
          width: '100%', 
          boxSizing: 'border-box',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          maxWidth: '1440px',
          margin: '0 auto'
        }}>
          
          {/* رأس الصفحة ومسار التنقل */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '13px', color: '#888' }}>تقرير تحريري · نموذج بحثي</span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '13px', color: '#888' }}>الرئيسية / سياسة / المدن الشاملة</span>
              <div style={{ color: '#d35400', fontWeight: 'bold', fontSize: '14px', marginTop: '4px' }}>ملف خاص / المدن الشاملة</div>
            </div>
          </div>

          {/* العنوان الرئيسي الكبير */}
          <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#111', margin: '10px 0 20px 0', lineHeight: '1.2' }}>
            مدنٌ تتسع لخطواتنا جميعًا.
          </h1>

          {/* الوصف التمهيدي */}
          <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.8', marginBottom: '30px' }}>
            من الرصيف إلى الحديقة، لا تقاس جودة المدينة بما تبنيه فقط، بل بمن يستطيع أن يعيش فيها بحرية. رحلة في معنى الإتاحة، كما يرويها أصحاب التجربة.
          </p>

          {/* شريط معلومات الكاتب وأزرار التفاعل */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea', padding: '18px 0', marginBottom: '35px', flexWrap: 'wrap', gap: '15px' }}>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={speakArticle}
                style={{ background: '#111', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500' }}
              >
                خبر مسموع
                <PremiumSpeakerIcon />
              </button>

             
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ margin: 0, fontSize: '16px', color: '#222' }}>ليان منصور</h4>
                <span style={{ fontSize: '13px', color: '#777' }}>تحرير الشؤون المجتمعية</span>
              </div>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#fae5d3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#d35400' }}>
                ل
              </div>
            </div>

          </div>

          {/* الصورة الرئيسية للخبر ثابته في مكانها */}
          <div className="article-hero-image" style={{ width: '100%', height: '500px', borderRadius: '16px', overflow: 'hidden', marginBottom: '50px' }}>
            <img src={mainPic} alt="مدن تتسع لخطواتنا جميعا" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* محتوى المقال والكارد الجانبية */}
          <div className="article-content-grid" style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: '50px',
            alignItems: 'start'
          }}>
            
            {/* محتوى المقال والنصوص بالكامل على اليمين */}
            <div className="article-copy" style={{ fontSize: '18px', color: '#333', lineHeight: '2.2' }}>
              
              <p style={{ marginBottom: '25px' }}>
                حين نبدأ التفكير في تصميم مدننا، غالبًا ما نضع المعايير الهندسية التقليدية في المقام الأول، متجاهلين أن البنية التحتية الحقيقية تقاس بمدى قدرة كل فرد في المجتمع على ارتياد الشوارع والمباني باستقلالية تامة ودون عوائق.
              </p>
              
              <p style={{ marginBottom: '25px' }}>
                التصميم الشامل ليس مجرد منحدر جانبي أو إشارة صوتية للمرور، بل هو فلسفة حياة متكاملة تعيد صياغة العلاقة بين الإنسان والمكان، وتجعل من الرصيف والممر العام مساحات ترحيبية تنبض بالحياة لكل القدرات بلا استثناء.
              </p>

              <p style={{ marginBottom: '25px' }}>
                تبدأ الحكاية بموعد بسيط: لقاء صديقة في ساحة الحي؛ لكنّ الطريق قد يحمل أسئلة لا تخطر لمن يعبره بسهولة. هل الرصيف متصل؟ هل المدخل واضح؟ وهل يمكن الوصول إلى المقعد من دون طلب مساعدة؟ في مدينة شاملة، لا تصبح هذه الأسئلة مشروعًا شخصيًا يُعاد التخطيط له كل صباح.
              </p>

              <h2 id="level" style={{ fontSize: '32px', fontWeight: '800', color: '#111', margin: '40px 0 20px 0' }}>
                المدينة من مستوى الرصيف
              </h2>

              <p style={{ marginBottom: '25px' }}>
                في المشهد التخيلي الذي نتتبعه هنا، نختار نور، وهي مستخدمة كرسي متحرك، طريقًا أطول إلى الحديقة لأنه أكثر استواءً. لا تريد رحلة استثنائية؛ تريد الوصول في وقت مناسب، واختيار مكان جلوسها، والعودة حين تشاء. ما يبدو تفصيليًا صغيرًا في مخطط شارع، قد يحدد مساحة يوم كامل.
              </p>

              {/* علبة الاقتباس المميزة */}
              <div style={{ background: '#fdfbf7', borderRight: '4px solid #d35400', padding: '30px 40px', borderRadius: '12px', margin: '40px 0', position: 'relative' }}>
                <div style={{ fontSize: '40px', color: '#d35400', lineHeight: 1, marginBottom: '10px' }}>“</div>
                <p style={{ fontSize: '24px', fontWeight: '800', color: '#111', lineHeight: '1.5', margin: 0 }}>
                  «لا أريد طريقًا خاصًّا بي؛ أريد أن يكون الطريق لنا جميعًا.»
                </p>
                <span style={{ display: 'block', marginTop: '15px', fontSize: '14px', color: '#777' }}>نور — شخصية توضيحية في هذا الملف</span>
              </div>

              <p style={{ marginBottom: '25px' }}>
                لهذا، لا يكفي أن نرى منحدرًا عند بوابة مبنى منصف المكان. تبدأ التجربة من البيت، وتمر بوسيلة النقل ونقطة العبور واللافته، وتنتهي بخدمة يمكن استخدامها فعلًا. وتشمل الإتاحة أيضًا معلومات مفهومة، وإشارات بصريّة وصوتية، ومساحات أهدأ لمن يحتاج إليها.
              </p>

              <h2 id="series" style={{ fontSize: '32px', fontWeight: '800', color: '#111', margin: '50px 0 20px 0' }}>
                سلسلة وصول لا تنقطع
              </h2>

              <p style={{ marginBottom: '25px' }}>
                تعمل الإتاحة كسلسلة: انقطاع حلقة واحدة قد يوقف الرحلة كلّها. فالحافلة المهيأة لا تحلّ مشكلة محطة يصعب بلوغها، والمصعد لا يكفي إذا كانت أزراره غير مقروءة، والموقع الرقمي لا يخخدم الجميع إذا كان التسجيل فيه يتطلب خطوة لا يدعمها قارئ الشاشة.
              </p>

              <p style={{ marginBottom: '35px' }}>
                التصميم الشامل ينظر إلى هذه التفاصيل معًا منذ البداية. وهو يفيد أشخاصًا باحتياجات وتجارب مختلفة: مستخدمي الكراسي المتحركة، والمكفوفين وضعاف البصر، والصم وضعاف السمع، وكبار السن، ومن يرافق طفلاً. ليست الغاية طريقًا واحدًا إلزاميًا، بل خيارات واضحة تحترم الاستقلالية.
              </p>

              <h2 id="experience" style={{ fontSize: '32px', fontWeight: '800', color: '#111', margin: '50px 0 20px 0' }}>
                أصحاب التجربة أولاً
              </h2>

              <p style={{ marginBottom: '25px' }}>
                في ورشة حي افتراضية، يضع السكان ملاحظاتهم على خريطة مشتركة. تشير مشاركة إلى تقاطع تفتقر إشاراته التنبيه الصوتّي، ويشرح آخر لماذا تربكه لافته مزدحمة. هذه المعرفة اليومية ليست ملحقًا بالرأي الفني؛ إنها جزء من تعريف المشكلة واختبار الحلّ.
              </p>

              <p style={{ marginBottom: '25px' }}>
                المشاركة الحقيقية تعني دعوة الأشخاص ذوي الإعاقة مبكرًا، وتوفير صيغ ميسرة للمعلومات، ووقت كافٍ لإبداء الرأي. كما تعني العودة إليهم بعد التنفيذ: هل أصبح المكان أسهل استخدامًا؟ وما الذي ما زال يعطل التجربة؟ لا توجد فئة واحدة تتحدث باسم الجميع، ولا تجربة تختصر كل الاحتياجات.
              </p>

              <h2 id="idea" style={{ fontSize: '32px', fontWeight: '800', color: '#111', margin: '50px 0 20px 0' }}>
                من الفكرة إلى المساءلة
              </h2>

              <p style={{ marginBottom: '25px' }}>
                يمكن أن يبدأ التغيير بسؤال محدد وقابل للمتابعة: أين ينقطع المسار؟ ومن الجهة المسؤولة عن صيانته؟ وكيف تبلغ الملاحظة بطريقة متاحة؟ توثيق العائق، من دون تصوير الأشخاص أو كشف بياناتهم، يساعد في تحويل الانطباع إلى وصف يمكن مراجعته ومناقشته.
              </p>

              <p style={{ marginBottom: '35px' }}>
                المدينة التي تتسع لنا ليست وعدًا مثاليًا، بل التزام مستمر بالاستماع والتجربة والصيانة. وحين نستطيع الذهاب إلى الساحة لأننا نرغب في اللقاء، لا لأننا نجحنا في تجاوز اختبار، تصبح المساحة العامة بحقّ.
              </p>

            </div>

            {/* الكارد الجانبية المنفصلة على الشمال (مع إضافة كارد الإعلان في نهايتها) */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '20px' }}>
              
              <div style={{ background: '#fcfcfc', padding: '30px', borderRadius: '20px', border: '1px solid #eee' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111', marginBottom: '20px' }}>في هذا المقال</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <li><a href="#level" style={{ textDecoration: 'none', color: '#d35400', fontSize: '15px', fontWeight: '600' }}>المدينة من مستوى الرصيف</a></li>
                  <li><a href="#series" style={{ textDecoration: 'none', color: '#555', fontSize: '15px' }}>سلسلة وصول لا تنقطع</a></li>
                  <li><a href="#experience" style={{ textDecoration: 'none', color: '#555', fontSize: '15px' }}>أصحاب التجربة أولاً</a></li>
                  <li><a href="#idea" style={{ textDecoration: 'none', color: '#555', fontSize: '15px' }}>من الفكرة إلى المساحة</a></li>
                </ul>

                <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#777', fontSize: '14px' }}>
                  <span>حكاية لسيدي المشاركة</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                </div>

                <div style={{ marginTop: '20px', borderRadius: '12px', overflow: 'hidden' }}>
                  <img src={pic2} alt="الحكاية بلغة الإشارة" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                  <div style={{ padding: '12px 0 0 0' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#111', margin: '0 0 5px 0' }}>الحكاية بلغة الإشارة</h4>
                    <p style={{ fontSize: '12px', color: '#777', margin: 0 }}>نسخة مرئية للمقال، مع نص مكتوب يرافق المحتوى</p>
                  </div>
                </div>
              </div>

              <div style={{ background: '#fcfcfc', padding: '25px', borderRadius: '20px', border: '1px solid #eee', textAlign: 'center' }}>
                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#333', margin: '0 0 10px 0' }}>نسخة مرئية للمقال، مع نص مكتوب يرافق المحتوى</h4>
                </div>
                <button 
                  onClick={() => setIsPlayingVideo(true)}
                  style={{ background: '#111', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500', width: '100%', justifyContent: 'center' }}
                >
                  شاهد بلغة الإشارة
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 11V6a2 2 0 0 0-4 0v5"></path>
                    <path d="M14 10V4a2 2 0 0 0-4 0v6"></path>
                    <path d="M10 10.5V6a2 2 0 0 0-4 0v8"></path>
                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
                  </svg>
                </button>
              </div>

              <div style={{ background: '#fcfcfc', padding: '25px', borderRadius: '20px', border: '1px solid #eee' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#d35400' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111', margin: 0 }}>عن هذا الملف</h3>
                </div>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.7', margin: 0 }}>
                  هذه قصة تحريرية تخيلية. الشخصيات والمواقف أمثلة توضيحية، ولا تشير إلى قرارات حكومية أو وقائع بعينها.
                </p>
                <div style={{ marginTop: '15px', paddingTop: '12px', borderTop: '1px solid #eaeaea', fontSize: '12px', color: '#999', textAlign: 'left' }}>
                  نور — شخصية توضيحية في هذا الملف
                </div>
              </div>

              {/* ----------------- كارد الإعلان مع الكاردز الجانبية ----------------- */}
              <div style={{ 
                background: 'linear-gradient(135deg, #fdfbf7 0% #f5efe6 100%)', 
                border: '1px solid #e8dec9', 
                borderTop: '4px solid #d35400', 
                padding: '25px', 
                borderRadius: '20px', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
              }}>
                <span style={{ fontSize: '11px', color: '#d35400', fontWeight: 'bold', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  إعلان رعاية
                </span>
                <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#111', margin: '0 0 8px 0' }}>
                  كراسي متحركة وحلول تنقل
                </h4>
                <p style={{ fontSize: '13px', color: '#666', margin: '0 0 15px 0', lineHeight: '1.5' }}>
                  اكتشف تشكيلة واسعة من الكراسي المتحركة لتنقل آمن وحرية كاملة.
                </p>
                
                <a 
                  href="https://page-pola16.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    background: '#111', 
                    color: '#fff', 
                    textDecoration: 'none', 
                    padding: '10px 16px', 
                    borderRadius: '25px', 
                    fontSize: '13px', 
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                >
                  تصفح المنتجات
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 5 5 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
              {/* ------------------------------------------------------------------ */}

            </aside>

          </div>

        </div>
      </main>

      {/* الفوتر الموحد */}
      <Footer />
    </div>
  );
}