import { useState } from "react";

interface Post {
  id?: number;
  title: string;
  body: string;
  userId: number;
}

function App() {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [response, setResponse] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitPost = async () => {
    if (!postTitle.trim() || !postBody.trim()) {
      setError("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const newPost: Post = {
        title: postTitle,
        body: postBody,
        userId: 1,
      };

      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: Post = await res.json();
      setResponse(data);
      setPostTitle("");
      setPostBody("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card" style={{ width: "500px" }}>
        <h2>API 테스트 - POST 요청</h2>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="포스트 제목"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <textarea
            placeholder="포스트 내용"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              height: "80px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />
        </div>

        <button
          onClick={handleSubmitPost}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#ccc" : "#646cff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "전송 중..." : "POST 요청 보내기"}
        </button>

        {error && (
          <div
            style={{
              color: "red",
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#ffe6e6",
              borderRadius: "4px",
            }}
          >
            오류: {error}
          </div>
        )}

        {response && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#e6ffe6",
              borderRadius: "4px",
              textAlign: "left",
            }}
          >
            <h3>응답 성공!</h3>
            <p>
              <strong>ID:</strong> {response.id}
            </p>
            <p>
              <strong>제목:</strong> {response.title}
            </p>
            <p>
              <strong>내용:</strong> {response.body}
            </p>
            <p>
              <strong>사용자 ID:</strong> {response.userId}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
