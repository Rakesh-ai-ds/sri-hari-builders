"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ContentManager } from "@/components/admin/ContentManager";
import { Loader2 } from "lucide-react";

function DashboardContent() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section") || "basement";

  return <ContentManager section={section} />;
}

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <Suspense fallback={
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin text-gold" size={48} />
        </div>
      }>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
