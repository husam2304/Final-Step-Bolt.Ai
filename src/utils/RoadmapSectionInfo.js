const roadmapSteps = [
  {
    number: 1,
    title: "الفكرة والعصف الذهني",
    description:
      "حدد مفهوم مشروعك، وتعرف على المشكلات التي يجب حلها، واستكشف الحلول الممكنة",
    tasks: [
      "حدد مشكلة تستحق الحل",
      "اجمع المعلومات الأساسية",
      "حدد الأهداف الرئيسية",
    ],
    tools: [
      { name: "Trello", url: "https://trello.com" },
      { name: "Miro", url: "https://miro.com" },
    ],
  },
  {
    number: 2,
    title: "تحليل المتطلبات",
    description: "وثّق المتطلبات الوظيفية وغير الوظيفية بالتفصيل",
    tasks: [
      "حدد أصحاب المصلحة والمستخدمين",
      "حدد المتطلبات الوظيفية",
      "حدد المتطلبات غير الوظيفية",
    ],
    tools: [
      { name: "Lucidchart", url: "https://lucidchart.com" },
      { name: "Draw.io", url: "https://draw.io" },
    ],
  },
  {
    number: 3,
    title: "التصميم",
    description: "أنشئ المخطط الهندسي لنظامك",
    tasks: [
      "أنشئ مخطط هيكل النظام",
      "صمم مخطط قاعدة البيانات",
      "أنشئ النماذج الأولية والتصاميم",
    ],
    tools: [
      { name: "Draw.io", url: "https://draw.io" },
      { name: "Figma", url: "https://figma.com" },
    ],
  },
  {
    number: 4,
    title: "التخطيط والإعداد",
    description: "أنشئ بيئة التطوير وأنشئ جدولاً زمنياً للمشروع",
    tasks: [
      "أنشئ بيئة التطوير",
      "ابدأ مستودع التحكم بالإصدار",
      "أنشئ جدولاً زمنياً للمشروع مع معالم",
    ],
    tools: [
      { name: "VS Code", url: "https://code.visualstudio.com" },
      { name: "Git", url: "https://git-scm.com" },
    ],
  },
  {
    number: 5,
    title: "التنفيذ",
    description: "اكتب كوداً نظيفاً وموثقاً يتبع أفضل الممارسات",
    tasks: [
      "أنشئ هيكل المشروع",
      "نفذ الوظائف الأساسية",
      "اكتب كوداً نظيفاً وموثقاً",
    ],
    tools: [
      { name: "VS Code", url: "https://code.visualstudio.com" },
      { name: "Stack Overflow", url: "https://stackoverflow.com" },
    ],
  },
  {
    number: 6,
    title: "الاختبار وضمان الجودة",
    description: "اختبر تطبيقك بدقة لتحديد وإصلاح الأخطاء",
    tasks: [
      "اكتب اختبارات الوحدة",
      "أجر اختبارات التكامل",
      "أجر اختبارات قبول المستخدم",
    ],
    tools: [
      { name: "Selenium", url: "https://selenium.dev" },
      { name: "Jest", url: "https://jestjs.io" },
    ],
  },
  {
    number: 7,
    title: "النشر",
    description: "انشر تطبيقك في بيئة الإنتاج",
    tasks: ["انشر تطبيقك في بيئة الإنتاج", "أنشئ بيئة الإنتاج", "انشر التطبيق"],
    tools: [
      { name: "Netlify", url: "https://netlify.com" },
      { name: "Heroku", url: "https://heroku.com" },
    ],
  },
  {
    number: 8,
    title: "التوثيق والعرض",
    description: "أنشئ توثيقاً شاملاً واستعد لعرض مشروعك",
    tasks: ["اكتب توثيق المستخدم", "أنشئ التوثيق التقني", "جهز شرائح العرض"],
    tools: [
      { name: "Canva", url: "https://canva.com" },
      { name: "Read the Docs", url: "https://readthedocs.org" },
    ],
  },
  {
    number: 9,
    title: "التسليم النهائي",
    description: "تأكد من أن لديك جميع المتطلبات قبل التسليم",
    tasks: ["الكود المصدري الكامل", "التوثيق التقني", "عرض المشروع"],
    tools: [
      { name: "Zotero", url: "https://zotero.org" },
      { name: "Grammarly", url: "https://grammarly.com" },
    ],
  },
];
export default roadmapSteps;
