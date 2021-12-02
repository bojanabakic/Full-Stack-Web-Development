import React from 'react'

const Total = ({ course }) => {
    let sum = course.reduce(function (a, b) {
        return a + b.exercises
    }, 0)
    return (
        <p><b>total of {sum} exercises</b></p>
    )
}

const Header = ({ course }) => {
    return (
        <h1>{course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map(course =>
                <><Header course={course.name} /> <Content course={course.parts} /> <Total course={course.parts} /> </>
            )}
        </div>
    )
}

export default Course