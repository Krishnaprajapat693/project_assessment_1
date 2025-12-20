import React from 'react'

const Footer = () => {
  return (
    <>
        <footer className="bg-slate-900 text-white px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">© 2025 Real Trust. All Rights Reserved</p>
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-blue-500">🏠</span>
            <span>Real Trust</span>
          </div>
          <div className="flex gap-4 text-sm">
            <span>🌐</span>
            <span>📘</span>
            <span>🐦</span>
            <span>📸</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
