import React, { useState } from 'react'
import Header from '../components/Layouts/Header';
import ProjectFilters from '../components/common/ProjectFilters';
import CardsView from '../components/common/CardsView';
import { useQuery } from '@tanstack/react-query';
import { ProjectService, SearchService, StudentService } from '../services';

export const ProjectsPage = () => {
  const [filterData, setFilterData] = useState({
    search: "",
    projectType: "",
    technologies: "",
    semester: "",
    count: "",
    gender: "",
    isSearch: false
  });
  const { data: SearchData, isLoading: SearchDataloading } = useQuery({
    queryKey: ["SearchData", filterData],
    queryFn: () => SearchService.AdvanceSearch(filterData),
    enabled: filterData.isSearch,
  })
  const { data: DoctorProjects, isLoading: DoctorLoading, isError: DError } = useQuery({
    queryKey: ["DoctorProjects"],
    queryFn: () => ProjectService.getAllDoctorsProject()
  })
  const { data: StudentProjects, isLoading: StudentProjectsLoading, isError: SPError } = useQuery({
    queryKey: ["StudentProjects"],
    queryFn: () => ProjectService.getAllStudentsProjects()
  })
  const { data: StudentSearchProject, isLoading: StudentLoading, isError: SSError } = useQuery({
    queryKey: ["StudentSearchProject"],
    queryFn: () => StudentService.getStudentSearchProject()
  })
  return (
    <>


      <div className=''>
        <ProjectFilters filterData={filterData} setFilterData={setFilterData} className="my-4" />
        {filterData.isSearch ? (
          <>
            <div className='my-10'>
              <div className='flex flex-col w-full items-center my-5'>
                <h2 className="text-2xl w-fit font-bold text-center mt-10 mb-6 relative inline-block">
                  نتائج البحث
                  <span className="absolute left-0 -bottom-5 w-full h-1 bg-[var(--primary-color)] rounded"></span>
                </h2>
              </div>

              {/* ✅ Projects Results */}
              {SearchData?.projects?.length > 0 && (
                <CardsView
                  Type="Projects"
                  Cards={SearchData.projects}
                  isLoading={SearchDataloading}
                />
              )}

              {/* ✅ Supervisors Results */}
              {SearchData?.supervisors?.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-center mt-12 mb-6">المشرفون</h3>
                  <CardsView
                    Type="Profiles"
                    Cards={SearchData.supervisors}
                    isLoading={SearchDataloading}
                  />
                </>
              )}

              {/* ✅ Students Results */}
              {SearchData?.students?.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-center mt-12 mb-6">الطلاب</h3>
                  <CardsView
                    Type="Profiles"
                    Cards={SearchData.students}
                    isLoading={SearchDataloading}
                  />
                </>
              )}

              {/* 🚫 Empty Results */}
              {!SearchDataloading && SearchData?.totalCount === 0 && (
                <p className="text-center text-gray-500 mt-10 text-lg">
                  لا توجد نتائج مطابقة لبحثك.
                </p>
              )}
            </div>
          </>
        ) :
          (<>
            <div className='my-10'>

              <div className='flex flex-col w-full items-center my-5'>

                <h2 className="text-2xl w-fit  font-bold text-center mt-10 mb-6 relative inline-block">
                  المشاريع المعروضة
                  <span className=" absolute left-0 -bottom-5 w-full h-1 bg-[var(--primary-color)] rounded"></span>
                </h2>
              </div>
              {/* عرض الكروت */}
              <CardsView Type="Projects" Cards={StudentProjects} isError={SPError} isLoading={StudentProjectsLoading} />
            </div>
            <div className='my-10'>

              <div className='flex flex-col w-full items-center my-5'>

                <h2 className="text-2xl w-fit  font-bold text-center mt-10 mb-6 relative inline-block">
                  مشاريع مطروحة من قبل الدكتور
                  <span className=" absolute left-0 -bottom-5 w-full h-1 bg-[var(--primary-color)] rounded"></span>
                </h2>
              </div>
              {/* عرض الكروت */}
              <CardsView Type="Projects" Cards={DoctorProjects} isError={DError} isLoading={DoctorLoading} />
            </div>
            <div className='my-10'>

              <div className='flex flex-col w-full items-center my-5'>

                <h2 className="text-2xl w-fit  font-bold text-center mt-10 mb-6 relative inline-block">
                  طلاب يبحثون عن مشروع
                  <span className=" absolute left-0 -bottom-5 w-full h-1 bg-[var(--primary-color)] rounded"></span>
                </h2>
              </div>
              {/* عرض الكروت */}
              <CardsView Type="Profiles" Cards={StudentSearchProject} isError={SSError} isLoading={StudentLoading} />
            </div>
          </>
          )
        }

      </div>

    </>
  )
}

export default ProjectsPage;
