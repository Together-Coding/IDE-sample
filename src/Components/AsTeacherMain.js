import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/AsTeacherMain.scss";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../constants";
function AsTeacherMain() {
  const location = useLocation();
  const courseID = useParams();
  console.log(location);
  const lesson = [
    {
      id: 102,
      name: "모두를 위한 프로그래밍: 파이썬",
      description: "Getting Started with Python",
    },
    {
      id: 104,
      name: "파이썬 자료구조",
      description: "Python Data Structures",
    },
    {
      id: 105,
      name: "파이썬을 이용한 웹 스크래핑",
      description: "Using Python to Access Web Data",
    },
    {
      id: 106,
      name: "파이썬을 이용한 데이터베이스 처리",
      description: "Using Databases With Python",
    },
  ];
  const mockUpParticipants = [
    {
      userId: 102,
      email: "teacher2@naver.com",
      name: "teacher2",
    },
    {
      userId: 11,
      email: "student11@naver.com",
      name: "student11",
    },
    {
      userId: 12,
      email: "student12@naver.com",
      name: "student12",
    },
    {
      userId: 13,
      email: "student13@naver.com",
      name: "student13",
    },
    {
      userId: 14,
      email: "student14@naver.com",
      name: "student14",
    },
    {
      userId: 15,
      email: "student15@naver.com",
      name: "student15",
    },
  ];
  const addStudentBtn = () => {
    if (addStu === "") {
      alert("빈값을 입력하세요");
      return false;
    }
    let body = {
      courseID: courseID.id,
      student: addStu,
    };
    if (window.confirm(addStu + " 학생을 등록하시겠습니까?")) {
      console.log(body);
      setAddStuIsOpen(false);
    } else {
      return false;
    }
  };

  const addLessonBtn = () => {
    if (addlessonName === "" || addlessonDes === "" || addlessonLang === "") {
      alert("빈값을 입력하세요");
      return false;
    }
    let body = {
      lessonName: addlessonName,
      lessonDes: addlessonDes,
      courseID: courseID.id,
      lang: addlessonLang,
    };
    if (window.confirm(addlessonName + " 수업을 등록하시겠습니까?")) {
      console.log(body);
      setModalIsOpen(false);
    } else {
      return false;
    }
  };

  // 참여자 추가 저장 state
  //let [addCourseID, setCourseID] = useState("");
  let [addStu, setAddStu] = useState("");

  const addStuInput = (e) => {
    setAddStu(e.target.value);
  };

  // 레슨 추가 저장 state
  let [addlessonName, setLessonName] = useState("");
  let [addlessonDes, setLessonDes] = useState("");
  let [addlessonLang, setLessonLang] = useState("");

  const addLessonInput = (e) => {
    setLessonName(e.target.value);
  };
  const addlessonDesInput = (e) => {
    setLessonDes(e.target.value);
  };
  const addLessonLangSelect = (e) => {
    setLessonLang(e.target.value);
  };

  const closeClassBtn = () => {
    if (window.confirm("정말 코스를 종료 시키겠습니까?")) {
      return;
    } else {
      return false;
    }
  };

  let [changeLessonName, setChangeLessonName] = useState("");
  let [changeLessonDes, setChangeLessonDes] = useState("");

  let [saveLessonID, setLessonID] = useState("");
  //레슨 이름 변경
  const changeLessonNameInput = (e) => {
    setChangeLessonName(e.target.value);
  };

  const changeLessonNameBtn = () => {
    let body = { name: changeLessonName };
    console.log(body);
    axios
      .put(`${API_URL}/api/lesson/name/${saveLessonID}`, body)
      .then((res) => {
        console.log(res);
      });
  };
  // 레슨 설명 변경
  const changeLessonDesInput = (e) => {
    setChangeLessonDes(e.target.value);
  };

  const changeLessonDesBtn = () => {
    let body = { description: changeLessonDes };
    console.log(body);
    axios
      .put(`${API_URL}/api/lesson/description/${saveLessonID}`, body)
      .then((res) => {
        console.log(res);
      });
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addStuIsOpen, setAddStuIsOpen] = useState(false);

  const [modalchangeLessonName, setModalChangeLessonName] = useState(false);
  const [moadlchangeLessonDes, setModalChangeLessonDes] = useState(false);
  return (
    <div style={{ marginRight: 30, marginLeft: 30 }}>
      <h2 className="teacher-main-nav">
        {location.state.class} <span>({location.state.description})</span>
      </h2>
      <div className="teacher-main-btn-box">
        <button className="add-class-btn" onClick={() => setModalIsOpen(true)}>
          수업 추가
        </button>
        <div className="class-fix-btn">
          <button>코스 수정</button>
          <button
            className="close-class-btn"
            style={{ backgroundColor: "#6c757e" }}
            onClick={closeClassBtn}
          >
            코스 종료
          </button>
        </div>
      </div>
      <div className="teacher-main-container">
        <div className="class-box-contain">
          {lesson.map((x) => {
            return (
              <div className="class-box-teacher">
                <div className="class-box-nav-teacher">
                  <p>
                    <Link
                      to={{
                        pathname: "/course/" + courseID.id + "/lesson/" + x.id,
                        state: {
                          class: x.name,
                          classDes: x.description,
                          lessonId: x.id,
                          asTeacher: location.state.asTeacher,
                        },
                      }}
                    >
                      {x.name}
                    </Link>
                    <button
                      value={x.id}
                      onClick={() => {
                        setModalChangeLessonName(true);
                        setLessonID(x.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </p>{" "}
                  <span>
                    {x.description}{" "}
                    <button
                      value={x.id}
                      onClick={() => {
                        setModalChangeLessonDes(true);
                        setLessonID(x.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </span>
                </div>
                <div className="class-box-bottom">
                  <p>세션 시간: </p>
                  <p>학생수: </p>
                  <p>질문수 :</p>
                  <p>전체 피드백 수</p>

                  <div style={{ borderTop: "1px solid gray" }}>
                    <p>과제 개수: </p>
                    <p>과제 완료 학생: </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="class-participants-box">
          <p>
            참여자 목록{" "}
            <button onClick={() => setAddStuIsOpen(true)}>
              <FontAwesomeIcon icon={faCirclePlus} />
            </button>
          </p>
          {mockUpParticipants.map((item) => {
            return (
              <div className="stu-boxs">
                <span style={{ fontWeight: "bold", fontSize: 20 }}>
                  {item.name}
                </span>
                <span style={{ color: "gray", fontSize: 13 }}>
                  {item.email}
                </span>
              </div>
            );
          })}
        </div>
        {/*수업 추가 모달-----------*/}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(15, 15, 15, 0.79)",
            },
            content: {
              position: "absolute",
              top: "40px",
              left: "25%",
              width: "50%",
              height: "90%",
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <div className="add-lesson-modal">
            <h3>레슨 추가 하기</h3>
            <label>레슨 이름</label>
            <input required onChange={addLessonInput} />
            <label>레슨 설명</label>
            <input required onChange={addlessonDesInput} />
            <label>Course ID</label>
            <input value={courseID.id} readOnly />
            <label>사용 언어</label>
            <select required onChange={addLessonLangSelect}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
            <button className="add-lesson-btn" onClick={addLessonBtn}>
              레슨 등록
            </button>
          </div>
        </Modal>
        {/*참여자 추가 모달-----------*/}
        <Modal
          isOpen={addStuIsOpen}
          onRequestClose={() => setAddStuIsOpen(false)}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(15, 15, 15, 0.79)",
            },
            content: {
              position: "absolute",
              top: "60px",
              left: "35%",
              width: "30%",
              height: "80%",
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <div className="add-stu-modal">
            <h3>참여자 추가</h3>
            <label>코스 ID</label>
            <input required value={courseID.id} readOnly />
            <label>추가할 학생(이메일)</label>
            <input onChange={addStuInput} required />
            <button onClick={addStudentBtn}>추가 하기</button>
          </div>
        </Modal>
        {/*레슨 이름 변경 모달*/}
        <Modal
          isOpen={modalchangeLessonName}
          onRequestClose={() => setModalChangeLessonName(false)}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(15, 15, 15, 0.79)",
            },
            content: {
              position: "absolute",
              top: "40px",
              left: "35%",
              width: "30%",
              height: "50%",
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <div className="change-lesson-name-modal">
            <h3>레슨 이름 변경</h3>
            <label>변경할 이름</label>
            <input required onChange={changeLessonNameInput} />
            <button
              className="change-lesson-name-btn"
              onClick={changeLessonNameBtn}
            >
              변경
            </button>
          </div>
        </Modal>
        {/*레슨 설명 변경 모달*/}
        <Modal
          isOpen={moadlchangeLessonDes}
          onRequestClose={() => setModalChangeLessonDes(false)}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(15, 15, 15, 0.79)",
            },
            content: {
              position: "absolute",
              top: "40px",
              left: "35%",
              width: "30%",
              height: "50%",
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <div className="change-lesson-des-modal">
            <h3>레슨 설명 변경</h3>
            <label>변경할 설명</label>
            <input required onChange={changeLessonDesInput} />
            <button
              className="change-lesson-des-btn"
              onClick={changeLessonDesBtn}
            >
              변경
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default AsTeacherMain;
