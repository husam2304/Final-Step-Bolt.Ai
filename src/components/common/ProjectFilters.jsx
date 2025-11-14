import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import { TechnologyService } from "../../services";

const ProjectFilters = ({ className, setFilterData, filterData }) => {
    const { data: Technologies } = useQuery({
        queryKey: ["Technology"],
        queryFn: () => TechnologyService.GetTechnology(),
    });

    // تحديث البيانات في الاستيت
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterData((prev) => ({
            ...prev,
            [name]: value,
            isSearch: false, // المستخدم عدّل شيء جديد → نوقف البحث لحد ما يضغط زر البحث
        }));
    };

    // تفعيل البحث
    const handleSearch = () => {
        // Pick only the fields that are meant for searching
        const { search, projectType, technologies, semester, count, gender } = filterData;

        // Check if at least one field has a value
        if (!search.trim() && !projectType && !technologies && !semester && !count && !gender) return;

        // Activate search
        setFilterData(prev => ({
            ...prev,
            isSearch: true,
        }));
    };

    return (
        <div
            className={`${className ? className : ""
                } text-[var(--text-color)] w-full bg-[var(--bg-color)] shadow-md rounded-2xl p-6 flex flex-col gap-6 lg:flex-row-reverse lg:flex-wrap lg:items-center`}
        >
            {/* زر البحث */}
            <div className="flex justify-center lg:justify-start mt-6">
                <button
                    onClick={handleSearch}
                    className="flex items-center gap-2 bg-[var(--primary-color)] text-white px-6 py-3 rounded-full shadow-md hover:opacity-90 transition"
                >
                    <SearchIcon className="w-5 h-5" />
                    بحث
                </button>
            </div>

            {/* الحقول */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 flex-1">
                {/* حقل البحث */}
                <div className="flex flex-col flex-1">
                    <label
                        htmlFor="SearchInput"
                        className="text-sm font-medium mb-2"
                    >
                        البحث عن المشاريع
                    </label>
                    <input
                        type="text"
                        id="SearchInput"
                        name="search"
                        value={filterData.search}
                        onChange={handleChange}
                        placeholder="ابحث عن مشروع..."
                        className="flex-1 px-4 py-3 w-full border border-[var(--primary-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    />
                </div>

                {/* نوع المشروع */}
                <div className="flex flex-col">
                    <label
                        htmlFor="ProjectType"
                        className="text-sm font-medium mb-2"
                    >
                        نوع المشروع
                    </label>
                    <select
                        id="ProjectType"
                        name="projectType"
                        value={filterData.projectType}
                        onChange={handleChange}
                        className="flex-1 w-full px-4 py-3 border border-[var(--primary-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-600"
                    >
                        <option value="">اختر النوع</option>
                        <option value="students_searching">طلاب يبحثون عن مشروع</option>
                        <option value="ready_project">مشروع جاهز</option>
                        <option value="student_project">مشروع من قبل الطلاب</option>
                        <option value="doctor_project">مشروع من قبل الدكتور</option>
                    </select>
                </div>

                {/* التقنيات */}
                <div className="flex flex-col">
                    <label
                        htmlFor="TechSearch"
                        className="text-sm font-medium mb-2"
                    >
                        التقنيات المطلوبة
                    </label>
                    <select
                        id="TechSearch"
                        name="technologies"
                        value={filterData.technologies}
                        onChange={handleChange}
                        className="flex-1 w-full px-4 py-3 border border-[var(--primary-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-600"
                    >
                        <option value="">اختر التقنية</option>
                        {Technologies?.map((tech) => (
                            <option key={tech.id} value={tech.id}>
                                {tech.technologyName || tech.TechnologyName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* الفصل الدراسي */}
                <div className="flex flex-col">
                    <label
                        htmlFor="SemesterSearch"
                        className="text-sm font-medium mb-2"
                    >
                        الفصل الدراسي
                    </label>
                    <select
                        id="SemesterSearch"
                        name="semester"
                        value={filterData.semester}
                        onChange={handleChange}
                        className="flex-1 w-full px-4 py-3 border border-[var(--primary-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-600"
                    >
                        <option value="">اختر الفصل</option>
                        <option value="1">الفصل الأول</option>
                        <option value="2">الفصل الثاني</option>
                        <option value="summer">الصيفي</option>
                    </select>
                </div>

                {/* العدد المطلوب */}
                <div className="flex flex-col">
                    <label
                        htmlFor="CountSearch"
                        className="text-sm font-medium mb-2"
                    >
                        العدد المطلوب
                    </label>
                    <select
                        id="CountSearch"
                        name="count"
                        value={filterData.count}
                        onChange={handleChange}
                        className="flex-1 w-full px-4 py-3 border border-[var(--primary-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-600"
                    >
                        <option value="">اختر العدد المطلوب</option>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>

                {/* الجنس */}
                <div className="flex flex-col">
                    <label
                        htmlFor="GenderSearch"
                        className="text-sm font-medium mb-2"
                    >
                        الجنس
                    </label>
                    <select
                        id="GenderSearch"
                        name="gender"
                        value={filterData.gender}
                        onChange={handleChange}
                        className="flex-1 w-full px-4 py-3 border border-[var(--primary-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-600"
                    >
                        <option value="">اختر</option>
                        <option value="male">ذكر</option>
                        <option value="female">أنثى</option>
                        <option value="both">كلاهما</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ProjectFilters;
