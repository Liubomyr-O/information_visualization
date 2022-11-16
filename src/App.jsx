import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { useDataByUrl } from "./useDataByUrl.jsx";

const url =
  "https://raw.githubusercontent.com/Drag13/react-learning-course-short/master/course.json";

function App() {
  const courseData = useDataByUrl(url);
  const lessons = [];

  if (courseData) {
    console.log(courseData);
    let i = 0;
    courseData.lessons.map((lesson) => {
      i += 1;
      const keyPoints = [];
      const links = [];
      const hometask = [];
      const takeaways = [];
      const prerequisites = [];

      if (lesson.keyPoints) {
        lesson.keyPoints.map((point) => {
          keyPoints.push(<li key={point}>{point}</li>);
        });
      }

      if (lesson.hometask) {
        hometask.push(
          <div className="links-title">
            <h5>Hometask:</h5>
          </div>
        );
        lesson.hometask.map((task) => {
          hometask.push(<p className="task">{task}</p>);
        });
      }

      if (lesson.takeaways) {
        hometask.push(
          <div className="links-title">
            <h5>Takeaways:</h5>
          </div>
        );
        lesson.takeaways.map((takeaway) => {
          takeaways.push(<p className="takeaway">{takeaway}</p>);
        });
      }

      if (lesson.prerequisite) {
        prerequisites.push(
          <div className="links-title">
            <h5>Prerequisites:</h5>
          </div>
        );
        lesson.prerequisite.map((prerequisite) => {
          prerequisites.push(<p className="prerequisite">{prerequisite}</p>);
        });
      }

      if (lesson.links) {
        links.push(
          <div className="links-title">
            <h5>Useful links:</h5>
          </div>
        );
        lesson.links.map((url) => {
          links.push(
            <a key={url.at(0)} href={url.at(1)}>
              {url.at(0)}
            </a>
          );
        });
      }

      function changeColor(e, id) {
        document.getElementById(id).classList.toggle("completed-card");
      }

      function addNote(e, id) {
        document.getElementById(`form-${id}`).classList.toggle("hidden");
        document.getElementById(`button-${id}`).classList.toggle("hidden");
      }

      let result = (
        <article
          className="lesson-card"
          key={`${lesson.name}`}
          id={`${lesson.name}`}
        >
          <div className="lesson-info">
            <div className="row">
              <div>
                <span className="lesson-number">{`${i} `}</span>
                <span>
                  <h6 className="lesson-name">{`/ ${lesson.name}`}</h6>
                </span>
              </div>
              <button
                onClick={(e) => changeColor(e, lesson.name)}
                className="status-changer"
              >
                mark as completed
              </button>
            </div>
            <h2 className="lesson-title">{lesson.title}</h2>
            <h5 className="lesson-type">{lesson.type}</h5>
            <p className="short-summary">{lesson.shortSummary}</p>
            <ul> {keyPoints}</ul>
            <div className="row-buttons">{links}</div>
            <div className="home-task">{hometask}</div>
            <div className="takeaways">{takeaways}</div>
            <div className="prerequisites">{prerequisites}</div>

            <div className={`note-box`}>
              <div id={`form-${lesson.name}`} className="hidden">
                <form method="post">
                  <textarea></textarea>
                  <button type="submit" className="add-note" formTarget="blank">
                    Send your note
                  </button>
                </form>
              </div>
              <button
                onClick={(e) => addNote(e, lesson.name)}
                className="add-note"
                id={`button-${lesson.name}`}
              >
                Add a note to {lesson.type}
              </button>
            </div>
          </div>
        </article>
      );
      lessons.push(result);
    });
  }

  return (
    <>
      {courseData && (
        <main>
          <h1 className="main-title">{courseData.title}</h1>
          {lessons}
        </main>
      )}
    </>
  );
}

export default App;
