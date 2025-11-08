"use client";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AdminForm({ onSuccess }: { onSuccess: () => void }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("token");
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admins`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    reset();
    onSuccess();
  };

  return (
    <div className="bg-white/10 p-6 rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-4">
        <input {...register("name")} placeholder="Nom" className="p-3 rounded bg-white/20 text-white" />
        <input {...register("email")} placeholder="Email" className="p-3 rounded bg-white/20 text-white" />
        <input {...register("department")} placeholder="Service" className="p-3 rounded bg-white/20 text-white" />
        <button type="submit" className="bg-white text-fordacGreen font-semibold py-2 rounded md:col-span-3">
          Créer un admin
        </button>
      </form>
    </div>
  );
}
