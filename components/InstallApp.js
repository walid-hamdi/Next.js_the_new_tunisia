import Button from "./Button";
import { useEffect, useState } from "react";

let deferredPrompt;

export default function InstallApp() {
  const [installable, setInstallable] = useState(false);

  // handle install app button
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener("appinstalled", () => {
      // Log install to analytics
      console.log("INSTALL: Success");
    });
  }, []);

  const handleInstallClick = (e) => {
    // Hide the app provided install promotion
    setInstallable(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "2rem",
        right: "2rem",
      }}
    >
      {installable && (
        <Button contrast onClick={handleInstallClick}>
          Install The New Tunisia App
        </Button>
      )}
    </div>
  );
}
