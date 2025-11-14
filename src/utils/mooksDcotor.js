// Mock data for the DoctorProfile component
// Mock data for the DoctorProfile component
export const mockDoctorProfileData = {
  name: "د. أحمد محمد",
  id: "DR2023001",
  gender: "ذكر",
  phone: "966511111111",
  email: "ahmed.mohamed@university.edu",
  bio: "أستاذ مساعد في هندسة البرمجيات، متخصص في الذكاء الاصطناعي وتعلم الآلة. حاصل على الدكتوراه من جامعة ستانفورد وأعمل على تطوير حلول مبتكرة في مجال تحليل البيانات.",
  academicRank: "أستاذ مساعد",
  department: "هندسة البرمجيات",
  specialization: "الذكاء الاصطناعي وتعلم الآلة",
  officeLocation: "مبنى الهندسة - الطابق الثالث - مكتب 305",
  officeHours: "الأحد، الثلاثاء، الخميس - 10:00 صباحاً إلى 12:00 ظهراً",

  // إضافة بيانات التقييم
  rating: {
    average: 4.7,
    totalReviews: 24,
    breakdown: {
      5: 18,
      4: 4,
      3: 2,
      2: 0,
      1: 0,
    },
  },
  links: [
    {
      url: "https://scholar.google.com/citations?user=example",
      icon: "fas fa-graduation-cap",
      label: "Google Scholar",
    },
    {
      url: "https://researchgate.net/profile/ahmed_mohamed",
      icon: "fas fa-flask",
      label: "ResearchGate",
    },
    {
      url: "https://linkedin.com/in/prof-ahmed-mohamed",
      icon: "fab fa-linkedin",
      label: "LinkedIn",
    },
    {
      url: "https://university.edu/professors/ahmed",
      icon: "fas fa-university",
      label: "الصفحة الجامعية",
    },
  ],

  researchInterests: [
    "تعلم الآلة",
    "الشبكات العصبية العميقة",
    "معالجة اللغات الطبيعية",
    "الرؤية الحاسوبية",
    "البيانات الضخمة",
    "الأمن السيبراني",
  ],

  currentStatus: {
    isAvailable: true,
    acceptingNewStudents: true,
    maxSupervisionCapacity: 5,
    currentSupervisionCount: 3,
    officeHours: "الأحد، الثلاثاء، الخميس - 10:00 صباحاً إلى 12:00 ظهراً",
  },

  supervisedProjects: [
    {
      title: "نظام كشف الاحتيال في المعاملات المالية باستخدام الذكاء الاصطناعي",
      students: ["محمد علي", "فاطمة أحمد"],
      status: "نشط",
      startDate: "2024-01-15",
      expectedCompletion: "2024-12-30",
    },
    {
      title: "تحليل المشاعر للنصوص العربية باستخدام التقنيات العميقة",
      students: ["خالد سعيد"],
      status: "نشط",
      startDate: "2024-03-01",
      expectedCompletion: "2024-11-15",
    },
  ],

  completedProjects: [
    {
      title: "نظام التوصية الذكي للمقررات الدراسية",
      students: ["سارة محمد", "عمر خالد"],
      status: "مكتمل",
      completionDate: "2023-12-20",
      publication: "المؤتمر الدولي لتقنيات التعليم 2023",
    },
    {
      title: "تحسين كفاءة خوارزميات التعلم العميق",
      students: ["ياسمين أحمد"],
      status: "مكتمل",
      completionDate: "2023-08-10",
      publication: "مجلة الذكاء الاصطناعي - 2023",
    },
    {
      title: "تحسين كفاءة خوارزميات التعلم العميق",
      students: ["ياسمين أحمد"],
      status: "مكتمل",
      completionDate: "2023-08-10",
      publication: "مجلة الذكاء الاصطناعي - 2023",
    },
  ],

  publications: [
    {
      title: "نهج جديد لتحسين أداء الشبكات العصبية التلافيفية",
      journal: "مجلة الذكاء الاصطناعي المتقدم",
      year: 2023,
      link: "https://example.com/paper1",
    },
    {
      title: "تحليل المشاعر للنصوص العربية باستخدام BERT",
      journal: "المؤتمر الدولي لمعالجة اللغات الطبيعية",
      year: 2022,
      link: "https://example.com/paper2",
    },
  ],

  techSkills: [
    "Python",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Keras",
    "SQL",
    "NoSQL",
    "Apache Spark",
    "Hadoop",
    "Docker",
  ],

  teachingSkills: [
    "هندسة البرمجيات",
    "الذكاء الاصطناعي",
    "تعلم الآلة",
    "قواعد البيانات",
    "هندسة البيانات",
    "الشبكات العصبية",
  ],

  softSkills: [
    "الإشراف الأكاديمي",
    "التوجيه البحثي",
    "القيادة الفكرية",
    "التواصل الفعال",
    "إدارة الفرق البحثية",
    "الكتابة الأكاديمية",
  ],

  languages: [
    { name: "العربية", level: "اللغة الأم" },
    { name: "الإنجليزية", level: "متمكن" },
    { name: "الفرنسية", level: "متوسط" },
  ],

  education: [
    {
      degree: "دكتوراه في علوم الحاسوب",
      university: "Stanford University",
      year: "2018",
      thesis:
        "Advanced Deep Learning Techniques for Natural Language Processing",
    },
    {
      degree: "ماجستير في الذكاء الاصطناعي",
      university: "MIT",
      year: "2014",
      thesis: "Machine Learning Approaches for Big Data Analytics",
    },
    {
      degree: "بكالوريوس في هندسة البرمجيات",
      university: "King Saud University",
      year: "2012",
    },
  ],

  professionalExperience: [
    {
      position: "أستاذ مساعد",
      institution: "جامعة الملك سعود",
      period: "2019 - حاضر",
      responsibilities: [
        "تدريس مقررات الذكاء الاصطناعي وتعلم الآلة",
        "الإشراف على مشاريع التخرج والرسائل العلمية",
        "إجراء البحوث العلمية ونشر الأوراق البحثية",
      ],
    },
    {
      position: "باحث ما بعد الدكتوراه",
      institution: "Google AI Research",
      period: "2018 - 2019",
      responsibilities: [
        "بحث في تطوير خوارزميات التعلم العميق",
        "المساهمة في مشاريع الذكاء الاصطناعي التطبيقي",
      ],
    },
  ],
};
