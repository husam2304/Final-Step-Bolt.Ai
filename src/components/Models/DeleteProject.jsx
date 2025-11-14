import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { ProjectService } from "./../../services";
import { toast } from "react-toastify";

export function DeleteProject({ projectId, onClose, projectTitle }) {
  const [open, setOpen] = useState(true);

  const deleteProject = useMutation({
    mutationFn: async () => {
      await ProjectService.DeleteProject(projectId);
    },
    onSuccess: () => {
      toast.success("تم حذف المشروع بنجاح");
      setOpen(false);
      if (onClose) onClose();
    },
    onError: (error) => {
      toast.error(`حدث خطأ أثناء حذف المشروع: ${error.message}`);
    },
  });

  // Handle close with proper cleanup
  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  // Handle delete with error boundary
  const handleDelete = () => {
    try {
      deleteProject.mutate();
    } catch (error) {
      console.error("Error in handleDelete:", error);
      toast.error("حدث خطأ غير متوقع");
    }
  };

  return (
    <div className="DeleteProject" style={{ zIndex: 1000, direction: "rtl" }}>
      <Dialog open={open} onClose={handleClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-2xl bg-[var(--modal-bg)] text-left shadow-2xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 "
            >
              {/* Header Section */}
              <div className="bg-[var(--modal-bg)] px-6 pt-6 pb-4 sm:p-8 sm:pb-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Icon */}
                  <div className="mx-auto sm:mx-0 flex size-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 border border-red-200">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-red-600"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center sm:text-right">
                    <DialogTitle
                      as="h3"
                      className="text-xl font-bold text-[var(--text-color)] mb-2"
                    >
                      حذف المشروع
                    </DialogTitle>

                    {projectTitle && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-[var(--text-color)]  bg-[var(--modal-bg)]-50 px-3 py-2 rounded-lg  inline-block">
                          {projectTitle}
                        </p>
                      </div>
                    )}

                    <div className="mt-3">
                      <p className="text-base text-[var(--text-color)] leading-relaxed">
                        هل أنت متأكد من رغبتك في حذف هذا المشروع؟
                        <span className="block mt-1 text-red-600 font-medium">
                          لا يمكنك التراجع عن هذا الإجراء.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-[var(--modal-bg)] px-6 py-4 sm:flex sm:flex-row-reverse sm:px-8 gap-3 rounded-b-2xl ">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteProject.isPending}
                  className="inline-flex w-full justify-center items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-xs hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100 sm:ml-3 sm:w-auto cursor-pointer border border-red-700"
                >
                  {deleteProject.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      جاري الحذف...
                    </>
                  ) : (
                    <>
                      <ExclamationTriangleIcon className="size-5" />
                      نعم، احذف المشروع
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  disabled={deleteProject.isPending}
                  className="mt-3 inline-flex w-full justify-center rounded-xl bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-xs border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 sm:mt-0 sm:w-auto cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default DeleteProject;
