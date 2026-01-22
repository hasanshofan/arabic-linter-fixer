import React, { useState, useMemo } from 'react';
import './ArabicFixer.css';
import { FINAL_DICTIONARY } from './constants/dictionary';

/*
// الكلمات التي اخترتها أنت (الأولوية القصوى)
const USER_FAVORITES = [
  ["اذا", "إذا"], ["الى", "إلى"], ["اي", "أي"], ["الان", "الآن"], ["انا", "أنا"],
  ["او", "أو"], ["ان", "أن"], ["فان", "فإن"], ["بالاضافة", "بالإضافة"],["الاخر","الآخر"],["اخيرا","أخيراً"],
  ["اضافة", "إضافة"], ["ايضا", "أيضاً"], ["أيضا", "أيضاً"], ["شكرا", "شكراً"], ["كثيرا", "كثيراً"]
];

const ROOTS = [
  ["اولا", "أولاً"], ["ثانيا", "ثانياً"], ["ثالثا", "ثالثاً"], ["رابعا", "رابعاً"],
  ["افضل", "أفضل"], ["اسهل", "أسهل"], ["اكثر", "أكثر"], ["اكبر", "أكبر"],
  ["اهم", "أهم"], ["ايمان", "إيمان"], ["اخطاء", "أخطاء"], ["ارقام", "أرقام"]
];

const generateFinalDictionary = () => {
  let list = [...USER_FAVORITES];
  // السوابق العربية التي تلتصق بالكلمات
  const prefixes = ["و", "ف", "ب", "ل", "ك"];
  
  ROOTS.forEach(([wrong, right]) => {
    list.push([wrong, right]); // الكلمة مجردة
    prefixes.forEach(p => list.push([p + wrong, p + right])); // الكلمة ملتصقة (واسهل، فافضل...)
  });
  return list;
};

const FINAL_DICTIONARY = generateFinalDictionary();
*/





export function ArabicFixer() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const correctedText = useMemo(() => {
    if (!text) return "";
    let result = text.replace(/[\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000]/g, ' ');
    result = " " + result + " ";

    FINAL_DICTIONARY.forEach(([wrong, right]) => {
      const escaped = wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(\\s|^)${escaped}(\\s|$)`, 'g');
      result = result.replace(regex, ` ${right} `);
    });

    result = result.replace(/\s+([،,؛;.\!؟])/g, '$1');
    result = result.replace(/([،,؛;.\!؟])(?=[^ \s])/g, '$1 ');
    result = result.replace(/(\s|^)و\s+/g, '$1و');
    result = result.replace(/ {2,}/g, ' ');

    return result.trim();
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(correctedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>المصحح اللغوي الذكي <span className="badge">v2.0</span></h1>
        <p>أداة احترافية لتصحيح الأخطاء الشائعة وعلامات الترقيم في اللغة العربية</p>
      </header>

      <main className="main-content">
        <div className="editor-section">
          <div className="card">
            <div className="card-header">
              <span>النص الأصلي</span>
              <span className="count">{text.length} حرف</span>
            </div>
            <textarea
              placeholder="ضع نصك هنا..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="card result-card">
            <div className="card-header">
              <span>النص المصحح</span>
              <button 
                className={`copy-btn ${copied ? 'copied' : ''}`} 
                onClick={handleCopy}
                disabled={!correctedText}
              >
                {copied ? 'تم النسخ!' : 'نسخ النص'}
              </button>
            </div>
            <div className="output-area">
              {correctedText || <span className="placeholder">سيظهر النص المصحح هنا تلقائياً...</span>}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>تم التطوير بواسطة Hasan Shofan • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}