import Course from './Course'

type Part = {
  name: string
  exercises: number
  id: number
}

type Course = {
  name: string
  id: number
  parts: Part[]
}

const Catalog = ({ courses }: { courses: Course[] }) => {
    return (
        <div style={{display:'flex', gap:'20vw'}}>
            {courses.map((course: Course) => {
                return (
                <div key={course.id}>
                    <Course course={course} />
                </div>
                )
            })}
        </div>
    )

}

export default Catalog