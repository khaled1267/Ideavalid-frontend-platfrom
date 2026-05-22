"use client";

import React, { useState } from "react";
import { Modal, Button, TextField, Label, Input } from "@heroui/react";

export function EditModal({ ideaData }) {
  const [title, setTitle] = useState(ideaData?.title || "");
  const [shortDescription, setShortDescription] = useState(
    ideaData?.shortDescription || "",
  );
  const [detailedDescription, setDetailedDescription] = useState(
    ideaData?.detailedDescription || "",
  );
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-ideavalid/${ideaData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            shortDescription,
            detailedDescription,
          }),
        },
      );

      if (res.ok) {
        console.log("Successfully updated!");
        window.location.reload(); 
      } else {
        console.error("Failed to update idea");
      }
    } catch (error) {
      console.error("Error updating idea:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Button
        variant="secondary"
        className="text-xs rounded-xl font-bold px-4 py-1.5 border border-gray-200 dark:border-slate-700"
      >
        Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading className="text-xl font-black text-slate-900 dark:text-white">
                Edit Idea
              </Modal.Heading>
              <p className="mt-1 text-xs text-gray-400">
                Update your startup concept details below.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <TextField className="w-full" name="title" type="text">
                  <Label className="text-xs font-bold text-slate-500 mb-1 block">
                    Title
                  </Label>
                  <Input
                    placeholder="Enter idea title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </TextField>

                <TextField
                  className="w-full"
                  name="shortDescription"
                  type="text"
                >
                  <Label className="text-xs font-bold text-slate-500 mb-1 block">
                    Short Description
                  </Label>
                  <Input
                    placeholder="Enter short description"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                  />
                </TextField>

                <TextField className="w-full" name="detailedDescription">
                  <Label className="text-xs font-bold text-slate-500 mb-1 block">
                    Detailed Description
                  </Label>
                  <Input
                    placeholder="Enter detailed description"
                    value={detailedDescription}
                    onChange={(e) => setDetailedDescription(e.target.value)}
                  />
                </TextField>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" variant="secondary" disabled={loading}>
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
