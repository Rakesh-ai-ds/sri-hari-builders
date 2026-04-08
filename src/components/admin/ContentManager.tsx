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

const CATEGORIES = [
  { id: "all", name: "All Categories", collection: "both" },
  { id: "portfolio", name: "Portfolio Showcase", collection: "portfolio" },
  { id: "basement-level", name: "Basement Level", collection: "progress" },
  { id: "lintel-level", name: "Lintel Level", collection: "progress" },
  { id: "sill-level-concrete", name: "Sill Level", collection: "progress" },
  { id: "still-level-concrete", name: "Still Level", collection: "progress" },
];

interface ContentItem {
  id: string;
  title?: string;
  description: string;
  imageUrl: string;
  section: string;
  createdAt: any;
}

export const ContentManager = ({ section: initialSection }: { section: string }) => {
  const [currentSection, setCurrentSection] = useState(initialSection);
  const [currentCollection, setCurrentCollection] = useState(
    CATEGORIES.find(c => c.id === initialSection)?.collection || "progress"
  );
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [showSectionDropdown, setShowSectionDropdown] = useState(false);
  
  // Form State
  const [formCategory, setFormCategory] = useState(CATEGORIES[1].id); // Default to Portfolio
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    const fetchPromises = [];
    if (currentCollection === "both" || currentCollection === "portfolio") {
      const q = query(collection(db, "portfolio"), orderBy("createdAt", "desc"));
      fetchPromises.push(new Promise((resolve) => onSnapshot(q, (s) => resolve(s.docs.map(doc => ({ id: doc.id, ...doc.data() }))), (e) => resolve([]))));
    }
    if (currentCollection === "both" || currentCollection === "progress") {
      const q = currentSection === "all" 
        ? query(collection(db, "progress"), orderBy("createdAt", "desc"))
        : query(collection(db, "progress"), where("section", "==", currentSection), orderBy("createdAt", "desc"));
      fetchPromises.push(new Promise((resolve) => onSnapshot(q, (s) => resolve(s.docs.map(doc => ({ id: doc.id, ...doc.data() }))), (e) => resolve([]))));
    }

    const unsubscribes: any[] = [];
    
    // For "All" view we combine both
    if (currentSection === "all") {
       const q1 = query(collection(db, "portfolio"), orderBy("createdAt", "desc"));
       const q2 = query(collection(db, "progress"), orderBy("createdAt", "desc"));
       
       const unsub1 = onSnapshot(q1, (s1) => {
         const pData = s1.docs.map(doc => ({ id: doc.id, type: 'portfolio', ...doc.data() })) as any[];
         unsubscribes.push(unsub1);
         setItems(prev => {
            const others = prev.filter(p => (p as any).type !== 'portfolio');
            return [...pData, ...others].sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)) as ContentItem[];
         });
         setLoading(false);
       });

       const unsub2 = onSnapshot(q2, (s2) => {
         const progData = s2.docs.map(doc => ({ id: doc.id, type: 'progress', ...doc.data() })) as any[];
         unsubscribes.push(unsub2);
         setItems(prev => {
            const others = prev.filter(p => (p as any).type !== 'progress');
            return [...progData, ...others].sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)) as ContentItem[];
         });
         setLoading(false);
       });

       return () => { unsub1(); unsub2(); };
    } else {
      const targetCol = CATEGORIES.find(c => c.id === currentSection)?.collection || "progress";
      const q = query(
        collection(db, targetCol),
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
    }
  }, [currentSection, currentCollection]);

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

      const targetCol = CATEGORIES.find(c => c.id === formCategory)?.collection || "progress";
      const data = {
        title,
        description,
        imageUrl,
        section: formCategory,
        updatedAt: serverTimestamp(),
      };

      if (editingItem) {
        const itemCol = (editingItem as any).type === 'portfolio' ? 'portfolio' : 'progress';
        await updateDoc(doc(db, itemCol, editingItem.id), data);
        toast.success("Content updated successfully");
      } else {
        await addDoc(collection(db, targetCol), {
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

  const handleDelete = async (item: ContentItem) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const targetCol = (item as any).type === 'portfolio' ? 'portfolio' : 'progress';
      await deleteDoc(doc(db, targetCol, item.id));
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
                {CATEGORIES.find(c => c.id === currentSection)?.name || currentSection.replace(/-/g, " ")}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-gold uppercase tracking-widest text-[10px] font-bold">Select Active Category</span>
                <ChevronDown size={14} className={`text-gold transition-transform ${showSectionDropdown ? "rotate-180" : ""}`} />
              </div>
            </div>
          </button>

          {/* Master Category Dropdown */}
          {showSectionDropdown && (
            <div className="absolute top-full left-0 mt-4 w-72 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-charcoal/5 overflow-hidden z-[100]">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCurrentSection(cat.id);
                    setCurrentCollection(cat.collection);
                    setShowSectionDropdown(false);
                  }}
                  className={`w-full px-6 py-4 text-left text-[10px] uppercase tracking-widest font-bold transition-all border-b border-charcoal/5 last:border-0 flex items-center justify-between
                    ${currentSection === cat.id ? "bg-gold text-charcoal" : "text-charcoal/60 hover:bg-charcoal/5 hover:text-charcoal"}`}
                >
                  {cat.name}
                  {currentSection === cat.id && <div className="w-1.5 h-1.5 rounded-full bg-charcoal animate-pulse" />}
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
                    onClick={() => handleDelete(item)}
                    className="p-3 bg-white/90 backdrop-blur-md text-red-500 rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Content Zone - 100% Text Visibility (Clean view) */}
              <div className="p-8 flex-1 flex flex-col items-start bg-charcoal/[0.02]">
                <div className="space-y-4 w-full text-left">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-gold" />
                    <span className="text-gold uppercase tracking-[0.3em] text-[8px] font-bold">
                      {CATEGORIES.find(c => c.id === item.section)?.name || item.section}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif text-charcoal leading-tight capitalize">
                    {item.title || "Update"}
                  </h3>
                  <p className="text-charcoal/60 text-xs leading-relaxed italic border-l-2 border-gold/10 pl-4 py-1">
                    "{item.description}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal / Sidepanel */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-md bg-charcoal/40">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative flex flex-col max-h-[95vh] md:max-h-[90vh] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gold z-10" />
            
            {/* Modal Header - Fixed */}
            <div className="px-8 py-6 border-b border-charcoal/5 flex justify-between items-center bg-white z-10">
              <h3 className="text-xl md:text-2xl font-serif text-charcoal">
                {editingItem ? "Edit Progress Update" : "Add New Update"}
              </h3>
              <button onClick={resetForm} className="p-2 hover:bg-charcoal/5 rounded-full transition-colors">
                <X size={24} className="text-charcoal/40" />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar">
              <form id="update-form" onSubmit={handleSubmit} className="space-y-6">
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
                  <label className="text-xs font-bold text-charcoal/40 uppercase tracking-widest block">Target Category</label>
                  <select 
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-charcoal/5 border border-charcoal/10 rounded-xl py-3 px-4 text-charcoal focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
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
              </form>
            </div>

            {/* Modal Footer - Fixed */}
            <div className="px-8 py-6 border-t border-charcoal/5 bg-charcoal/[0.02] flex gap-4">
              <button 
                type="button" 
                onClick={resetForm}
                className="flex-1 py-4 border border-charcoal/10 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                form="update-form"
                disabled={uploading}
                className="flex-[2] py-4 bg-gold text-charcoal rounded-xl text-[10px] uppercase tracking-widest font-bold hover:shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-3 disabled:opacity-50 transition-all"
              >
                {uploading ? <Loader2 className="animate-spin" size={18} /> : (editingItem ? "Update Progress" : "Publish Progress")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
