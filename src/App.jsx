import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Get students from localStorage when the app starts
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");

    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [editId, setEditId] = useState(null);

  // Save students to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Add / Save student
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || course === "") {
      alert("Please enter student name and select course");
      return;
    }

    // Edit existing student
    if (editId !== null) {
      const updatedStudents = students.map((student) =>
        student.id === editId
          ? {
              ...student,
              name: name,
              course: course,
            }
          : student
      );

      setStudents(updatedStudents);
      setEditId(null);
    }

    // Add new student
    else {
      const newStudent = {
        id: Date.now(),
        name: name,
        course: course,
      };

      setStudents([...students, newStudent]);
    }

    // Clear form
    setName("");
    setCourse("");
  };

  // Edit student
  const handleEdit = (student) => {
    setName(student.name);
    setCourse(student.course);
    setEditId(student.id);
  };

  // Delete student
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {
      const remainingStudents = students.filter(
        (student) => student.id !== id
      );

      setStudents(remainingStudents);
    }
  };

  return (
    <div className="container">
    <div id="my-container">

      <h1>Student Management System</h1>

      {/* Form */}
      <form onSubmit={handleSubmit}>

        {/* Student Name */}
        <input
          type="text" className="textbox2"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Course Dropdown */}
        <select className="course-dropdown"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          <option value="React.js">React.js</option>
          <option value="Angular">Angular</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="HTML & CSS">HTML & CSS</option>
        </select>

        {/* Add / Save */}
        <button type="submit">
          {editId !== null ? "Save" : "Add Student"}
        </button>

      </form>

      {/* Student List */}
      <h2>Student List</h2>

      {students.length === 0 ? (
        <p>No students added yet.</p>
      ) : (
        <table>

          <thead>
            <tr>
              <th>S.No</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {students.map((student, index) => (
              <tr key={student.id}>

                <td>{index + 1}</td>

                <td>{student.name}</td>

                <td>{student.course}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      )}

    </div>
    </div>
  );
}

export default App;