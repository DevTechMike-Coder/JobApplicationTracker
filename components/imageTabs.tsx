"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ImageTabs() {
  const [activeTab, setActiveTab] = useState("organize");

  return (
    <section className="py-10 border-t border-t-gray-200">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-2 justify-center mb-9">
            <Button
              onClick={() => setActiveTab("organize")}
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab === "organize" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black"}`}
            >
              Organize Application
            </Button>
            <Button
              onClick={() => setActiveTab("hired")}
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab === "hired" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black"}`}
            >
              Get Hired
            </Button>
            <Button
              onClick={() => setActiveTab("manage")}
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab === "manage" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black"}`}
            >
              Manage Boards
            </Button>
          </div>

          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-300 shadow-2xl">
            {activeTab === "organize" && (
              <Image
                src="/heroImages/image.png"
                alt="Organize Application"
                width={1200}
                height={800}
              />
            )}

            {activeTab === "hired" && (
              <Image
                src="/heroImages/image2.png"
                alt="Get Hired"
                width={1200}
                height={800}
              />
            )}

            {activeTab === "manage" && (
              <Image
                src="/heroImages/image3.png"
                alt="Manage Boards"
                width={1200}
                height={800}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
