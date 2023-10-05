import React from 'react'

interface CardProps extends React.ComponentPropsWithRef<"div"> {
    title?: string;
    children: React.ReactNode;
}

export default function Card({ title, children, className }: CardProps) {
    return (
        <div className={`flex flex-col bg-white rounded-lg h-fit p-4 md:p-6 gap-4 ${className}`}>
            {title ? <h5 className="text-xl font-medium">{title}</h5> : null}
            {children}
        </div>
    )
}
