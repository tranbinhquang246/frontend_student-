import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IconContext } from "react-icons";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";

function Student() {
  const [data, setData] = useState();
  const [isOpenHome, setIsOpenHome] = useState(true);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [dataStudent, setDataStudent] = useState();
  const [studentID, setDataStudentID] = useState();

  const getStudent = async () => {
    const response = await axios.get(`${process.env.REACT_APP_URL}students`);
    setData(response.data);
  };
  useEffect(() => {
    getStudent();
  }, []);

  const getStudentID = async (ID) => {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}students/${ID}`
    );
    setDataStudent(response.data);
  };

  const deleteStudent = async (studentId) => {
    await axios.delete(`${process.env.REACT_APP_URL}students/${studentId}`);
    getStudent();
  };

  const addStudent = async () => {
    setIsOpenModalEdit(false);
    setIsOpenHome(false);
    setIsOpenModalAdd(true);
  };

  const editStudent = async (studentId) => {
    getStudentID(studentId);
    setDataStudentID(studentId);
    setIsOpenModalEdit(true);
    setIsOpenHome(false);
    setIsOpenModalAdd(false);
  };
  return (
    <>
      <div
        className={
          isOpenHome
            ? "flex flex-wrap justify-center items-center text-white w-screen"
            : "hidden"
        }
      >
        {data?.map((element, index) => {
          return (
            <div
              className="flex flex-col justify-center items-center w-1/4 bg-slate-500 m-5 rounded-lg relative ease-in duration-300 hover:opacity-50"
              key={index}
            >
              <img
                src={element.avatar}
                className="w-full h-56 rounded-t-md"
                alt={index}
              ></img>
              <div className="absolute flex flex-col justify-center items-center opacity-0 ease-in duration-300 hover:opacity-100 w-full h-full">
                <button
                  className="w-2/5 h-1/6 bg-sky-900 m-2 hover:bg-stone-900"
                  onClick={() => editStudent(element._id)}
                >
                  Edit
                </button>
                <button
                  className="w-2/5 h-1/6 bg-sky-900 m-2 hover:bg-stone-900"
                  onClick={() => deleteStudent(element._id)}
                >
                  Delete
                </button>
              </div>
              <strong className="mt-2 text-lg">{` Name: ${element.firstName} ${element.lastName}`}</strong>
              <label>{`Age: ${element.age}`}</label>
              <label className="mb-2">{`Class: ${element.classroom}`}</label>
            </div>
          );
        })}

        <div
          className="flex flex-col justify-center items-center w-1/4 m-5 hover:cursor-pointer rounded-t-md"
          onClick={() => addStudent()}
        >
          <IconContext.Provider
            value={{ color: "rgb(100 116 139)", size: "50px" }}
          >
            <div>
              <AiOutlineUserAdd />
            </div>
          </IconContext.Provider>
          <strong className="mt-2 text-lg text-slate-500 border-b-2 border-slate-500">
            Add new student
          </strong>
        </div>
      </div>
      <div
        className={
          isOpenModalAdd
            ? "flex flex-wrap justify-center items-center text-black w-screen"
            : "hidden"
        }
      >
        {
          <ModalAdd
            setIsOpenModalAdd={setIsOpenModalAdd}
            setIsOpenHome={setIsOpenHome}
            setData={setData}
          ></ModalAdd>
        }
      </div>
      <div
        className={
          isOpenModalEdit
            ? "flex flex-wrap justify-center items-center text-black w-screen"
            : "hidden"
        }
      >
        {
          <ModalEdit
            setIsOpenModalEdit={setIsOpenModalEdit}
            setIsOpenHome={setIsOpenHome}
            studentID={studentID}
            dataStudent={dataStudent}
            setData={setData}
          ></ModalEdit>
        }
      </div>
    </>
  );
}

export default Student;
