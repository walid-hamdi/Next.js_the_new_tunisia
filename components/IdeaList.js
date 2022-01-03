import Heading from "../components/Heading";
import Button from "../components/Button";
import { deleteIdea } from "../hooks/useFirestore";

import styles from "./idealist.module.css";
import { useState } from "react";

export default function IdeaList({ ideas }) {
  const [isReadMore, setIsReadMore] = useState(true);

  return (
    <div className={styles.ideas}>
      {ideas.map((idea, index) => (
        <div key={index} className={styles.box}>
          <Heading className={styles.ideaTitle} size={3}>
            {idea.ideaTitle}
          </Heading>
          <p>{idea.ideaTopic}</p>

          {idea.ideaDes.length < 100 ? (
            <p className={styles.ideaDescription}>
              {idea.ideaDes.substring(0, idea.ideaDes.length)}
              {setIsReadMore(false)}
            </p>
          ) : (
            <div>
              <p className={styles.ideaDescription}>
                {idea.ideaDes.substring(0, 100) + "..."}
                {isReadMore ? (
                  <span
                    onClick={() => setIsReadMore(false)}
                    className={styles.readMore}
                  >
                    Read More
                  </span>
                ) : (
                  idea.ideaDes.substring(100, idea.ideaDes.length)
                )}
              </p>
            </div>
          )}
          <Button
            avoid
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
