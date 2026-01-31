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
  const [text, setText] = useState(`انا إن قلت الان اي الإضافات افضل , بالاضافة الى جهدي شكرا لك .
اذا ما سألتك ايضا, اولا وثانيا لن تقولي. إن اكبر واسهل واهم اعمال الانسان هو عدله    , وانتاج فكره.`);
  const [copied, setCopied] = useState(false);
const correctedText = useMemo(() => {
    if (!text) return "";
    
    // 1. تنظيف المسافات الغريبة وتوحيدها
    let result = text.replace(/[\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000]/g, ' ');
    
    // 2. معالجة علامات الترقيم (إبعادها مؤقتاً لضمان مطابقة الكلمات في القاموس)
    // نضع مسافة قبل الفاصلة لضمان أن الكلمة قبلها "حرة" وتُصحح
    result = result.replace(/([،,؛;.\!؟])/g, ' $1 ');
    result = result.replaceAll(',', '،');

    // 3. إضافة مسافات وهمية للطرفين للتعامل مع بداية ونهاية النص
    result = " " + result + " ";

    // 4. تطبيق القاموس (الآن "ايضا" ستكون " ايضا " حرة وستُصحح)
    FINAL_DICTIONARY.forEach(([wrong, right]) => {
      const escaped = wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(?<=^|\\s)${escaped}(?=\\s|$)`, 'g');
      result = result.replace(regex, right);
    });

    // 5. إصلاح الواو (إزالة المسافة التي بعدها)
    result = result.replace(/(\s|^)و\s+/g, '$1و');

    // 6. إعادة ضبط علامات الترقيم (إزالة المسافة التي قبلها، وضمان مسافة بعدها)
    result = result.replace(/\s+([،,؛;.\!؟])/g, '$1');
    result = result.replace(/([،,؛;.\!؟])(?=[^ \s])/g, '$1 ');

    // 7. التنظيف النهائي للمسافات الزائدة
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
        <p>أداة بسيطة لتصحيح الأخطاء الشائعة وعلامات الترقيم في اللغة العربية</p>
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

