import React, { use, useState } from 'react'

const Todo = () => {
    const [todos, setTodos] = useState([]); //useState bilan boshlangich qiymat array bilan 
    const [input, setInput] = useState(""); // inputdagi keladigan topshiriq
    const [filter, setFilter] = useState("all");

    const addTodo = () => { // addTodo function
        if (input.trim()) { // agar inputdagi matnni trim qiladi
            setTodos([...todos, { // todoslarni massivga olib beradi
                id: Date.now(), // id si hozirgi vaqt
                text: input, // topshiriq kiritish
                completed: false // vazifa bajarilmagan
            }])
            setInput("") //foydalanuvchi matn yozislganda tozalaydi
        }
    }
    const filterTodos = todos.filter((todo) => { // ozgaruvchi todosni filter todo qilib beradi
        if (filter === "completed") return todo.completed //agar filter qatiy tenglik bolsa complete value siga/ qaytardi todoni completed 
        if (filter === "incompleted") return !todo.completed//agar filter incomplted qtiy tenglanadi qaytardi inkorda todo completed ni 
        return true; //true qaytaradi
    })

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-400'>
            <div className="bg-white shadow-lg rounded-3xl p-16">
                <h1 className='text-3xl font-bold text-center text-gray-900 mb-6 '>REACT TODO LIST </h1>
                <div className='flex justify-between'>
                    <i class="bi bi-journal-text"></i>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}
                        className='ml-50 mb-5 bg-gradient-to-r from-blue-600 to-emerald-400 p-2 rounded-[10px] text-gray-800'>
                        <option className='bg-blue-200' value="all">All</option>
                        <option className='bg-blue-200' value="completed">Complete</option>
                        <option className='bg-blue-200' value="incomplete">Incomplete</option>
                    </select>
                </div>
                <div className="mb-4 flex">
                    <input value={input} onChange={(e) => setInput(e.target.value)}
                        //  {/* onchange foydalanuvchi yozganda boladigan hodisa e-event e.target-hodisa yuz berganda qiymati setinputga tenglanadi*/}
                        type="text" placeholder='Add a new todo ' className='flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    <button onClick={addTodo} className='bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600'>Add</button>
                </div>
                <ul>
                    {
                        filterTodos.map((todo) => (
                            <li key={todo.id} className='flex items-center p-3 rounded-lg bg-slate-100 border border-gray-200'>
                                <input type="checkbox" checked={todo.completed}
                                    // {/* agar todo.complete===true bolsa ishlaydi*/} 
                                    onChange={() => setTodos(todos.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t)))}
                                    // {/*onchange setTodos bunda checkbox bosilgan shu function ishlaydi setTodos-todos royxati map bu yerda todo ni tekshiradi t- bu todo uchun vaqincha nom   agar t ni id si todo.id si bilan qattiy teng bolsa tni massivga olib completed ni teskari qiladi yani true-false flase-true ga  */}
                                    className='mr-2 h-5 w-5 text-blue-600' />
                                <span className={`flex-grow ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                                    {/* agar todo.completed true bolsa line-through hossasi ishlaydi false bolsa text-gray-800 ishlaydi */}
                                    {todo.text}</span>
                                <button onClick={() => { if (confirm("Are you sure you wanna delet it?")) { setTodos(todos.filter((t) => t.id !== todo.id)) } }}
                                    // {/* bosilganda todos.filter - shartga togri kelgan todoni tanlab olib massiv qiladi ,  todo t.id todo.id ga teng bolmasa u massivda qoladi agar teng bolsa ochiriladi . */} 
                                    className='ml-2 border-none p-2 rounded-lg bg-red-500 text-white hover:bg-red-600'>Delete</button>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </div>
    )
}

export default Todo