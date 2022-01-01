import Heading from "../components/Heading";
import Button from "../components/Button";
import { deleteIdea } from "../hooks/useFirestore";

import styles from "./idealist.module.css";

export default function IdeaList({ ideas }) {
  return (
    <div className={styles.ideas}>
      {ideas.length !== 0 ? <Heading size={3}>List our ideas</Heading> : null}
      {ideas.map((idea, index) => (
        <div key={index} className={styles.box}>
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
    </div>
  );
}
