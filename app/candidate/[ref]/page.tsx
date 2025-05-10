import Image from "next/image"

import { DetailCandidate ,Candidate } from "@/type/ResponseAPI"

async function fetchCandidates(ref: string): Promise<DetailCandidate | undefined> {
    const res = await fetch("https://api.ywc20.ywc.in.th/homework/candidates", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-reference-id": "PG28",
        }
    })
    if (res.status !== 200) {
        throw new Error("Failed to fetch data")
    }

    const candidates = await res.json()

    for (const key in candidates) {
        if (key[0].toUpperCase() !== ref[0]){
            continue
        }
        else {
            const major = candidates[key as keyof Candidate] as Array<DetailCandidate>
            const candidate = major.find((candidate) => {
                return candidate.interviewRefNo === ref
            })
            return candidate
        }
    }
}

export default async function Page({ params }: { params: Promise<{ ref: string }> }) {
    const { ref } = await params
    const post = [
        {
            name: "John Doe",
            paragraph: "John is a web designer with a passion for creating stunning user interfaces.",
            image: "/assets/backgroundYWC.jpg"
        },
        {
            name: "Jane Smith",
            paragraph: "Jane specializes in web content and loves crafting compelling stories.",
            image: "/assets/backgroundYWC.jpg"
        },
        {
            name: "Alice Johnson",
            paragraph: "Alice is a marketing expert who excels in digital campaigns.",
            image: "/assets/backgroundYWC.jpg"
        },
        {
            name: "Bob Brown",
            paragraph: "Bob is a skilled programmer with a knack for solving complex problems.",
            image: "/assets/backgroundYWC.jpg"
        }
    ]

    const candidate = await fetchCandidates(ref)
    if (!candidate) {
        return <div className="text-black">No candidate found</div>
    }

    const { firstName, lastName, major } = candidate

    function getMajor(major: string) {
        switch (major) {
            case "web_design":
                return <span className="text-nowrap text-white rounded-md bg-pink-600 p-1 font-medium">Web Design</span>
            case "web_content":
                return <span className="text-nowrap text-white rounded-md bg-yellow-300 p-1 font-medium">Content</span>
            case "web_marketing":
                return <span className="text-nowrap text-white rounded-md bg-emerald-500 p-1 font-medium">Marketing</span>
            case "web_programming":
                return <span className="text-nowrap text-white rounded-md bg-sky-600 p-1 font-medium">Programming</span>
            default:
                return <span className="text-nowrap text-white rounded-md bg-gray-500 p-1 font-medium">No Major</span>
        }
    }

    return (
        <div className="rounded-lg p-2 space-y-3 mx-2">
            <Image src="/assets/backgroundYWC.jpg" alt="image for background" width={1000} height={500} className="w-full h-[30vh] md:h-[40vh] rounded-xl object-cover" />
            <div className="md:flex mb-6">
                <div className="relative w-[200px]">
                    <Image src="/assets/profileYWC.jpg" alt="image for profile" width={150} height={250} className="absolute rounded-full border-2 border-white aspect-square -top-30 left-7 md:-top-17" />
                </div>
                <div className="h-10 md:h-0"></div>
                <div className="w-full space-y-4 px-3 md:space-y-0 md:flex md:justify-between md:px-14">
                    <div>
                        <p className="text-black w-full text-xl font-semibold md:text-4xl">{firstName} {lastName}</p>
                        <p className="text-gray-400 w-full text-md font-semibold md:text-2xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia quisquam ex vel (caption)</p>
                    </div>
                    <div className="mt-2">
                        {getMajor(major)}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-4 ">
                {post.map((item, index) => (
                    <div key={index} className="space-y-4 w-full md:w-[50vw] gap-4 p-3 rounded-lg bg-gray-300">
                        <div className="flex flex-col justify-center">
                            <p className="text-black text-md font-semibold">{item.name}</p>
                            <p className="text-gray-400 text-sm">{item.paragraph}</p>
                        </div>
                        <div className="w-full h-[200px] md:h-[300px]">
                            <Image src={item.image} alt="image for background" width={1000} height={500} className="w-full h-full rounded-xl object-cover" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}