


import Card from "./Card";
import React, { useState } from "react";

const Cards = (props) => {
  console.log("Category:", props.category);
  console.log("Courses:", props.courses);

  const category = props.category;
  const [likedCourses, setLikedCourses] = useState([]);

  // Helper function to retrieve courses
  function getCourses() {
    // If props.courses is undefined or null, return an empty array
    if (!props.courses) {
      console.error("Error: courses is undefined or null.");
      return [];
    }

    // Handle "All" category by aggregating all courses
    if (category === "All") {
      let allCourses = [];
      Object.values(props.courses).forEach((array) => {
        if (Array.isArray(array)) {
          array.forEach((courseData) => {
            allCourses.push(courseData);
          });
        } else {
          console.warn("Warning: Encountered a non-array value in courses.");
        }
      });


      console.log(allCourses);
      return allCourses;
    }

    // Handle specific category; return an empty array if category doesn't exist
    if (!props.courses[category]) {
      console.warn(`Warning: No courses found for category "${category}".`);
      return [];
    }

    return props.courses[category];
  }

  // Retrieve the list of courses
  const coursesToRender = getCourses();

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4">
      {coursesToRender.length > 0 ? (
        coursesToRender.map((course) => (
          <Card
            course={course}
            key={course.id || Math.random()} // Fallback if `course.id` is undefined
            likedCourses={likedCourses}
            setLikedCourses={setLikedCourses}
          />
        ))
      ) : (
        <p>No courses available.</p> // Fallback UI when no courses exist
      )}
    </div>
  );
};

export default Cards;
