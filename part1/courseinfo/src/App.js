import { courses } from './data/courses';
import Course from './components/Course';

const App = () => {
  return (
    <ul>
      {courses.map(course => (
        <li key={course.id}>
          <Course course={course} />
        </li>
      ))}
    </ul>
  );
};

export default App;
