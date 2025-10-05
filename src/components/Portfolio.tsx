import React, { useState, useEffect } from "react";
import { useProjects } from "@/hooks/useProjects";
import { PortfolioModal } from "@/components/PortfolioModal";

export const Portfolio: React.FC = () => {
  const { projects } = useProjects();
  const [modalProject, setModalProject] = useState<any>(null);
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});

  const longVideos = projects.filter((p) => p.category === "long");
  const shortVideos = projects.filter((p) => p.category === "short");

  // ✅ Vimeo Thumbnail Fetcher
  const getVimeoThumbnail = async (url: string) => {
    try {
      const oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`;
      const res = await fetch(oembedUrl);
      const data = await res.json();
      return data.thumbnail_url || "";
    } catch {
      return "";
    }
  };

  // ✅ YouTube + Vimeo Thumbnail Handler
  const getAutoThumbnail = async (url: string) => {
    if (!url) return "";

    if (url.includes("youtu")) {
      const id = url.includes("youtu.be")
        ? url.split("youtu.be/")[1]?.split("?")[0]
        : url.split("v=")[1]?.split("&")[0];
      return id ? `https://img.youtube.com/vi/${id}/sddefault.jpg` : "";
    }

    if (url.includes("vimeo")) {
      return await getVimeoThumbnail(url);
    }

    return "";
  };

  // ✅ Load thumbnails only once
  useEffect(() => {
    const load = async () => {
      const all = [...longVideos, ...shortVideos];
      const map: Record<string, string> = {};

      for (const p of all) {
        const thumb = await getAutoThumbnail(p.videoUrl);
        map[p.id] = thumb || p.thumbnail || "/placeholder.jpg";
      }

      setThumbnails(map);
    };

    load();
  }, [projects]);

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-blue-400">🎬 My Portfolio</h2>

        {/* 🟦 Long Videos */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold mb-6 text-blue-300">Long Videos</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {longVideos.map((project) => (
              <div
                key={project.id}
                className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-400/30 transition-all cursor-pointer"
                onClick={() => setModalProject(project)}
              >
                <div className="relative overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={thumbnails[project.id] || project.thumbnail || "/placeholder.jpg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-blue-300">{project.title}</h4>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🟪 Short Videos */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-blue-300">Short Videos</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shortVideos.map((project) => (
              <div
                key={project.id}
                className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-400/30 transition-all cursor-pointer"
                onClick={() => setModalProject(project)}
              >
                <div className="relative overflow-hidden bg-black" style={{ aspectRatio: "9/16" }}>
                  <img
                    src={thumbnails[project.id] || project.thumbnail || "/placeholder.jpg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-semibold text-blue-300">{project.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalProject && (
        <PortfolioModal project={modalProject} onClose={() => setModalProject(null)} />
      )}
    </section>
  );
};
