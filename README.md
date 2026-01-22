
# Arabic Linter & Fixer 

A smart web tool built with **React** to detect and correct common Arabic spelling and linguistic errors. It focuses on Hamza placements, Tanwin Al-Nasb, and word prefixes to ensure high-quality Arabic text.

##  Features
- **Comprehensive Instant Correction:** Processes over 1,000 linguistic rules based on roots and generated variants.
- **Independent Pronouns Support:** Automatically corrects pronouns (e.g., أنا، أنت، أنتم) ensuring proper Hamza placement.
- **Smart Prefix Handling:** Advanced Regex engine that recognizes words attached to conjunctions and prepositions (e.g., وأيضاً، كأفضل، بإمكانية).
- **Punctuation Formatting:** Automatically adjusts spacing for commas, periods, and question marks, while removing redundant spaces.
- **"Anti-Ya" Correction:** Converts the common informal mistake "انتي" to the linguistically correct "أنتِ".
- **Zero Latency Performance:** Runs entirely on the client-side (browser), ensuring maximum privacy and blazing-fast processing.

##  Tech Stack
- **React.js** (Functional Components & Hooks).
- **Vite** (Next-generation frontend tooling for optimized builds).
- **CSS3** (Fully responsive layout with RTL support).
- **JavaScript ES6+** (Dynamic dictionary generation & Regex logic).

##  How It Works
The project uses a dynamic **Rules Dictionary** that expands core roots into thousands of variants by adding Arabic prefixes (و، ف، ب، ل، ك). This provides extensive coverage without the need for a massive external database or API calls.

##  Local Development

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/hasanshofan/arabic-linter-fixer.git](https://github.com/hasanshofan/arabic-linter-fixer.git)
   ```
2. **Install dependencies:**
   ```Bash
   npm install
   ```
3. **Run the development server:**
```Bash
npm run dev
```

## License
This project is open-source and available under the MIT License.


# مصحح الأخطاء اللغوية الشائعة (Arabic Linter & Fixer) 

أداة ذكية مبنية بـ **React** لتصحيح الأخطاء الإملائية واللغوية الشائعة في اللغة العربية، مع التركيز على الهمزات وتنوين النصب والسوابق اللغوية.

##  المميزات (Features)
- **تصحيح فوري وشامل:** معالجة أكثر من 1000 قاعدة لغوية (بناءً على الجذور والسوابق).
- **دعم الضمائر المنفصلة:** تصحيح تلقائي لضمائر المخاطب والمتكلم (أنا، أنت، أنتم...) لضمان سلامة التراكيب الجملية.
- **الذكاء في السوابق:** محرك معالجة متطور يتعرف على الكلمات الملتصقة بحروف العطف والجر (مثل: وأيضاً، كأفضل، بإمكانية).
- **معالجة علامات الترقيم:** ضبط آلي للمسافات قبل وبعد الفواصل، النقاط، وعلامات الاستفهام، ومنع تكرار المسافات.
- **تصحيح "أنتِ":** تحويل الكتابة الشائعة الخاطئة (انتي) إلى الكتابة الصحيحة لغوياً (أنتِ).
- **أداء Zero Latency:** يعمل بالكامل في المتصفح دون الحاجة لاتصال بالسيرفر، مما يضمن سرعة فائقة وخصوصية مطلقة للنصوص..

##  التقنيات المستخدمة
- **React.js** (Functional Components & Hooks).
- **Vite** (للحصول على أفضل أداء في بناء المشروع).
- **CSS3** (تنسيق متجاوب بالكامل مع اتجاه النص RTL).
- **JavaScript ES6+** (القاموس المولد ديناميكياً).

##  كيف يعمل؟
يستخدم المشروع مصفوفة قواعد (Dictionary) يتم توليدها ديناميكياً لتشمل الجذور اللغوية مع سوابقها، مما يوفر تغطية واسعة للأخطاء دون الحاجة لقاعدة بيانات ضخمة.

##  طريقة التشغيل محلياً
1. `npm install`
2. `npm run dev`
