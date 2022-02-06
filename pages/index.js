import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: question }),
    });
    const data = await response.json();
    setResult(data.result);
    setQuestion("");
  }

  return (
    <div>
      <Head>
        <title>Q&A</title>
        <link rel="icon" href="/question.png" />
      </Head>

      <main className={styles.main}>
        <img src="/question.png" className={styles.icon} />
        <h3>Get answers to your questions</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="question"
            placeholder="Ask any question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <input type="submit" value="Get answer" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
