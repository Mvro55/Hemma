import React from 'react';
import logoImg from './assets/logo.png';

export default function Footer() {
  return (
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
  );
}