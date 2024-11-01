import axios from "axios"
import TodosPage from "./todos/page";

export default function HomePage(){
  return (
    <div>
      <h1>Home Page</h1>
      <TodosPage />
    </div>
  );
}


