// src/components/FileUploadForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

type FormData = {
admission:string;
  file: FileList;
};

const FileUploadForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append('admission', data.admission);
    formData.append('file', data.file[0]);

    try {
      const response = await axios.post('https://assignmentbackend.up.railway.app/api/assignments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Utumishi Girls Assignment Upload Portal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
            <label className='text-right'>Enter your admission number</label>
          <input type='text' id='admission' className='w-full border rounded-md py-2 px-2'
           placeholder='Enter your admission number here' {...register('admission',{
            required:'The admission number is required'
          })} />
           {errors.admission && <p className="text-sm text-red-500 mt-1">{errors.admission.message}</p>}
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Upload Assignment
          </label>
          <input
            type="file"
            id="file"
            {...register('file', { required: 'File is required' })}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.file && <p className="text-sm text-red-500 mt-1">{errors.file.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
        >
          Upload
        </button>
      </form>
        </div>
    </div>
  );
};

export default FileUploadForm;
