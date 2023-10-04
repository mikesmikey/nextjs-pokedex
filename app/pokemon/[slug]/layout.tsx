import Navbar from "@/components/Navbar"

export default function Layout({ children }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <Navbar />
        <main className="flex justify-center">{children}</main>
      </>
    )
  }