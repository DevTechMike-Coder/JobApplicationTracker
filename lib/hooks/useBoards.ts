"use client";

import { useEffect, useState } from "react";
import { Board, Column, JobApplication } from "../models/models.types";
import { updateJobApplication } from "../actions/job-applications";

export function useBoard(initialBoard?: Board | null) {
  const [board, setBoard] = useState<Board | null>(initialBoard || null);
  const [columns, setColumns] = useState<Column[]>(initialBoard?.columns || []);
  const [isLoading, setIsLoading] = useState<boolean>(initialBoard === undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialBoard !== undefined) {
      setBoard(initialBoard);
      setColumns(initialBoard?.columns || []);
      setIsLoading(false);
    }
  }, [initialBoard]);

  async function moveJob(
    jobApplicationId: string,
    newColumnId: string,
    newOrder: number
  ) {
    const previousColumns = columns;

    setColumns((prev) => {
      const newColumns = prev.map((col) => ({
        ...col,
        jobApplications: [...(col.jobApplications || [])],
      }));

      // Find and remove job from the old column

      let jobToMove: JobApplication | null = null;

      for (const col of newColumns) {
        const jobIndex = col.jobApplications.findIndex(
          (j) => j._id === jobApplicationId
        );
        if (jobIndex !== -1) {
          jobToMove = col.jobApplications[jobIndex];
          col.jobApplications.splice(jobIndex, 1);
          break;
        }
      }

      if (jobToMove) {
        const targetColumnIndex = newColumns.findIndex(
          (col) => col._id === newColumnId
        );
        if (targetColumnIndex !== -1) {
          const targetColumn = newColumns[targetColumnIndex];
          
          targetColumn.jobApplications.splice(newOrder, 0, {
            ...jobToMove,
            columnId: newColumnId,
            order: newOrder * 100,
          });

          // Update orders for all jobs in the column
          targetColumn.jobApplications = targetColumn.jobApplications.map((job, idx) => ({
            ...job,
            order: idx * 100,
          }));
        }
      }

      return newColumns;
    });

    try {
      await updateJobApplication(jobApplicationId, {
        columnId: newColumnId,
        order: newOrder,
      });
    } catch (err) {
      console.error("Error moving job:", err);
      setError("Failed to move job");
      setColumns(previousColumns);
    }
  }

  return { board, columns, error, isLoading, moveJob };
}