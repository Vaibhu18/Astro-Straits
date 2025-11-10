import { Sparkles } from 'lucide-react'
import React from 'react'

const FooterSection = () => {
    return (
        <footer className="border-t  py-10 px-6 text-center">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-5">
                    <div className="relative">
                        <img src="/logo.png" alt="" className='w-12 h-12' />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                        Astro Straits
                    </span>
                </div>
                <p className="text-gray-500 text-sm mb-5 max-w-2xl mx-auto">
                    Guided by the Stars • Powered by Advanced AI • Created with Cosmic Love
                </p>
                <p className="text-gray-500 text-[13px]">
                    © {new Date().getFullYear()} Astro Straits. All rights reserved.
                    <span className="text-purple-500 ml-2">Embrace your cosmic journey</span>
                </p>
            </div>
        </footer>
    )
}

export default FooterSection