import Heading from "../components/Heading";
import Button from "../components/Button";
import { updateIdea, deleteIdea } from "../hooks/useFirestore";

import styles from "./idealist.module.css";

export default function IdeaList({ ideas }) {
  return (
    <div className={styles.ideas}>
      {ideas.map((idea, index) => (
        <div key={index} className={styles.box}>
          <Heading className={styles.ideaTitle} size={3}>
            {idea.ideaTitle}
          </Heading>
          <p>{idea.ideaTopic}</p>
          <p className={styles.ideaDescription}>{idea.ideaDes}</p>
          <Button
            avoid
            onClick={() => {
              deleteIdea(idea.ideaId, idea.userId);
            }}
          >
            Delete
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            success
            onClick={() => {
              updateIdea(idea.ideaId, idea.userId, {
                ideaTitle: "demo new title",
                ideaDes: "demo new description",
                ideaTopic: "demo new topic",
              });
            }}
          >
            Update
          </Button>
        </div>
      ))}
    </div>
  );
}
