"use client";

import { AlertDialog, Button } from "@heroui/react";

export function DeleteModel({ userid }) {
  // safety check: যদি userid না আসে, তবে এরর হ্যান্ডেল করা
  if (!userid || !userid._id) {
    return null; 
  }

  const { _id } = userid;

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/my-ideavalid/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        console.log("Successfully deleted!");
        // এখানে চাইলে উইন্ডো রিলোড বা স্টেট আপডেট করতে পারেন
        window.location.reload(); 
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }; // এখানে ব্র্যাকেট মিসিং ছিল, ঠিক করা হয়েছে

  return (
    <AlertDialog>
      {/* ট্রিগার বাটন */}
      <Button variant="danger">Delete</Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                Are you sure you want to delete this item? 
                This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              {/* ক্যানসেল বাটন */}
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              {/* কনফার্ম বাটন */}
              <Button onClick={handleDelete} slot="close" variant="danger">
                Confirm Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}