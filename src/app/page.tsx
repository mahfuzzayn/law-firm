"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

type TData = {
  userId: number;
  title: string;
  completed: false
}

const MainApp = () => {
  const [data, setData] = useState<TData | null>();

  const handleSubmit = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await res.json();

    setData(data)
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold">Hello World</h1>
      <p>How are you? What do you do?</p> 

        {/* Data */}
        { 
          !data ?
            <p>Loading...</p>
          :
          <>
            <h3>{data.title}</h3>
            <p>{data.userId}</p>
            <p>Completed: {data.completed}</p>
          </>
        }

      <Button onClick={handleSubmit}>Click Me</Button>
    </div>
  )
}

export default MainApp