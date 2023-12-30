// import Image from 'next/image'
import React from 'react'

const Brand = () => {
    return (
        <div className="flex items-center space-x-4">
            {/* <Image className="select-none" src="/assets/favicon.png" alt="logo" width={32} height={32} /> */}
            <h1 className="text-4xl font-semibold text-blue-600 brand-font select-none">E-Commerce</h1>
        </div>
    )
}

export default Brand
