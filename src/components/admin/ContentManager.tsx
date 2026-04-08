"use client";

import React, { useState, useEffect } from "react";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  deleteDoc, 
  doc, 
  updateDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon, X } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

interface ContentItem {
  id: string;
  title?: string;
  description: string;
  imageUrl: string;
  section: string;
  createdAt: any;
}

export const ContentManager = ({ section }: { section: string }) => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [section]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "progress"),
        where("section", "==", section),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ContentItem[];
      setItems(data);
    } catch (error: any) {
      console.error("Error fetching items:", error);
      if (error.code === "failed-precondition") {
        toast.error("Firestore Index needed! Check browser console for the link.", { duration: 6000 });
      } else {
        toast.error("Failed to load content");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return toast.error("Description is mandatory");
    if (!image && !editingItem) return toast.error("Please upload an image");

    setUploading(true);
    try {
      let imageUrl = editingItem?.imageUrl || "";
      if (image) {
        imageUrl = await uploadToCloudinary(image);
      }

      const data = {
        title,
        description,
        imageUrl,
        section,
        updatedAt: serverTimestamp(),
      };

      if (editingItem) {
        await updateDoc(doc(db, "progress", editingItem.id), data);
        toast.success("Content updated successfully");
      } else {
        await addDoc(collection(db, "progress"), {
          ...data,
          createdAt: serverTimestamp(),
        });
        toast.success("Content added successfully");
      }

      resetForm();
      fetchItems();
    } catch (error) {
      toast.error("Failed to save content");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteDoc(doc(db, "progress", id));
      toast.success("Deleted successfully");
      fetchItems();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const openEdit = (item: ContentItem) => {
    setEditingItem(item);
    setTitle(item.title || "");
    setDescription(item.description);
    setPreview(item.imageUrl);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setPreview(null);
    setEditingItem(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif text-charcoal capitalize">{section.replace("-", " ")} Progress</h2>
          <p className="text-charcoal/40 text-xs uppercase tracking-widest font-bold mt-2">Manage updates for this stage</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gold text-charcoal px-6 py-3 rounded-xl flex items-center gap-2 font-bold uppercase tracking-widest text-xs hover:bg-gold/80 transition-all shadow-lg shadow-gold/20"
        >
          <Plus size={18} /> Add New Update
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin text-gold" size={48} />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white/50 border-2 border-dashed border-charcoal/10 rounded-3xl py-24 text-center">
          <p className="text-charcoal/40 uppercase tracking-widest text-xs font-bold font-serif italic text-lg">No updates found for this section yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-charcoal/5 group transition-all hover:shadow-2xl hover:-translate-y-1">
              <div className="relative h-64">
                <Image src={item.imageUrl} alt={item.title || "Progress"} fill className="object-cover" />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => openEdit(item)}
                    className="p-3 bg-white text-charcoal rounded-xl shadow-lg hover:bg-gold hover:text-white transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-3 bg-white text-red-500 rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-serif text-charcoal mb-4 capitalize">{item.title || "Construction Update"}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-3">{item.description}</p>
                <div className="mt-6 pt-6 border-t border-charcoal/5 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-charcoal/30">
                  <span>SHB Official</span>
                  <span>{new Date(item.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal / Sidepanel */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-charcoal/40">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 left-0 w-full h-2 bg-gold" />
            <div className="p-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-serif text-charcoal">
                  {editingItem ? "Edit Progress Update" : "Add New Update"}
                </h3>
                <button onClick={resetForm} className="p-2 hover:bg-charcoal/5 rounded-full transition-colors">
                  <X size={24} className="text-charcoal/40" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div 
                  className="relative h-64 border-2 border-dashed border-charcoal/10 rounded-2xl flex flex-col items-center justify-center bg-charcoal/5 overflow-hidden group cursor-pointer"
                  onClick={() => document.getElementById("img-upload")?.click()}
                >
                  {preview ? (
                    <>
                      <Image src={preview} alt="Preview" fill className="object-cover" />
                      <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs uppercase tracking-widest font-bold transition-opacity">
                        Change Image
                      </div>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="text-charcoal/20 mb-4" size={48} />
                      <p className="text-charcoal/40 uppercase tracking-widest text-[10px] font-bold">Recommended: 1200x800px</p>
                    </>
                  )}
                  <input id="img-upload" type="file" hidden accept="image/*" onChange={handleImageChange} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-charcoal/40 uppercase tracking-widest block">Update Title (Optional)</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-charcoal/5 border border-charcoal/10 rounded-xl py-3 px-4 text-charcoal focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-charcoal/40 uppercase tracking-widest block">Description (Mandatory)</label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-charcoal/5 border border-charcoal/10 rounded-xl py-3 px-4 text-charcoal focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Describe the current progress at this stage..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={resetForm}
                    className="flex-1 py-4 border border-charcoal/10 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-charcoal/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={uploading}
                    className="flex-[2] py-4 bg-gold text-charcoal rounded-xl text-xs uppercase tracking-widest font-bold hover:shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {uploading ? <Loader2 className="animate-spin" size={18} /> : (editingItem ? "Update Progress" : "Publish Progress")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
