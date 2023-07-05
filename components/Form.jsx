
"use client"

import Link from "next/link"
import { useEffect, useState } from "react";
import Image from "next/image"
import "./Form.css";

const TaskRowList = ({ data, handleDeleteClick, handleInputChange}) => {
  const handleInputChangeForTask = (taskId, field, value) => {
    console.log(value)
    if(field === "progress"){
      if(value >= 0 && value <= 100){
        handleInputChange(taskId, field, value);
      }else{
        alert("Progress must be in range percentage (1-100)")
      }
    }else{
      handleInputChange(taskId, field, value);
    }
  };
  return (
    <div>
      {data.map((task) => (
        <div className="form-row" key={task.id}>
          <div className="form-column">
            <input 
              value={task.id} 
              required 
              className="form_input" 
              readOnly/>
          </div>
          <div className="form-column">
            <input 
              value={task.dependencies} 
              className="form_input" 
              onChange={(e) => handleInputChangeForTask(task.id, 'dependencies', e.target.value)} 
              readOnly={task.id === '1'}/>
          </div>
          <div className="form-column">
            <input 
              value={task.name} 
              required className="form_input" 
              onChange={(e) => handleInputChangeForTask(task.id, 'name', e.target.value)}/>
          </div>
          <div className="form-column">
            <input 
              type="date"
              value={task.start} 
              required className="form_input" 
              onChange={(e) => handleInputChangeForTask(task.id, 'start', e.target.value)}/>
          </div>
          <div className="form-column">
            <input 
              type="date"
              value={task.end} 
              required className="form_input" 
              onChange={(e) => handleInputChangeForTask(task.id, 'end', e.target.value)}/>
          </div>
          <div className="form-column">
            <input 
              value={task.progress} 
              required className="form_input" 
              onChange={(e) => handleInputChangeForTask(task.id, 'progress', e.target.value)}/>
          </div>
          <div className="form-column delete_btn">
            <Image
              src='/assets/icons/delete.svg'
              alt="profile_icon"
              width={12}
              height={12}
              onClick={() => handleDeleteClick(task.id)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  
  const [jsonData, setJsonData] = useState(JSON.parse(post.jsonData));

  const handleAddClick = () => {
    setJsonData((prevData) => {
      const lastId = prevData[prevData.length - 1].id;
      const newObject = {
        id: (parseInt(lastId) + 1).toString(),
        name: "",
        start: "",
        end: "",
        progress: 0,
        dependencies:""
      };
      return [...prevData, newObject];
    });
  }

  const handleDeleteClick = (taskId) => {
    if(taskId !== "1"){
      setJsonData((prevData) => {
        const updatedData = prevData.filter((task) => task.id !== taskId);
        return updatedData;
      });
    }else{
      alert("You should edit information on task ID 1 instead of delete it")
    }
  }

  const handleInputChange = (taskId, field, value) => {
    setJsonData((prevData) => {
      const updatedData = prevData.map((task) => {
        if (task.id === taskId) {
          return { ...task, [field]: value };
        }
        return task;
      });
      return updatedData;
    });
  };

  useEffect(() => {
    setPost((prevPost) => ({
      ...prevPost,
      jsonData: JSON.stringify(jsonData),
    }));
  }, [jsonData]);

  useEffect(() => {
    setJsonData(JSON.parse(post.jsonData));
  }, [post.jsonData]);

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Project</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share your planning, scheduling of tasks within projects.
      </p>

      <form
      onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Project Name/Tag            
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="Name/Tag"
            required
            className="form_input"/>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Project Description
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea">

          </textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tasks Planning
          </span>
          {/* <textarea
            value={post.jsonData}
            onChange={(e) => setPost({ ...post, jsonData: e.target.value })}
            required
            className="form_textarea">

          </textarea> */}

          <div className="form-container mt-5">
            <div className="form-row w-full">
              <div className="form-column">
                <label className="font-satoshi font-semibold font-14 text-gray-700 mt-2 text-center">ID</label>
              </div>
              <div className="form-column">
                <label className="font-satoshi font-semibold font-14 text-gray-700 mt-2 text-center" >DEP</label>
              </div>
              <div className="form-column">
                <label className="font-satoshi font-semibold font-14 text-gray-700 mt-2 text-center">TASK</label>
              </div>
              <div className="form-column">
                <label className="font-satoshi font-semibold font-14 text-gray-700 mt-2 text-center">START</label>
              </div>
              <div className="form-column">
                <label className="font-satoshi font-semibold font-14 text-gray-700 mt-2 text-center">END</label>
              </div>
              <div className="form-column">
                <label className="font-satoshi font-semibold font-14 text-gray-700 mt-2 text-center">%</label>
              </div>
              <div className="form-column add_btn">
                <Image
                  src='/assets/icons/add.svg'
                  alt="profile_icon"
                  width={12}
                  height={12}
                  onClick={handleAddClick}
                />
              </div>
            </div>
            <TaskRowList
              data={jsonData}
              handleDeleteClick={handleDeleteClick}
              handleInputChange={handleInputChange}
            />

          </div>


        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
              {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form