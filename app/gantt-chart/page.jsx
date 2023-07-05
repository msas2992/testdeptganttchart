'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import GanttChart from "@components/GanttChart";

const ViewChart = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id')
    const creatorName = searchParams.get('name')

    const [post, setPost] = useState({
        prompt : '',
        tag : '',
        jsonData : [],
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();
            console.log(data.jsonData)
            setPost({
                prompt: data.prompt,
                tag: data.tag,
                jsonData: JSON.parse(data.jsonData)
            })
        }

        if(promptId) getPromptDetails()
    }, [promptId])

    return (
        <GanttChart
            creator={creatorName}
            post={post}
        />
    )
}

export default ViewChart