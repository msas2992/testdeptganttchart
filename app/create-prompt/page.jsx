'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
    const router = useRouter();
    const { data : session } = useSession();
    
    const [submitting, setSubmitting] = useState(false);
    const jsonData = [
        {
          id: "1",
          name: "",
          start: "",
          end: "",
          progress: 0,
          dependencies: ""
        }
    ];

    const [post, setPost] = useState({
        prompt : '',
        tag : '',
        jsonData: JSON.stringify(jsonData),
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch('/api/prompt/new',
            {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                    jsonData: post.jsonData,
                })
            })

            if (response.ok){
                router.push('/');
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type='Create'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt