import Image from "next/image"

export default function page() {
    return (
        <main>
            <div className="relative">
                <div className="absolute inset-0 gradient-fade-both z-20 h-[80vh]"></div>
                <Image src="/assets/YWC18.png" alt="image for background" width={1000} height={500} className="w-full object-cover h-[80vh]" />
                <div className="absolute bottom-0 inset-x-0 flex flex-col mx-20 text-white z-30 h-[20vh]">
                    <p className="text-5xl">บรรยากาศของค่าย YWC 18</p>
                </div>
            </div>
            <div className="bg-[#0B0F0F] min-h-screen text-white px-20">
                รายละเอียดของค่าย YWC 18
            </div>
        </main>
    )
}