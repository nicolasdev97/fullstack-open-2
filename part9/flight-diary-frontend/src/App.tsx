import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types";
import { getAllDiaries } from "./services/diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>

      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>weather: {diary.weather}</p>
          <p>visibility: {diary.visibility}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
