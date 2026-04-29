import { useEffect, useState } from "react";
import { Weather, type DiaryEntry, Visibility } from "./types";
import { getAllDiaries, createDiary } from "./services/diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newDiary = {
      date,
      weather,
      visibility,
      comment,
    };

    try {
      const addedDiary = await createDiary(newDiary);

      setDiaries(diaries.concat(addedDiary));

      setDate("");
      setWeather(Weather.Sunny);
      setVisibility(Visibility.Great);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Flight Diaries</h1>

      <h2>Add new entry</h2>

      <form onSubmit={handleSubmit}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          weather
          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value as Weather)}
          >
            {Object.values(Weather).map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        <div>
          visibility
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as Visibility)}
          >
            {Object.values(Visibility).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div>
          comment
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>

        <button type="submit">add</button>
      </form>

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
