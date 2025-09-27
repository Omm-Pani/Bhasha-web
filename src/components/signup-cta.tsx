"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export function SaveProgressCTA() {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = async () => {
    // Fake submit for demo; this is where you'd call your API.
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Save your progress</DialogTitle>
        </DialogHeader>
        {!submitted ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Create an account to sync your streak and lessons across devices.
              It only takes a moment.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={submit} disabled={!email}>
                Continue
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              By continuing you agree to receive updates. You can opt out
              anytime.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm">
              Thanks! We’ve created a placeholder account. You can complete sign
              up from your inbox.
            </p>
            <Button onClick={() => setOpen(false)}>Back to learning</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
