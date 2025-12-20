
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { backendURL } from '../main';

// const Projects = () => {
//   const [projects, setProjects] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const getData = async () => {
//       setLoading(true);
//       const res = await axios.get(`${backendURL}/getprojects`);
//       if(res.data.success) {
//         if(res.data.data.length > 0) setProjects(res.data.data);
//       }
//       setLoading(false);
//       console.log(projects)
//     }
//     getData();
//   }, [])
//   return (
//     <>
//         <h2 className="text-center text-2xl font-semibold text-blue-700 mb-12">
//           {loading ? "Loading.." : "Our Projects"}
//         </h2>
//         {projects == null ? <p className='text-black'>
//           No projects to appear
//         </p> : (<div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
//           {projects.map((project, i) => (
//             <div
//               key={i}
//               className="min-w-[260px] bg-white rounded-xl shadow-sm"
//             >
//               <div className="h-40 bg-gray-200 rounded-t-xl" />
//               <div className="p-4">
//                 <h3 className="font-semibold mb-2">{project.name}</h3>
//                 <img src={project.image} alt="img" />
//                 <p>{project.description}</p>
//                 <button className="mt-2 bg-orange-500 text-white px-4 py-2 rounded text-sm">
//                   Read More
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>)}
//     </>
//   )
// }

// export default Projects

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendURL } from '../main';

const Projects = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${backendURL}/getprojects`);
        if (res.data.success && Array.isArray(res.data.data)) {
          setProjects(res.data.data);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <h2 className="text-xl font-medium text-gray-700">Loading our portfolio...</h2>
        </div>
      </div>
    );
  }

  return (
    <section id='projects' className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Our Projects</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We take pride in delivering high-impact, innovative solutions that drive real-world results. 
            Below is a curated showcase of our successfully completed projects—each one a testament to our 
            commitment to excellence, collaboration, and technical mastery.
          </p>
        </div>

        {/* Projects Grid */}
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {projects.map((project, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-100 flex flex-col"
              >
                {/* Project Image */}
                <div className="h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={project.image || "https://via.placeholder.com/400x250?text=Project+Preview"}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x250?text=No+Image";
                    }}
                  />
                </div>

                {/* Project Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-5 flex-grow line-clamp-3">
                    {project.description || "No description available."}
                  </p>
                  <button className="mt-auto w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow hover:shadow-md">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-5xl mb-4">📂</div>
            <p className="text-gray-600 text-lg">No projects available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;