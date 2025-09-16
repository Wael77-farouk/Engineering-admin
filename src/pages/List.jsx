import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { FaTrashAlt, FaDownload } from 'react-icons/fa'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchList = async () => {
    try {
      setLoading(true)
      const response = await axios.get(backendUrl + '/api/projects/approved', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      })

      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'فشل في جلب البيانات')
    } finally {
      setLoading(false)
    }
  }

  // دالة الحذف النهائي من قاعدة البيانات
  const removeProject = async (id) => {
    try {
      if (!token) {
        toast.error('يرجى تسجيل الدخول أولاً')
        return
      }

      // تأكيد الحذف
      const confirmDelete = window.confirm('هل أنت متأكد من حذف هذا المشروع نهائياً؟')
      if (!confirmDelete) return

      const response = await axios.post(
        backendUrl + '/api/projects/delete',
        { id },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList() // إعادة تحميل القائمة
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'فشل في الحذف')
    }
  }

  useEffect(() => {
    fetchList()
  }, [token])

  return (
    <>
      <p className='mb-2'>قائمة جميع المشاريع</p>

      {loading && (
        <div className="text-center py-4">
          <p>جاري التحميل...</p>
        </div>
      )}

      <div className='flex flex-col gap-2'>
        {/* رأس الجدول */}
        <div className='hidden md:grid grid-cols-[1fr_2fr_2fr_1fr_1fr_0.5fr] items-center py-2 px-2 border bg-gray-100 text-sm font-bold'>
          <span>الصورة</span>
          <span>الاسم</span>
          <span>اسم المهندس</span>
          <span>الملف</span>
          <span>التصنيف</span>
          <span className='text-center'>حذف</span>
        </div>

        {/* المحتوى */}
        {list.length === 0 && !loading ? (
          <div className="text-center py-4">
            <p>لا توجد مشاريع.</p>
          </div>
        ) : (
          list.map((item, index) => (
            <div
              className='grid grid-cols-[1fr_2fr_2fr_1fr_1fr_0.5fr] items-center gap-2 py-2 px-2 border text-sm'
              key={index}
            >
              {/* صورة */}
              <img 
                className='w-12 h-12 object-cover rounded' 
                src={item?.image || '/placeholder-image.jpg'} 
                alt={item?.name || 'مشروع'} 
                onError={(e) => {
                  const fallback = '/placeholder-image.jpg'
                  if (!e.target.src.includes(fallback)) {
                    e.target.src = fallback
                  }
                }}
              />

              {/* الاسم */}
              <p>{item?.name || 'بدون اسم'}</p>

              {/* اسم المهندس */}
              <p>{item?.engineerName || 'غير محدد'}</p>

              {/* رابط تحميل الملف */}
              {item?.file ? (
                <a 
                  href={item.file}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 underline flex items-center gap-1 hover:text-blue-800 transition'
                  title='تحميل الملف'
                >
                  <FaDownload /> تحميل الملف
                </a>
              ) : (
                <span className='text-gray-400'>لا يوجد ملف</span>
              )}

              {/* التصنيف */}
              <p>{item?.category || 'بدون تصنيف'}</p>

              {/* حذف نهائي */}
              <button
                onClick={() => removeProject(item._id)}
                className='text-red-600 hover:text-red-800 transition text-lg flex justify-center'
                title='حذف المشروع نهائياً'
              >
                <FaTrashAlt />
              </button>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default List