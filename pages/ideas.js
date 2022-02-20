import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { useEffect, useState, useMemo } from "react";
import config from "../config";
import IdeaList from "../components/IdeaList";
import { Loading } from "../components/Loading";

import uuid from "uuid-random";

import styles from "../styles/ideas.module.css";

import {
  createIdea as dbCreateIdea,
  useFirestoreIdeas,
} from "../hooks/useFirestore";
import Head from "next/head";
import { useAuth } from "../contexts/AuthUserContext";
import Container from "../components/Container";

export default function Ideas() {
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaDes, setIdeaDes] = useState("");
  const [ideaTopic, setIdeaTopic] = useState(null);
  const [createFormError, setCreateFormError] = useState(false);
  const [ideas, isLoading] = useFirestoreIdeas();

  const [user, setUser] = useState(null);

  const { authUser } = useAuth();

  useEffect(() => {
    if (!isLoading && !authUser) {
      // router.push("/")
    } else setUser(authUser);
    // return ()=>
  }, [authUser, isLoading]);

  const exploreIdeas = useMemo(() => {
    const now = +new Date() / 1000;
    return ideas.filter((idea) => idea.created);
    // .filter(idea => now - idea.created.seconds < 30)
  }, [ideas]);

  function validForm() {
    if (!user) {
      setCreateFormError("Please make sure that you are logged in first");
      return false;
    }
    if (ideaTitle.trim().length < 5) {
      setCreateFormError(
        "The Title of the idea must be longer than 5 characters"
      );
      return false;
    }

    if (ideaDes.trim().length < 10) {
      setCreateFormError(
        "The description of the idea must be longer than 10 characters"
      );
      return false;
    }

    if (!ideaTopic) {
      setCreateFormError("Please make sure that you select Topic idea");
      return false;
    }

    setCreateFormError(false);
    return true;
  }

  function createIdea(e) {
    e.preventDefault();
    if (!validForm()) return;
    const userId = user.uid;
    const ideaId = uuid();

    dbCreateIdea(
      ideaId,
      {
        ideaId,
        ideaTitle,
        ideaDes,
        ideaTopic,
        userId,
      },
      userId
    );

    e.target.reset();

    setIdeaTitle("");
    setIdeaDes("");
    setIdeaTopic(null);
  }

  return (
    <>
      <Head>
        <title>Create Ideas | The New Tunisia</title>
        <meta
          name="description"
          content="Create and manage your  ideas , the new tunisia developer community"
        />
      </Head>

      <div className={styles.idea}>
        <div className={styles.createIdeaForm}>
          <Heading size={1} className={styles.headingCreateIdea}>
            Manage ideas
          </Heading>
          <form onSubmit={createIdea}>
            <div>
              <Input
                onChange={(e) => setIdeaTitle(e.target.value.toUpperCase())}
                placeholder="Idea title"
              />
            </div>

            <div>
              <textarea
                className={styles.textarea}
                onChange={(e) => setIdeaDes(e.target.value)}
                placeholder="Idea description"
              ></textarea>
            </div>

            <div>
              <SelectInput
                placeholder="Idea Topic"
                onChange={(e) => setIdeaTopic(e.target.value)}
                defaultValue="default"
              >
                <option value="default" disabled>
                  Choose the idea topic
                </option>
                <option value="Medical Transformation">
                  Medical Transformation
                </option>
                <option value="Agriculture Transformation">
                  Agriculture Transformation
                </option>
                <option value="Administration Transformation">
                  Administration Transformation
                </option>
                <option value="Education Transformation">
                  Education Transformation
                </option>
                <option value="Media Transformation">
                  Media Transformation
                </option>

                <option value="other">Other</option>
              </SelectInput>
            </div>
            {createFormError && (
              <div className={styles.error}>{createFormError}</div>
            )}

            <div style={{ marginTop: 20 }}>
              <Button big fullWidth type="submit">
                Create Idea
              </Button>
            </div>
          </form>
        </div>

        {config.firebase.enabled && (
          <div className={styles.itemsIdea}>
            {isLoading && <Loading />}

            {!isLoading && exploreIdeas.length === 0 && (
              <div>You haven't shared any idea yet!</div>
            )}
            {exploreIdeas.length !== 0 ? <p>List of ideas</p> : null}

            <IdeaList ideas={exploreIdeas} />
          </div>
        )}
      </div>
    </>
  );
}
