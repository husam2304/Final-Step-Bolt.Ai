const steps = [
  {
    number: 1,
    title: "البحث واختيار الموضوع",
    description:
      "اختر موضوعًا يتوافق مع اهتماماتك، مهاراتك، وأهدافك المهنية مع مراعاة الجدوى الزمنية.",
    checklist: [
      "حدد اهتماماتك ونقاط قوتك",
      "ابحث في الاتجاهات الحالية بمجال تخصصك",
      "استشر الأساتذة والمحترفين",
      "قيم الجدوى (الوقت، الموارد، التعقيد)",
      "تأكد من أن الموضوع له نطاق كافٍ ولكن ليس واسعًا جدًا",
      "تحقق من وجود مشاريع مشابهة للاستفادة منها",
    ],
    resources: [
      { name: "جوجل سكولار", url: "https://scholar.google.com" },
      { name: "ResearchGate", url: "https://www.researchgate.net" },
      { name: "IEEE Xplore", url: "https://ieeexplore.ieee.org" },
    ],
  },
  {
    number: 2,
    title: "المراجعة الأدبية",
    description:
      "افهم الأبحاث والحلول الحالية لتحديد الفجوات التي يمكن لمشروعك معالجتها.",
    checklist: [
      "ابحث في قواعد البيانات الأكاديمية عن الأعمال ذات الصلة",
      "اقرأ 10-15 بحثًا ذا صلة على الأقل",
      "حدد فجوات البحث والفرص",
      "لخص النتائج الرئيسية والمنهجيات",
      "وثق مراجعتك الأدبية بشكل صحيح",
    ],
    resources: [
      { name: "Zotero", url: "https://www.zotero.org" },
      { name: "Connected Papers", url: "https://www.connectedpapers.com" },
      { name: "Mendeley", url: "https://www.mendeley.com" },
    ],
  },
  {
    number: 3,
    title: "تحديد المتطلبات والنطاق",
    description: "حدد المتطلبات الوظيفية وغير الوظيفية لمشروعك بوضوح.",
    checklist: [
      "حدد المتطلبات الوظيفية",
      "حدد المتطلبات غير الوظيفية (الأداء، الأمان)",
      "أنشئ قصص المستخدم أو حالات الاستخدام",
      "حدد حدود المشروع بوضوح",
      "رتب الأولويات للميزات",
    ],
    resources: [
      { name: "Miro (للعصف الذهني)", url: "https://miro.com" },
      { name: "Trello", url: "https://trello.com" },
      { name: "Jira", url: "https://www.atlassian.com/software/jira" },
    ],
  },
  {
    number: 4,
    title: "اختيار مجموعة التقنيات",
    description: "اختر التقنيات المناسبة بناءً على متطلبات مشروعك ومهاراتك.",
    checklist: [
      "ابحث في التقنيات المتاحة",
      "ضع في الاعتبار منحنى التعلم مقابل الإمكانيات",
      "تحقق من دعم المجتمع والتوثيق",
      "قيم متطلبات الترخيص",
      "اختبر توافق التقنيات",
    ],
    resources: [
      { name: "StackShare", url: "https://stackshare.io" },
      { name: "GitHub Topics", url: "https://github.com/topics" },
      { name: "freeCodeCamp (للتعلم)", url: "https://www.freecodecamp.org" },
    ],
  },
  {
    number: 5,
    title: "إنشاء خطة المشروع والجدول الزمني",
    description: "طور جدولًا زمنيًا واقعيًا مع معالم لتتبع تقدمك بشكل فعال.",
    checklist: [
      "قسّم المشروع إلى مراحل/مهام",
      "قدّر الوقت لكل مهمة",
      "حدد المعالم والمواعيد النهائية",
      "خصص وقتًا احتياطيًا للمشكلات غير المتوقعة",
      "شارك الخطة مع مشرفك",
    ],
    resources: [
      { name: "Asana", url: "https://asana.com" },
      { name: "Notion", url: "https://www.notion.so" },
      {
        name: "Microsoft Project",
        url: "https://www.microsoft.com/en-us/microsoft-365/project/project-management-software",
      },
    ],
  },
];
export default steps;
