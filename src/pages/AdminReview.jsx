import { useEffect, useState } from "react";
import axios from "axios";

function AdminReview() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    // جلب المشاريع حسب الفلتر الحالي
    axios
      .get(`http://localhost:4000/api/projects/status/${filter}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setProjects(res.data.data))
      .catch((err) => console.error("فشل في جلب المشاريع", err));
  }, [filter]); // كل ما الفلتر يتغير، يعمل fetch جديد

  const handleAction = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:4000/api/projects/review/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // بعد ما الحالة تتغير، ارجع هات المشاريع من جديد
      setProjects((prev) =>
        prev.map((proj) =>
          proj._id === id ? { ...proj, status } : proj
        )
      );
    } catch (err) {
      console.error("فشل في تغيير الحالة", err);
    }
  };

  // ✅ الجديد: دالة إخفاء المشروع من العرض فقط
  const handleHideProject = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/projects/hide`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        // إزالة المشروع من العرض محلياً
        setProjects((prev) => prev.filter((proj) => proj._id !== id));
        alert("تم إخفاء المشروع من العرض بنجاح");
      } else {
        alert("فشل في إخفاء المشروع");
      }
    } catch (err) {
      console.error("فشل في إخفاء المشروع", err);
      alert("فشل في إخفاء المشروع");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">مراجعة المشاريع</h1>

      {/* 🔘 الفلاتر */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-1 rounded ${
            filter === "pending"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          قيد المراجعة
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`px-4 py-1 rounded ${
            filter === "approved"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          تمت الموافقة
        </button>
        <button
          onClick={() => setFilter("rejected")}
          className={`px-4 py-1 rounded ${
            filter === "rejected"
              ? "bg-red-600 text-white"
              : "bg-gray-200"
          }`}
        >
          مرفوضة
        </button>
      </div>

      {/* ✅ عرض المشاريع */}
      {projects.length === 0 && (
        <p>
          لا توجد مشاريع ضمن "
          {filter === "pending"
            ? "قيد المراجعة"
            : filter === "approved"
            ? "الموافق عليها"
            : "المرفوضة"}
          ".
        </p>
      )}

      {projects.map((project) => (
        <div
          key={project._id}
          className="border p-4 mb-4 rounded shadow"
        >
          <h2 className="text-xl font-semibold mb-2">
            {project.name}
          </h2>
          <p>
            <strong>الوصف:</strong> {project.description}
          </p>
          <p>
            <strong>التصنيف:</strong> {project.category}
          </p>
          <p>
            <strong>المهندس:</strong>{" "}
            {project.engineerId?.name || "غير متاح"}
          </p>

          {/* ✅ صورة */}
          {project.image && (
            <div className="my-2">
              <strong>الصورة:</strong>
              <br />
              <img
                src={project.image}
                alt="Project"
                className="w-48 border"
              />
            </div>
          )}

          {/* ✅ ملف */}
          {project.file && (
            <p className="my-2">
              <strong>الملف:</strong>{" "}
              <a
                href={project.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                تحميل الملف
              </a>
            </p>
          )}

          {/* ✅ أزرار الموافقة والرفض للمشاريع المعلقة */}
          {project.status === "pending" && (
            <div className="mt-3 flex gap-3">
              <button
                onClick={() =>
                  handleAction(project._id, "approved")
                }
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                موافقة
              </button>
              <button
                onClick={() =>
                  handleAction(project._id, "rejected")
                }
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                رفض
              </button>
            </div>
          )}

          {/* ✅ الجديد: زر الحذف للمشاريع المقبولة والمرفوضة فقط */}
          {(project.status === "approved" || project.status === "rejected") && (
            <div className="mt-3">
              <button
                onClick={() => handleHideProject(project._id)}
                className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
              >
                إخفاء من العرض
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminReview;