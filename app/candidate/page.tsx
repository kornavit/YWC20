"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

import { Candidate, DetailCandidate } from "@/type/ResponseAPI"

async function fetchData(): Promise<Candidate> {
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
    const candidate = await res.json()
    return candidate
}

export default function Page() {

    const [candidates, setCandidates] = useState<Candidate>()
    const [filterCandidates, setFilterCandidates] = useState<Array<DetailCandidate>>([])
    const [searchQuery, setSearchQuery] = useState<string>('')

    // const fetchData = async () => {
    //     const res = await fetch("https://api.ywc20.ywc.in.th/homework/candidates", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "x-reference-id": "PG28",
    //         }
    //     })
    //     if (res.status !== 200) {
    //         throw new Error("Failed to fetch data")
    //     }
    //     const candidate = await res.json()
    //     setCandidates(candidate)
    // }

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData().then((data) => {
            setCandidates(data)
        }).catch((error) => {
            console.error("Error fetching data:", error)
        })
    }, [])

    function handleFilterByMajor(major: Array<DetailCandidate>) {
        const query = searchQuery
        const filteredCandidates = major.filter((candidate) => {
            return candidate.firstName.includes(query) || candidate.lastName.includes(query) || candidate.interviewRefNo.includes(query)
        })
        return filteredCandidates
    }
    
    useEffect(() => {
        const results: Array<DetailCandidate> = []

        for (const key in candidates) {
            const major = candidates[key as keyof Candidate] as Array<DetailCandidate>
            const filteredCandidates = handleFilterByMajor(major)
            if (filteredCandidates.length > 0) {
                results.push(...filteredCandidates)
            }
        }

        if (results?.length === 0) {
            setFilterCandidates([])
        }else {
            setFilterCandidates(results)
        }
    } , [searchQuery])

    function showFilter() {
        if (searchQuery.length > 0) {
            if (filterCandidates.length === 0) {
                return (
                    <div className="flex flex-col h-98 items-center justify-center gap-4 mt-6">
                        <p>No candidates found</p>
                    </div>
                )
            } else {
                return (
                    <div className="flex flex-col gap-4 mt-6">
                        {filterCandidates.map((candidate, index) => (
                            <Link href={`/candidate/${candidate.interviewRefNo}`} key={index} className="p-4 bg-white border-2 rounded-md">
                                <h2 className="text-lg font-bold">{candidate.firstName} {candidate.lastName}</h2>
                                <p>Interview Ref No: {candidate.interviewRefNo}</p>
                                <p>Major: {candidate.major}</p>
                            </Link>
                        ))}
                    </div>
                )
            }
        }

        return (
            <div className="flex flex-col gap-4 mt-6 mx-2">
                {candidates?.design.map((candidate, index) => (
                    <Link href={`/candidate/${candidate.interviewRefNo}`} key={index} className="p-4 bg-white border-2 rounded-md">
                        <h2 className="text-lg font-bold">{candidate.firstName} {candidate.lastName}</h2>
                        <p>Interview Ref No: {candidate.interviewRefNo}</p>
                        <p>Major: Design</p>
                    </Link>
                ))}
                {candidates?.content.map((candidate, index) => (
                    <Link href={`/candidate/${candidate.interviewRefNo}`} key={index} className="p-4 bg-white border-2 rounded-md">
                        <h2 className="text-lg font-bold">{candidate.firstName} {candidate.lastName}</h2>
                        <p>Interview Ref No: {candidate.interviewRefNo}</p>
                        <p>Major: Content</p>
                    </Link>
                ))}
                {candidates?.programming.map((candidate, index) => (
                    <Link href={`/candidate/${candidate.interviewRefNo}`} key={index} className="p-4 bg-white border-2 rounded-md">
                        <h2 className="text-lg font-bold">{candidate.firstName} {candidate.lastName}</h2>
                        <p>Interview Ref No: {candidate.interviewRefNo}</p>
                        <p>Major: Programming</p>
                    </Link>
                ))}
                {candidates?.marketing.map((candidate, index) => (
                    <Link href={`/candidate/${candidate.interviewRefNo}`} key={index} className="p-4 bg-white border-2 rounded-md">
                        <h2 className="text-lg font-bold">{candidate.firstName} {candidate.lastName}</h2>
                        <p>Interview Ref No: {candidate.interviewRefNo}</p>
                        <p>Major: Marketing</p>
                    </Link>
                ))}
            </div>
        )
    }

    return (
        <div className="px-4 py-8 md:px-6 md:py-12">
            <h1 className="text-3xl font-bold mb-6">Candidate Page</h1>
            <div className="flex items-center gap-4">
                <div className="relative w-full md:flex">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {showFilter()}
            </div>
        </div>
    );
}