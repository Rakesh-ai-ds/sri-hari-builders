"use client";

import React, { useState, useEffect } from "react";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
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
import { ChevronDown } from "lucide-react";

const STAGES = [
  { id: "basement-level", name: "Basement Level" },
  { id: "lintel-level", name: "Lintel Level" },
  { id: "sill-level-concrete", name: "Sill Level" },
  { id: "still-level-concrete", name: "Still Level" },
];

interface ContentItem {
  id: string;
  title?: string;
  description: string;
  imageUrl: string;
  section: string;
  createdAt: any;
}

export const ContentManager = ({ section: initialSection, collectionName = "progress" }: { section: string, collectionName?: string }) => {
  const [currentSection, setCurrentSection] = useState(initialSection);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [showSectionDropdown, setShowSectionDropdown] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, collectionName),
      where("section", "==", currentSection),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ContentItem[];
      setItems(data);
      setLoading(false);
    }, (error: any) => {
      console.error("Error fetching items:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentSection, collectionName]);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!isModalOpen) return;
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const blob = items[i].getAsFile();
            if (blob) {
              const file = new File([blob], "pasted-image.png", { type: blob.type });
              setImage(file);
              setPreview(URL.createObjectURL(file));
              toast.success("Image pasted from clipboard");
            }
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [isModalOpen]);

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
        section: currentSection,
        updatedAt: serverTimestamp(),
      };

      if (editingItem) {
        await updateDoc(doc(db, collectionName, editingItem.id), data);
        toast.success("Content updated successfully");
      } else {
        await addDoc(collection(db, collectionName), {
          ...data,
          createdAt: serverTimestamp(),
        });
        toast.success("Content added successfully");
      }

      resetForm();
    } catch (error) {
      toast.error("Failed to save content");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      toast.success("Deleted successfully");
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="relative">
          <button 
            onClick={() => setShowSectionDropdown(!showSectionDropdown)}
            className="flex items-center gap-4 group"
          >
            <div className="flex flex-col items-start leading-none">
              <h2 className="text-3xl md:text-5xl font-serif text-charcoal capitalize">
                {collectionName === "portfolio" ? "Portfolio Showcase" : currentSection.replace(/-/g, " ")}
              </h2>
              {collectionName === "progress" && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-gold uppercase tracking-widest text-[10px] font-bold">Select Active Stage</span>
                  <ChevronDown size={14} className={`text-gold transition-transform ${showSectionDropdown ? "rotate-180" : ""}`} />
                </div>
              )}
            </div>
          </button>

          {/* Section Dropdown */}
          {collectionName === "progress" && showSectionDropdown && (
            <div className="absolute top-full left-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl border border-charcoal/5 overflow-hidden z-[60]">
              {STAGES.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => {
                    setCurrentSection(stage.id);
                    setShowSectionDropdown(false);
                  }}
                  className={`w-full px-6 py-4 text-left text-xs uppercase tracking-widest font-bold transition-colors border-b border-charcoal/5 last:border-0
                    ${currentSection === stage.id ? "bg-gold text-charcoal" : "text-charcoal/60 hover:bg-charcoal/5 hover:text-charcoal"}`}
                >
                  {stage.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gold text-charcoal px-8 py-4 rounded-2xl flex items-center gap-2 font-bold uppercase tracking-widest text-xs hover:bg-charcoal hover:text-white transition-all shadow-xl shadow-gold/20"
        >
          <Plus size={18} /> {editingItem ? "Edit Entry" : "Add New Update"}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col bg-white rounded-[32px] overflow-hidden shadow-xl border border-charcoal/5 group transition-all duration-500 hover:shadow-2xl hover:border-gold/20">
              {/* Image Zone - High Precision Preview */}
              <div className="relative h-60 w-full overflow-hidden">
                <Image src={item.imageUrl} alt={item.title || "Progress"} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-transparent transition-colors" />
                
                {/* Admin Actions - Sleek Floating Controls */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform translate-y-0 md:-translate-y-2 md:group-hover:translate-y-0">
                  <button 
                    onClick={() => openEdit(item)}
                    className="p-3 bg-white/90 backdrop-blur-md text-charcoal rounded-xl shadow-lg hover:bg-gold hover:text-white transition-all transform hover:scale-110"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-3 bg-white/90 backdrop-blur-md text-red-500 rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Content Zone - 100% Text Visibility */}
              <div className="p-8 flex-1 flex flex-col justify-between bg-charcoal/[0.02]">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-gold" />
                    <span className="text-gold uppercase tracking-[0.3em] text-[8px] font-bold">Verified entry</span>
                  </div>
                  <h3 className="text-xl font-serif text-charcoal leading-tight capitalize">
                    {item.title || "Construction Update"}
                  </h3>
                  <p className="text-charcoal/60 text-xs leading-relaxed italic border-l-2 border-gold/10 pl-4 py-1">
                    "{item.description}"
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-charcoal/5 flex justify-between items-center text-[8px] uppercase font-bold tracking-[0.2em] text-charcoal/30">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    SHB Official Record
                  </span>
                  <span>{new Date().toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
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
                        {editingItem?.createdAt ? new Date(editingItem.createdAt.seconds * 1000).toLocaleDateString(undefined, {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        }) : "Processing..."}
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
