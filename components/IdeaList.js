import Heading from "../components/Heading";
import Button from "../components/Button";
import { deleteIdea } from "../hooks/useFirestore";

export default function IdeaList({ ideas }) {
  return (
    <div className="ideas">
      {ideas.map((idea, index) => (
        <div key={index} className="box">
          <Heading size={2}>{idea.ideaTitle}</Heading>
          <p>{idea.ideaTopic}</p>

          <p>{idea.ideaDes}</p>
          <Button
            outline="granted"
            onClick={() => {
              deleteIdea(idea.ideaId, idea.userId);
            }}
          >
            Delete
          </Button>
        </div>
      ))}
      <style jsx>{`
        .ideas {
          display: flex;
          gap: 1rem;
        }

        .box {
          border: 1px solid white;
          padding: 1rem;
          width: 30%;

          cursor: pointer;
        }

        .box:hover {
          transform: scale(1.1);
          transition: all 0.2s cubic-bezier(0.17, 0.67, 0.66, 1.77);
        }
      `}</style>
    </div>
  );
}
