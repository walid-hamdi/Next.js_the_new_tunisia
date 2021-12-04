import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { useEffect, useState, useMemo } from "react";
import firebase from "../libs/firebase";
import config from "../config";
import IdeaList from "../components/IdeaList";
import { Loading } from "../components/Loading";

import uuid from "uuid-random";

import {
  createIdea as dbCreateIdea,
  useFirestoreIdeas,
} from "../hooks/useFirestore";

export default function Ideas() {
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaDes, setIdeaDes] = useState("");
  const [ideaTopic, setIdeaTopic] = useState(null);
  const [user, setUser] = useState(null);
  const [createFormError, setCreateFormError] = useState(false);
  const [ideas, isLoading] = useFirestoreIdeas();

  useEffect(() => {
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
    <Layout>
      <div className="idea-page">
        <div className="create-idea">
          <Heading size={3}>Create and Manage Ideas</Heading>
          <form onSubmit={createIdea}>
            <div style={{ marginTop: 20 }}>
              <Input
                onChange={(e) => setIdeaTitle(e.target.value.toUpperCase())}
                placeholder="Idea title"
              />
            </div>

            <div>
              <textarea
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

            {createFormError && <div className="error">{createFormError}</div>}

            <div style={{ marginTop: 20, width: "fit-content" }}>
              <Button outline="granted" type="submit">
                Create Idea
              </Button>
            </div>
          </form>
        </div>

        {config.firebase.enabled && (
          <div className="spacing display-idea" style={{ marginTop: 30 }}>
            {isLoading && <Loading />}

            {!isLoading && exploreIdeas.length === 0 && (
              <div>You haven't shared any idea yet!</div>
            )}

            <IdeaList ideas={exploreIdeas} />
          </div>
        )}

        <style jsx>
          {`
            textarea {
              resize: none;
              width: 100%;
              height: 150px;
              border: none;
              background-color: var(--dark-bg);
              border-radius: 4px;
              // font-family: var(--body-font);
              font-size: 15px;
              font-weight: 500;
              padding: 0 20px;
              box-shadow: 0 0 0 2px rgb(134 140 160 / 2%);
              background-size: 14px;
              line-height: 40px;
              background-repeat: no-repeat;
              background-position: 16px 48%;
              color: var(--active-color);
              outline: none;
              margin-bottom: 5px;
            }

            .idea-page {
              margin-top: 2rem;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 2rem;
              width: 100%;
            }
            .create-idea {
              width: 400px;
            }
            .display-idea {
              width: 100%;
            }

            .error {
              font-size: 12px;
              text-align: center;
              margin: 6px 0;
            }
          `}
        </style>
      </div>
    </Layout>
  );
}
